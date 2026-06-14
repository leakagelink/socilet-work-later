## How to apply the new launcher icon and splash (run in PowerShell)

After `git pull`, run these from the project root **once** to wire the new
icon (`resources/icon.png`) and splash (`resources/splash.png`) into Android:

```powershell
# 1) Install the asset generator (one-time)
npm i -D @capacitor/assets

# 2) Generate all densities + adaptive icon + splash
npx @capacitor/assets generate --android

# 3) Sync into the Android project
npx cap sync android

# 4) Open Android Studio and rebuild
npx cap open android
```

That writes proper `mipmap-*` icons, adaptive-icon foreground/background XML,
and `splash.png` into `android/app/src/main/res/`. Old default Capacitor icon
gets replaced — required for Play Store listing.
