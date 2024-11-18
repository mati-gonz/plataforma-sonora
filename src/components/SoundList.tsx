// src/components/SoundList.tsx
import React from "react";
import SoundItem from "./SoundItem";
import "./SoundList.css";

interface SoundListProps {
  sounds: Array<string>; // Array de URLs
  onSelectSound: (sound: string) => void;
}

const SoundList: React.FC<SoundListProps> = ({ sounds, onSelectSound }) => {
  return (
    <div className="sound-list">
      {sounds.map((sound, index) => (
        <SoundItem
          key={index}
          sound={sound}
          soundNumber={index + 1}
          onSelect={() => onSelectSound(sound)}
        />
      ))}
    </div>
  );
};

export default SoundList;
