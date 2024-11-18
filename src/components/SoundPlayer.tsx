// src/components/SoundPlayer.tsx
import React from "react";

interface SoundPlayerProps {
  sound: any;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({ sound }) => {
  return (
    <div className="sound-player">
      <img src={sound.image} alt="Sound thumbnail" />
      <p>{sound.name}</p>
      {/* Aquí van los controles de reproducción */}
    </div>
  );
};

export default SoundPlayer;
