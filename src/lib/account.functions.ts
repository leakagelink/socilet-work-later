import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Permanently delete the signed-in user's account and all associated data.
 * Required for Google Play Store data-deletion policy.
 */
export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId, supabase } = context;

    // Best-effort cleanup of user-owned rows (RLS-scoped to this user).
    // auth.users CASCADE will also clean rows with FK references.
    await Promise.allSettled([
      supabase.from("estimates").delete().eq("user_id", userId),
      supabase.from("leads").delete().eq("user_id", userId),
      supabase.from("notifications").delete().eq("user_id", userId),
      supabase.from("referrals").delete().eq("referrer_id", userId),
      supabase.from("support_tickets").delete().eq("user_id", userId),
      supabase.from("user_push_tokens").delete().eq("user_id", userId),
      supabase.from("user_roles").delete().eq("user_id", userId),
      supabase.from("profiles").delete().eq("id", userId),
    ]);

    // Delete the auth user with service-role admin client.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) {
      throw new Error(`Failed to delete account: ${error.message}`);
    }

    return { ok: true };
  });
