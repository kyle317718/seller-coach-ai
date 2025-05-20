import { getBrowserInfo } from '../utils/browserCheck';
import { runCompetitorAnalysisTests } from '../utils/aiModelTest';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

async function runLighthouseTest(url: string) {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance'],
        port: chrome.port
    };

    const runnerResult = await lighthouse(url, options);
    await chrome.kill();

    return runnerResult.lhr;
}

async function runAllTests() {
    console.log('🧪 테스트 시작...\n');

    // 1. 브라우저 호환성 테스트
    console.log('📱 브라우저 호환성 테스트');
    const browserInfo = getBrowserInfo();
    console.log(`현재 브라우저: ${browserInfo?.browserName} ${browserInfo?.browserVersion}\n`);

    // 2. AI 모델 테스트
    console.log('🤖 AI 모델 테스트');
    const aiTestResults = await runCompetitorAnalysisTests();
    aiTestResults.forEach((result, index) => {
        console.log(`테스트 케이스 #${index + 1}:`);
        console.log(`- 입력: ${JSON.stringify(result.testCase.input)}`);
        console.log(`- 결과: ${result.result.passed ? '성공 ✅' : '실패 ❌'}`);
        result.result.details.forEach(detail => console.log(`  ${detail}`));
        console.log('');
    });

    // 3. 성능 테스트
    console.log('⚡ 성능 테스트');
    try {
        const lighthouseResults = await runLighthouseTest('http://localhost:3000');
        console.log('Lighthouse 점수:');
        console.log(`- Performance: ${lighthouseResults.categories.performance.score * 100}/100`);

        if (lighthouseResults.categories.performance.score < 0.9) {
            console.log('\n⚠️ 성능 개선이 필요합니다:');
            lighthouseResults.audits['opportunities'].details.items.forEach((item: any) => {
                console.log(`- ${item.description}`);
            });
        }
    } catch (error) {
        console.error('Lighthouse 테스트 실패:', error);
    }
}

// 테스트 실행
runAllTests().catch(console.error); 