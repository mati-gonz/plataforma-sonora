import React, { useRef, useState } from "react";
import "./SoundPlayer.css";
import {
  FaStepBackward,
  FaStepForward,
  FaPlay,
  FaPause,
  FaDownload,
  FaShareAlt,
  FaSync,
} from "react-icons/fa";
import { getImageForSound } from "../utils/soundUtils";

interface SoundPlayerProps {
  sounds: string[]; // Lista de canciones (URLs)
  initialIndex: number; // Índice inicial
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({ sounds, initialIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [isRepeating, setIsRepeating] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastClickRef = useRef<number | null>(null); // Almacena el timestamp del último clic en "Atrás"

  const selectedSound = sounds[currentIndex];
  const image = getImageForSound(currentIndex);

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

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop;
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
    link.download = `ritual_sound_${currentIndex + 1}.mp3`;
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

  const handlePrev = () => {
    const now = Date.now();

    if (audioRef.current && audioRef.current.currentTime > 5) {
      // Reinicia la canción si el tiempo actual es mayor a 5 segundos
      audioRef.current.currentTime = 0;
    } else if (lastClickRef.current && now - lastClickRef.current < 500) {
      // Si el segundo clic en "Atrás" ocurre en menos de 500ms, retrocede a la canción anterior
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setIsPlaying(false); // Detén la reproducción al cambiar de canción
      }
    }

    lastClickRef.current = now;
  };

  const handleNext = () => {
    if (currentIndex < sounds.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(false); // Detén la reproducción al cambiar de canción
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
      <div className="player-left">
        <div className="player-thumbnail">
          <img src={image} alt="Sound thumbnail" />
        </div>
        <div className="player-info">
          <p className="player-time">
            {currentTime} / {duration}
          </p>
        </div>
      </div>
      <div className="player-center">
        <button
          className={`player-button repeat ${isRepeating ? "active" : ""}`}
          onClick={toggleRepeat}
        >
          <FaSync />
        </button>
        <button className="player-button prev" onClick={handlePrev}>
          <FaStepBackward />
        </button>
        <button className="player-button play" onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          className="player-button next"
          onClick={handleNext}
          disabled={currentIndex >= sounds.length - 1} // Desactiva si no hay más canciones
        >
          <FaStepForward />
        </button>
      </div>
      <div className="player-right">
        <button className="player-button download" onClick={handleDownload}>
          <FaDownload />
        </button>
        <button className="player-button share" onClick={handleShare}>
          <FaShareAlt />
        </button>
      </div>
    </div>
  );
};

export default SoundPlayer;
