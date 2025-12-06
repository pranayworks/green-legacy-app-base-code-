# Green Legacy App - Launch Script
# This script starts the React Native app on Android emulator or device

Write-Host "🚀 Green Legacy App Launcher" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Green
Write-Host ""

# Check if server is running
Write-Host "✓ Checking server status..." -ForegroundColor Cyan
$serverTest = Invoke-WebRequest -Uri "http://localhost:4000" -ErrorAction SilentlyContinue
if ($serverTest.StatusCode -eq 200) {
    Write-Host "✅ Server is running at http://localhost:4000" -ForegroundColor Green
} else {
    Write-Host "⚠️  Server not detected. Make sure to run:" -ForegroundColor Yellow
    Write-Host "   cd c:\Users\Lenovo\green-legacy-app-base-code-\server" -ForegroundColor Yellow
    Write-Host "   npm run start" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press Enter to continue anyway, or Ctrl+C to cancel..."
    Read-Host
}

Write-Host ""
Write-Host "📱 Launching React Native app..." -ForegroundColor Cyan
Write-Host ""

# Navigate to app directory and build
cd c:\Users\Lenovo\green-legacy-app-base-code-

Write-Host "Building app (this may take 2-5 minutes on first build)..." -ForegroundColor Cyan
npx react-native run-android

Write-Host ""
Write-Host "✅ App launch initiated!" -ForegroundColor Green
Write-Host ""
Write-Host "What to expect:" -ForegroundColor Cyan
Write-Host "  1. Android build will compile TypeScript → APK" -ForegroundColor White
Write-Host "  2. APK will install on emulator/device" -ForegroundColor White
Write-Host "  3. App will open automatically" -ForegroundColor White
Write-Host "  4. You'll see Onboarding screen (3-slide carousel)" -ForegroundColor White
Write-Host "  5. Tap 'Get Started' to see Home screen" -ForegroundColor White
Write-Host ""
