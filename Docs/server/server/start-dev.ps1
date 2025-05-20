# 현재 디렉토리 저장
$originalLocation = Get-Location

# server 디렉토리로 이동
Set-Location $PSScriptRoot

# 3초 후에 브라우저 열기 (서버가 시작될 때까지 대기)
$job = Start-Job -ScriptBlock {
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:3000/analysis/risk"
}

# npm run dev 명령을 백그라운드에서 실행
Start-Process powershell -ArgumentList "-NoProfile -NonInteractive -Command npm run dev" -WindowStyle Hidden

Write-Host "개발 서버가 백그라운드에서 시작되었습니다."
Write-Host "브라우저가 곧 자동으로 열립니다..."

# 원래 디렉토리로 복귀
Set-Location $originalLocation 