// 파일 위치: services/geminiService.ts
// (기존 내용 모두 삭제하고 아래 코드로 덮어쓰기)

import { AvatarSelections, AvatarImageVariations } from '../types';

export const generateAvatarVariations = async (
  selections: AvatarSelections
): Promise<AvatarImageVariations> => {

  // 1. Google이 아닌, 우리 Netlify 서버 Function에 POST 요청을 보냅니다.
  const response = await fetch('/.netlify/functions/generateAvatar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selections),
  });

  // 2. 응답이 실패했는지 확인합니다.
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate avatar variations.');
  }

  // 3. 성공한 JSON 결과를 반환합니다.
  const results = await response.json();
  return results;
};
