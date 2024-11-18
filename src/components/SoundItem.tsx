// src/components/SoundItem.tsx
import React, { useEffect, useState } from "react";
import { getImageForSound } from "../utils/soundUtils";
import "./SoundItem.css";

interface SoundItemProps {
  sound: string; // URL del sonido
  soundNumber: number;
  onSelect: () => void;
}

const SoundItem: React.FC<SoundItemProps> = ({
  sound,
  soundNumber,
  onSelect,
}) => {
  const [duration, setDuration] = useState<string>("Cargando...");
  const image = getImageForSound(soundNumber - 1);

  useEffect(() => {
    const audio = new Audio(sound);
    audio.onloadedmetadata = () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60)
        .toString()
        .padStart(2, "0");
      setDuration(`${minutes}:${seconds}`);
    };
    audio.onerror = () => {
      setDuration("Desconocido");
    };
  }, [sound]);

  return (
    <div className="sound-item" onClick={onSelect}>
      <img src={image} alt="Sound thumbnail" />
      <h4>Ritual {soundNumber}</h4>
      <p>{duration}</p>
      <button>Reproducir</button>
    </div>
  );
};

export default SoundItem;
