// 파일 위치: netlify/functions/generateAvatar.ts

import { GoogleGenAI, Modality } from "@google/genai";
import type { Handler } from "@netlify/functions";

// AvatarSelections 타입을 가져옵니다. (경로가 다를 경우 수정 필요)
interface AvatarSelections {
  body: string;
  hair: string;
  eyes: string;
  accessory: string;
}

// -------------------------------------------------
// geminiService.ts에 있던 프롬프트 함수들을
// 그대로 복사해서 이 서버 파일로 가져옵니다.
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
};

const generateSingleAvatar = async (ai: GoogleGenAI, selections: AvatarSelections, style: '2D' | '3D' | 'any'): Promise<string> => {
  const prompt = constructPrompt(selections, style);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: prompt,
        },
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64ImageBytes: string = part.inlineData.data;
      return `data:image/png;base64,${base64ImageBytes}`;
    }
  }

  throw new Error("No image data received from API");
};

// -------------------------------------------------
// Netlify Function의 메인 핸들러
// -------------------------------------------------
export const handler: Handler = async (event) => {
  // 1. API 키를 Netlify 환경 변수에서 안전하게 가져옵니다.
  //    (주의: Netlify에서는 process.env.GEMINI_API_KEY로 읽어야 함)
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API_KEY environment variable not set on server" }),
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 2. React 앱이 보낸 selections 데이터를 파싱합니다.
    const selections = JSON.parse(event.body || "{}") as AvatarSelections;

    // 3. API 클라이언트를 초기화합니다.
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    // 4. geminiService.ts의 generateAvatarVariations 로직을 여기서 수행합니다.
    const [anyResult, twoDResult, threeDResult] = await Promise.all([
      generateSingleAvatar(ai, selections, 'any'),
      generateSingleAvatar(ai, selections, '2D'),
      generateSingleAvatar(ai, selections, '3D'),
    ]);

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