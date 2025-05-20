interface CompetitorAnalysisInput {
    product: string;
    price: number;
    category?: string;
}

interface CompetitorAnalysisOutput {
    top_competitor: string;
    price_diff: number;
    confidence_score: number;
}

export const validateCompetitorAnalysis = async (
    input: CompetitorAnalysisInput,
    expected: Partial<CompetitorAnalysisOutput>
): Promise<{
    passed: boolean;
    details: string[];
}> => {
    const testResults: string[] = [];
    let allTestsPassed = true;

    try {
        // API 호출
        const response = await fetch('/api/analyze/competitors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        });

        if (!response.ok) {
            throw new Error(`API 호출 실패: ${response.statusText}`);
        }

        const result: CompetitorAnalysisOutput = await response.json();

        // 결과 검증
        if (expected.top_competitor) {
            const topCompetitorMatch = result.top_competitor === expected.top_competitor;
            testResults.push(`주요 경쟁사 매칭: ${topCompetitorMatch ? '성공' : '실패'}`);
            allTestsPassed = allTestsPassed && topCompetitorMatch;
        }

        if (expected.price_diff !== undefined) {
            const priceDiffMatch = Math.abs(result.price_diff - expected.price_diff) <= 2; // 2% 오차 허용
            testResults.push(`가격 차이 분석: ${priceDiffMatch ? '성공' : '실패'} (예상: ${expected.price_diff}%, 실제: ${result.price_diff}%)`);
            allTestsPassed = allTestsPassed && priceDiffMatch;
        }

        // 신뢰도 점수 검증
        if (result.confidence_score < 0.8) {
            testResults.push(`경고: 신뢰도 점수가 낮습니다 (${result.confidence_score})`);
            allTestsPassed = false;
        }

        return {
            passed: allTestsPassed,
            details: testResults
        };
    } catch (error) {
        return {
            passed: false,
            details: [`테스트 실패: ${error.message}`]
        };
    }
};

// 테스트 실행 예시
export const runCompetitorAnalysisTests = async () => {
    const testCases = [
        {
            input: {
                product: "강아지 자동 급수기",
                price: 39000,
                category: "반려용품"
            },
            expected: {
                top_competitor: "A사",
                price_diff: -8
            }
        }
    ];

    const results = await Promise.all(
        testCases.map(async (testCase) => {
            const result = await validateCompetitorAnalysis(
                testCase.input,
                testCase.expected
            );
            return {
                testCase,
                result
            };
        })
    );

    return results;
}; 