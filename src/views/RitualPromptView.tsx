import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PromptInput from "../components/PromptInput";
import LoadingOverlay from "../components/LoadingOverlay";
import SoundList from "../components/SoundList";
import SoundPlayer from "../components/SoundPlayer";
import "./RitualPromptView.css";

const RitualPromptView: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [autoPlay, setAutoPlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sounds, setSounds] = useState<string[]>([]);
  const [currentSoundIndex, setCurrentSoundIndex] = useState<number | null>(
    null,
  ); // Maneja el índice actual
  const navigate = useNavigate();

  const handleGenerateClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        },
      );
      const data = await response.json();
      setSounds([...sounds, data.sound_url]); // Añade la URL del nuevo sonido
    } catch (error) {
      console.error("Error al generar sonido:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSound = (sound: string) => {
    const index = sounds.indexOf(sound);
    if (index !== -1) {
      setCurrentSoundIndex(index); // Actualiza el índice actual en lugar de solo la URL
      setAutoPlay(true);
    }
  };

  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <div className="ritual-prompt-view">
      <h1 className="title" onClick={handleTitleClick}>
        ECO AURA
      </h1>
      <div className="content-container">
        <div className="left-column">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerateClick}
          />
          <div className="prompt-inspiration">
            <p>¿Te falta inspiración? Mira estos ejemplos:</p>
            <ul>
              <li>
                -{" "}
                <i>
                  &quot;Ritual en el que enciendo velas, apago las luces para
                  hacer yoga.&quot;
                </i>
              </li>
              <li>
                - <i>&quot;Ritual en donde hago mi skincare.&quot;</i>
              </li>
              <li>
                - <i>&quot;Ritual de limpieza energética de mi pieza.&quot;</i>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-column">
          <SoundList sounds={sounds} onSelectSound={handleSelectSound} />
        </div>
      </div>
      {loading && <LoadingOverlay />}
      {currentSoundIndex !== null && (
        <SoundPlayer
          sounds={sounds} // Pasa la lista completa
          initialIndex={currentSoundIndex} // Pasa el índice inicial
          autoPlay={autoPlay}
        />
      )}
    </div>
  );
};

export default RitualPromptView;
