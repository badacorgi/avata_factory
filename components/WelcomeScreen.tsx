
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center border-4 border-black animate-fade-in">
      <h1 className="text-4xl md:text-6xl text-[#FF6B6B] drop-shadow-[0_4px_2px_rgba(0,0,0,0.2)] mb-4">병맛 아바타 공장</h1>
      <p className="text-lg md:text-xl mb-8 text-gray-700">슈의 인간공장 아님 주의. 여기서 만든 건 책임 못 짐.</p>
      <button
        onClick={onStart}
        className="bg-[#4ECDC4] text-white text-2xl px-12 py-4 rounded-full shadow-lg border-2 border-black transform hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-[#FFE66D]"
      >
        공장 가동하기
      </button>
    </div>
  );
};

export default WelcomeScreen;
