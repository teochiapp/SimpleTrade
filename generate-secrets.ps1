# PowerShell script to generate new Strapi secrets
# Run: .\generate-secrets.ps1

Write-Host "========================================" -ForegroundColor Green
Write-Host "Generating New Strapi Secrets" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "ADMIN_JWT_SECRET:" -ForegroundColor Yellow
$adminJwt = [Convert]::ToBase64String((1..24 | ForEach-Object { Get-Random -Maximum 256 }))
Write-Host $adminJwt -ForegroundColor Cyan
Write-Host ""

Write-Host "API_TOKEN_SALT:" -ForegroundColor Yellow
$apiToken = [Convert]::ToBase64String((1..24 | ForEach-Object { Get-Random -Maximum 256 }))
Write-Host $apiToken -ForegroundColor Cyan
Write-Host ""

Write-Host "JWT_SECRET:" -ForegroundColor Yellow
$jwtSecret = [Convert]::ToBase64String((1..24 | ForEach-Object { Get-Random -Maximum 256 }))
Write-Host $jwtSecret -ForegroundColor Cyan
Write-Host ""

Write-Host "TRANSFER_TOKEN_SALT:" -ForegroundColor Yellow
$transferToken = [Convert]::ToBase64String((1..24 | ForEach-Object { Get-Random -Maximum 256 }))
Write-Host $transferToken -ForegroundColor Cyan
Write-Host ""

Write-Host "APP_KEYS:" -ForegroundColor Yellow
$appKeys = @()
for ($i=1; $i -le 4; $i++) {
    $key = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
    $appKeys += "strapi::$key"
}
Write-Host ($appKeys -join ",") -ForegroundColor Cyan
Write-Host ""

Write-Host "STRAPI_ADMIN_CLIENT_PREVIEW_SECRET:" -ForegroundColor Yellow
$previewSecret = [Convert]::ToBase64String((1..24 | ForEach-Object { Get-Random -Maximum 256 }))
Write-Host $previewSecret -ForegroundColor Cyan
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "Copy these secrets to Coolify!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
