
import React, { useState, useMemo, useCallback } from 'react';
import { AvatarSelections } from '../types';
import { CATEGORIES, DEFAULT_SELECTIONS } from '../constants';
import OptionSelector from './OptionSelector';

interface AvatarCreatorProps {
  onGenerate: (selections: AvatarSelections) => void;
  error: string | null;
}

const AvatarCreator: React.FC<AvatarCreatorProps> = ({ onGenerate, error }) => {
  const [selections, setSelections] = useState<AvatarSelections>(DEFAULT_SELECTIONS);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = useCallback((key: keyof AvatarSelections, name: string) => {
    setSelections(prev => ({ ...prev, [key]: name }));
  }, []);

  const handleGenerateClick = () => {
    setIsLoading(true);
    onGenerate(selections);
  };

  const SelectedBody = useMemo(() => {
    return CATEGORIES[0].options.find(opt => opt.name === selections.body)?.component;
  }, [selections.body]);

  const SelectedHair = useMemo(() => {
    return CATEGORIES[1].options.find(opt => opt.name === selections.hair)?.component;
  }, [selections.hair]);

  const SelectedEyes = useMemo(() => {
    return CATEGORIES[2].options.find(opt => opt.name === selections.eyes)?.component;
  }, [selections.eyes]);

  const SelectedAccessory = useMemo(() => {
    return CATEGORIES[3].options.find(opt => opt.name === selections.accessory)?.component;
  }, [selections.accessory]);

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl border-4 border-black w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Preview */}
        <div className="flex flex-col items-center justify-center bg-[#F7F7F7] p-4 rounded-xl border-2 border-dashed border-gray-400">
          <h2 className="text-2xl mb-4 text-[#FF6B6B]">미리보기 반죽</h2>
          <div className="relative w-48 h-48 sm:w-64 sm:h-64">
            {SelectedBody && <SelectedBody className="absolute inset-0 w-full h-full text-yellow-200" />}
            {SelectedHair && <SelectedHair className="absolute inset-0 w-full h-full text-brown-500" />}
            {SelectedEyes && <SelectedEyes className="absolute inset-0 w-full h-full text-black" />}
            {SelectedAccessory && <SelectedAccessory className="absolute inset-0 w-full h-full text-red-500" />}
          </div>
        </div>

        {/* Right Side: Options */}
        <div className="flex flex-col gap-4">
          {CATEGORIES.map(category => (
            <OptionSelector
              key={category.key}
              title={category.title}
              options={category.options}
              selectedOption={selections[category.key]}
              onSelect={(name) => handleSelect(category.key, name)}
            />
          ))}
        </div>
      </div>
      
      {error && <p className="text-red-500 text-center mt-4 bg-red-100 p-2 rounded-md">{error}</p>}

      <div className="mt-6 text-center">
        <button
          onClick={handleGenerateClick}
          disabled={isLoading}
          className="bg-[#1A535C] text-white text-xl px-10 py-3 rounded-full shadow-lg border-2 border-black transform hover:scale-105 active:scale-95 transition-transform duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? '만드는 중...' : '이대로 만들기!'}
        </button>
      </div>
    </div>
  );
};

export default AvatarCreator;
