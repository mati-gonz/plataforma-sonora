// src/components/SoundList.tsx
import React from "react";
import SoundItem from "./SoundItem";

interface SoundListProps {
  sounds: Array<any>;
  onSelectSound: (sound: any) => void;
}

const SoundList: React.FC<SoundListProps> = ({ sounds, onSelectSound }) => {
  return (
    <div className="sound-list">
      {sounds.map((sound, index) => (
        <SoundItem
          key={index}
          sound={sound}
          onSelect={() => onSelectSound(sound)}
        />
      ))}
    </div>
  );
};

export default SoundList;
