import React, { useRef, useState } from "react";
import "./SoundPlayer.css";
import { getImageForSound } from "../utils/soundUtils";

interface SoundPlayerProps {
  selectedSound: string; // URL del sonido
  indexOfSelectedSound: number; // Índice del sonido seleccionado
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({
  selectedSound,
  indexOfSelectedSound,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const audioRef = useRef<HTMLAudioElement>(null);

  const image = getImageForSound(indexOfSelectedSound);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateCurrentTime = () => {
    if (audioRef.current) {
      setCurrentTime(formatTime(audioRef.current.currentTime));
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedSound;
    link.download = `ritual_sound_${indexOfSelectedSound + 1}.mp3`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Eco Aura: Ritual Sonoro",
          text: "Escucha este ritual sonoro que generé en Eco Aura.",
          url: selectedSound,
        });
        alert("¡Enlace compartido con éxito!");
      } catch (err) {
        console.error("Error al compartir:", err);
      }
    } else {
      alert(
        "La funcionalidad de compartir no está disponible en este navegador.",
      );
    }
  };

  return (
    <div className="sound-player">
      <audio
        ref={audioRef}
        src={selectedSound}
        onTimeUpdate={updateCurrentTime}
        onLoadedMetadata={onLoadedMetadata}
      ></audio>
      <div className="player-thumbnail">
        <img src={image} alt="Sound thumbnail" className="player-thumbnail" />
      </div>
      <div className="player-info">
        <p className="player-time">
          {currentTime} / {duration}
        </p>
      </div>
      <div className="player-controls">
        <button className="player-button prev">&#x23EE;</button>
        <button className="player-button play" onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="player-button next">&#x23ED;</button>
        <button className="player-button download" onClick={handleDownload}>
          ⬇️
        </button>
        <button className="player-button share" onClick={handleShare}>
          🔗
        </button>
      </div>
    </div>
  );
};

export default SoundPlayer;
