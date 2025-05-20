# 포트 3000 사용 중인 프로세스 강제 종료
$processIds = @(Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue).OwningProcess
if ($processIds) {
    foreach ($pid in $processIds) {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
}

# Node 프로세스 종료
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "기존 프로세스 정리 완료" -ForegroundColor Green

# Next.js 캐시 삭제
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
    Write-Host ".next 폴더 삭제 완료" -ForegroundColor Green
}

# node_modules 삭제
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
    Write-Host "node_modules 폴더 삭제 완료" -ForegroundColor Green
}

Write-Host "패키지 재설치 시작..." -ForegroundColor Yellow
npm install
Write-Host "패키지 재설치 완료" -ForegroundColor Green

Write-Host "개발 서버 시작 중..." -ForegroundColor Yellow

# 서버 시작 전 3초 대기
Start-Sleep -Seconds 3

# 브라우저 먼저 실행 (새 탭으로)
Start-Process "http://localhost:3000"

# 서버 시작 (콘솔 표시)
npm run dev 