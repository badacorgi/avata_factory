
import React from 'react';
import { Option } from '../types';

interface OptionSelectorProps {
  title: string;
  options: Option[];
  selectedOption: string;
  onSelect: (name: string) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({ title, options, selectedOption, onSelect }) => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg border-2 border-gray-300">
      <h3 className="text-md font-bold mb-2 text-center text-gray-600">{title}</h3>
      <div className="flex justify-center items-center gap-2 flex-wrap">
        {options.map(option => (
          <button
            key={option.name}
            onClick={() => onSelect(option.name)}
            className={`p-2 rounded-md transition-all duration-200 border-2 ${
              selectedOption === option.name 
                ? 'bg-[#FFE66D] border-black scale-110' 
                : 'bg-white border-gray-300 hover:bg-yellow-100'
            }`}
            title={option.name}
          >
            <option.component className="w-8 h-8" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionSelector;
