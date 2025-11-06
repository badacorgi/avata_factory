import React, { useState, useMemo } from 'react';
import { AvatarImageVariations } from '../types';

interface ResultScreenProps {
  imageUrls: AvatarImageVariations | null;
  onPlayAgain: () => void;
  onBackToStart: () => void;
  error: string | null;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ imageUrls, onPlayAgain, onBackToStart, error }) => {
  const [currentStyle, setCurrentStyle] = useState<'any' | '2d' | '3d'>('any');

  const currentImageUrl = useMemo(() => {
    if (!imageUrls) return null;
    return imageUrls[currentStyle];
  }, [imageUrls, currentStyle]);

  if (!imageUrls || !currentImageUrl) {
    return (
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center border-4 border-black">
        <h2 className="text-3xl text-red-500 mb-4">앗! 이미지를 불러올 수 없어요.</h2>
         <p className="text-gray-600 mb-4">{error || "알 수 없는 오류가 발생했습니다."}</p>
        <button
          onClick={onPlayAgain}
          className="bg-[#4ECDC4] text-white text-xl px-8 py-3 rounded-full shadow-lg border-2 border-black transform hover:scale-105"
        >
          다시 만들기
        </button>
      </div>
    );
  }

  const baseButtonClass = "text-white text-lg px-6 py-2 rounded-full shadow-md border-2 border-black transform hover:scale-105 active:scale-95 transition-transform";

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg text-center border-4 border-black animate-fade-in">
      <h2 className="text-4xl text-[#FF6B6B] drop-shadow-[0_4px_2px_rgba(0,0,0,0.2)] mb-4">☆★완성★☆</h2>
      {error && <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded-md border border-red-300">{error}</p>}
      <div className="bg-gray-200 p-2 rounded-lg border-2 border-gray-300 inline-block mb-6">
        <img src={currentImageUrl} alt="Generated Avatar" className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-md" />
      </div>
      <p className="text-lg text-gray-700 mb-6">당신만의 병맛 아바타가 탄생했어요!</p>
      
      <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
        <button onClick={() => setCurrentStyle('any')} className={`${baseButtonClass} ${currentStyle === 'any' ? 'bg-[#FF6B6B]' : 'bg-[#4ECDC4]'}`}>원본</button>
        <button onClick={() => setCurrentStyle('2d')} className={`${baseButtonClass} ${currentStyle === '2d' ? 'bg-[#FF6B6B]' : 'bg-[#4ECDC4]'}`}>2D 버전</button>
        <button onClick={() => setCurrentStyle('3d')} className={`${baseButtonClass} ${currentStyle === '3d' ? 'bg-[#FF6B6B]' : 'bg-[#4ECDC4]'}`}>3D 버전</button>
        <a 
          href={currentImageUrl} 
          download={`병맛아바타-${currentStyle}-${Date.now()}.png`}
          className={`${baseButtonClass} bg-[#1A535C] inline-block`}
        >
          다운로드
        </a>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onPlayAgain}
          className="bg-[#FFE66D] text-gray-800 text-xl px-8 py-3 rounded-full shadow-lg border-2 border-black transform hover:scale-105 active:scale-95 transition-transform"
        >
          또 만들기
        </button>
        <button
          onClick={onBackToStart}
          className="bg-gray-300 text-gray-700 text-xl px-8 py-3 rounded-full shadow-lg border-2 border-black transform hover:scale-105 active:scale-95 transition-transform"
        >
          처음으로
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;