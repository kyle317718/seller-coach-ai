interface SuccessStoryProps {
    quote: string;
    author: string;
    revenue?: string;
}

export const SuccessStory = ({
    quote = "이 분석으로 월 200만 원 매출 달성!",
    author = "셀러 김** 님",
    revenue = "2,000,000"
}: SuccessStoryProps) => {
    return (
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 my-4">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <span className="text-2xl">💡</span>
                </div>
                <div>
                    <blockquote className="text-lg font-medium text-gray-900 mb-2">
                        "{quote}"
                    </blockquote>
                    <div className="text-sm text-gray-600">
                        <span className="font-semibold">{author}</span>
                        {revenue && (
                            <span className="ml-2 text-orange-600">
                                월 매출 {revenue}원 달성
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}; 