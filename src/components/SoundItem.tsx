// src/components/SoundItem.tsx
import React from "react";

interface SoundItemProps {
  sound: any;
  onSelect: () => void;
}

const SoundItem: React.FC<SoundItemProps> = ({ sound, onSelect }) => {
  return (
    <div className="sound-item" onClick={onSelect}>
      <img src={sound.image} alt="Sound thumbnail" />
      <div className="sound-info">
        <h4>{sound.name}</h4>
        <p>{sound.duration}</p>
        <button>Reproducir</button>
      </div>
    </div>
  );
};

export default SoundItem;
