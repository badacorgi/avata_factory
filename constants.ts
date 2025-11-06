import { AvatarSelections, OptionCategory } from './types';
import { 
  Body1, Body2, Body3, Body4, Body5,
  Hair1, Hair2, Hair3, Hair4, Hair5, Hair6, Hair7,
  Eyes1, Eyes2, Eyes3, Eyes4, Eyes5, Eyes6, Eyes7,
  Acc1, Acc2, Acc3, Acc4, Acc5, Acc6, Acc7, Acc8
} from './components/icons';

export const BODY_OPTIONS = [
  { name: '동글 반죽', component: Body1 },
  { name: '길쭉 반죽', component: Body2 },
  { name: '네모 반죽', component: Body3 },
  { name: '별님 반죽', component: Body4 },
  { name: '흐물 반죽', component: Body5 },
];

export const HAIR_OPTIONS = [
  { name: '더벅머리', component: Hair1 },
  { name: '바가지머리', component: Hair2 },
  { name: '식빵머리', component: Hair3 },
  { name: '사과머리', component: Hair4 },
  { name: '뾰족머리', component: Hair5 },
  { name: '대머리', component: Hair6 },
  { name: '양갈래', component: Hair7 },
];

export const EYES_OPTIONS = [
  { name: '초롱눈', component: Eyes1 },
  { name: '맛간눈', component: Eyes2 },
  { name: '점눈', component: Eyes3 },
  { name: '하트눈', component: Eyes4 },
  { name: '데굴눈', component: Eyes5 },
  { name: '외눈', component: Eyes6 },
  { name: '우는눈', component: Eyes7 },
];

export const ACCESSORY_OPTIONS = [
  { name: '리본', component: Acc1 },
  { name: '콧수염', component: Acc2 },
  { name: '코딱지', component: Acc3 },
  { name: '반창고', component: Acc4 },
  { name: '광대코', component: Acc5 },
  { name: '고깔모자', component: Acc6 },
  { name: '안경', component: Acc7 },
  { name: '생선', component: Acc8 },
];

export const CATEGORIES: OptionCategory[] = [
  { title: '모양 반죽 고르기', key: 'body', options: BODY_OPTIONS },
  { title: '머리 반죽 올리기', key: 'hair', options: HAIR_OPTIONS },
  { title: '눈 반죽 붙이기', key: 'eyes', options: EYES_OPTIONS },
  { title: '장식 반죽 더하기', key: 'accessory', options: ACCESSORY_OPTIONS },
];

export const DEFAULT_SELECTIONS: AvatarSelections = {
  body: BODY_OPTIONS[0].name,
  hair: HAIR_OPTIONS[0].name,
  eyes: EYES_OPTIONS[0].name,
  accessory: ACCESSORY_OPTIONS[0].name,
};
