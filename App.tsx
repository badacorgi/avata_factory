import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import AvatarCreator from './components/AvatarCreator';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import { GameState, AvatarSelections, AvatarImageVariations } from './types';
import { generateAvatarVariations } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [resultImageUrls, setResultImageUrls] = useState<AvatarImageVariations | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = useCallback(() => {
    setGameState('creating');
  }, []);

  const handleGenerate = useCallback(async (selections: AvatarSelections) => {
    setGameState('generating');
    setError(null);
    try {
      const imageUrls = await generateAvatarVariations(selections);
      setResultImageUrls(imageUrls);
      setGameState('result');
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`아바타 생성에 실패했어요! 다시 시도해주세요. (${errorMessage})`);
      setGameState('creating');
    }
  }, []);
  
  const handlePlayAgain = useCallback(() => {
    setResultImageUrls(null);
    setError(null);
    setGameState('creating');
  }, []);
  
  const handleBackToStart = useCallback(() => {
    setResultImageUrls(null);
    setError(null);
    setGameState('welcome');
  }, []);


  const renderContent = () => {
    switch (gameState) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'creating':
        return <AvatarCreator onGenerate={handleGenerate} error={error} />;
      case 'generating':
        return <LoadingScreen />;
      case 'result':
        return <ResultScreen 
                  imageUrls={resultImageUrls} 
                  onPlayAgain={handlePlayAgain} 
                  onBackToStart={handleBackToStart}
                  error={error} 
                />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-[#FFD6EC] min-h-screen text-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;