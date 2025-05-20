export function validateInput(input: string): string | null {
  if (!input || input.trim().length === 0) {
    return '입력값이 비어 있습니다.';
  }
  if (input.length < 2) {
    return '입력값이 너무 짧습니다.';
  }
  // 추가 유효성 검사 규칙 필요시 여기에 작성
  return null;
}
