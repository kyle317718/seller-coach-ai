export function ResultView({ analysisState }: any) {
    if (!analysisState.result) return null;
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">분석 결과</h2>
            <pre className="bg-gray-50 p-4 rounded text-sm whitespace-pre-wrap mb-4">{JSON.stringify(analysisState.result, null, 2)}</pre>
            <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" disabled>PDF로 내보내기(준비중)</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded" disabled>Excel로 내보내기(준비중)</button>
            </div>
        </div>
    );
} 