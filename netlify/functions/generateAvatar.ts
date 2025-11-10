// 파일 위치: netlify/functions/generateAvatar.ts
// (Gemini 대신 OpenAI API를 사용하도록 수정한 전체 코드)

import { OpenAI } from "openai"; // OpenAI 라이브러리를 가져옵니다.
import type { Handler } from "@netlify/functions";

// AvatarSelections 타입 정의 (기존과 동일)
interface AvatarSelections {
  body: string;
  hair: string;
  eyes: string;
  accessory: string;
}

// -------------------------------------------------
// 프롬프트 생성 함수 (기존과 동일)
// 참고: DALL-E는 Gemini와 프롬프트 해석 방식이 다를 수 있습니다.
// 결과물이 마음에 들지 않으면 이 프롬프트 내용을 DALL-E에 맞게 수정해야 할 수 있습니다.
// -------------------------------------------------
const constructPrompt = (selections: AvatarSelections, style: '2D' | '3D' | 'any'): string => {
  let styleInstruction = "";
  switch (style) {
    case '2D':
      styleInstruction = `
        The final image MUST be a 2D drawing in the style of a child's drawing made with a mouse in MS Paint (Microsoft Paint, '그림판' in Korean).
        **CRITICAL 2D STYLE RULES:**
        1.  **BLACK AND WHITE ONLY:** The image must consist ONLY of simple black outlines on a pure white background. There must be absolutely NO colors, NO shading, NO gradients, NO textures. Just black lines.
        2.  **CRUDE & WOBBLY LINES:** The outlines must be intentionally shaky, uneven, and wobbly, as if drawn by a child with poor mouse control. The lines should not be smooth or perfect. Some lines might not even connect properly.
        3.  **EXTREMELY SIMPLE & NAIVE:** The entire drawing style must be incredibly simplistic, naive, and low-effort. It should capture the 'I just drew this in 5 seconds' aesthetic, perfectly replicating the feeling of the user-provided example images.`;
      break;
    case '3D':
      styleInstruction = "The final image MUST be a 3D render. It should look like a corrupted, lopsided, low-poly 3D model from a nightmarish but funny PS1 game. Create a disturbing mix of simple geometric shapes with unsettling, realistic textures applied incorrectly. It should feel glitchy and fundamentally broken, but in a goofy way.";
      break;
    default: // 'any'
       styleInstruction = "The style can be 2D, 3D, or a hideous mix of both. The most important rule is the CLASH OF STYLES. Combine simple, chubby cartoon shapes with photorealistic elements. Make it look like different, incompatible assets were stolen and forced together. The result should be an adorable abomination.";
      break;
  }

  return `
    Your task is to create a portrait of a single, bizarre, and endearingly clumsy creature, a failed avatar inspired by the Korean Flash game 'Sue's Human Factory'.
    The goal is maximum 'byeongmat' (병맛) aesthetic. It's not about being truly scary or grotesque, but so awkward, ugly, and anatomically wrong that it becomes hilarious and strangely cute.
    
    **CRITICAL RULES:**
    1.  **'UGLY-CUTE' IS KEY:** The goal is a very specific 'ugly-cute' charm. Think of a pug's squished face, a clumsy toddler's drawing, or a lopsided handmade doll. The charm comes from its obvious imperfections and its pathetic attempt to be lovable. It should be a lovable failure.
    2.  **BIZARRE & AWKWARD:** It should be awkward to look at. Think of a biological experiment to create a cute mascot that has gone slightly, hilariously wrong.
    3.  **CLASHING ART STYLES (for 'any' and '3D' styles):** This is the most important rule. The creature's parts MUST have wildly different art styles. For example, a simple flat-colored body with hyper-realistic, glossy, detailed human lips. Or a claymation-style body with a single, photographic eye. The parts should look like they are from different universes and have been stitched together.
    4.  **DERPY & PATHETIC EXPRESSION:** The creature's expression is crucial. It could be confused about its own miserable existence, have an undeservedly confident smirk, or just a completely blank, brainless stare. The expression should make you laugh at its sheer absurdity.

    **CREATURE SPECIFICATIONS:**
    -   **Body Shape:** The base of the creature is a chubby, soft-looking '${selections.body}'.
    -   **Hair:** It has '${selections.hair}', but it should look like a cheap, badly-fitted wig or just glued on top.
    -   **Eyes:** It has '${selections.eyes}', but they should be disproportionate, misplaced, or disturbingly realistic, giving it a derpy look.
    -   **Accessory:** An awkward '${selections.accessory}' is placed somewhere nonsensically on its body.

    **${styleInstruction}**

    **BACKGROUND & COMPOSITION:**
    -   The creature must be standing on a simple, empty stage under a single, harsh spotlight (unless it's the 2D MS Paint style, which should have a plain white background).
    -   The background must be a plain, solid, sickly pink color (for 3D/'any' styles) or pure white (for 2D style).
    -   The creature should be the only subject, full-body, facing the viewer.
    
    The final image must be a masterpiece of bizarre, clumsy, and hilariously pathetic character design.`;
}; //

// -------------------------------------------------
// OpenAI (DALL-E)를 사용하여 이미지 1개를 생성하는 함수
// -------------------------------------------------
const generateSingleAvatar = async (
  openai: OpenAI,
  selections: AvatarSelections,
  style: '2D' | '3D' | 'any'
): Promise<string> => {
  const prompt = constructPrompt(selections, style);

  // OpenAI DALL-E API 호출
  const response = await openai.images.generate({
    model: "dall-e-3", // 또는 "dall-e-2" (dall-e-2는 3보다 저렴하지만 품질이 낮습니다)
    prompt: prompt,
    n: 1, // 1개의 이미지를 생성
    size: "1024x1024", // DALL-E 3가 지원하는 크기
    response_format: "b64_json", // 이미지를 Base64 문자열로 받습니다.
  });

  const b64Json = response.data[0]?.b64_json;

  if (b64Json) {
    // React 앱에서 바로 이미지로 사용할 수 있도록 data URI 형식으로 반환
    return `data:image/png;base64,${b64Json}`;
  }

  throw new Error("No image data received from OpenAI API");
};

// -------------------------------------------------
// Netlify Function의 메인 핸들러
// -------------------------------------------------
export const handler: Handler = async (event) => {
  // 1. API 키를 Netlify 환경 변수에서 가져옵니다.
  //    (주의: Netlify 대시보드에 'OPENAI_API_KEY'로 설정해야 함)
  const API_KEY = process.env.OPENAI_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "OPENAI_API_KEY environment variable not set on server" }),
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 2. React 앱이 보낸 selections 데이터를 파싱합니다.
    const selections = JSON.parse(event.body || "{}") as AvatarSelections;

    // 3. API 클라이언트를 OpenAI로 초기화합니다.
    const openai = new OpenAI({ apiKey: API_KEY });

    // 4. 3가지 스타일의 이미지를 동시에 요청합니다.
    const [anyResult, twoDResult, threeDResult] = await Promise.all([
      generateSingleAvatar(openai, selections, 'any'),
      generateSingleAvatar(openai, selections, '2D'),
      generateSingleAvatar(openai, selections, '3D'),
    ]); //

    const results = {
      any: anyResult,
      '2d': twoDResult,
      '3d': threeDResult,
    };

    // 5. 성공 결과를 React 앱에 반환합니다.
    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    console.error("Error generating avatar variations:", error);
    // 6. 실패 결과를 React 앱에 반환합니다.
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate all avatar variations." }),
    };
  }
};
