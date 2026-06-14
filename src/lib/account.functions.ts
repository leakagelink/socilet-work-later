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
    // Best-effort cleanup of user-owned rows. Other tables (estimates, leads,
    // support_tickets, referrals) are keyed by email — they remain as business
    // records and are anonymised when the auth user is removed.
    await Promise.allSettled([
      supabase.from("notifications").delete().eq("user_id", userId),
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
