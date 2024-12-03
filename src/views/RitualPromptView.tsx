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
  const [cleanUrls, setCleanUrls] = useState<string[]>([]);
  const [generatedPrompts, setGeneratedPrompts] = useState<
    Record<string, string[]>
  >({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Mensaje de error o info
  const [currentSoundIndex, setCurrentSoundIndex] = useState<number | null>(
    null,
  ); // Maneja el índice actual
  const navigate = useNavigate();

  const handleGenerateClick = async () => {
    setLoading(true);
    setErrorMessage(null); // Limpia cualquier mensaje anterior

    try {
      // Normalizar el prompt para comparación
      const normalizedPrompt = prompt.trim().toLowerCase();

      // Buscar un prompt similar
      const similarPrompt = Object.keys(generatedPrompts).find(
        (key) =>
          Math.abs(key.length - normalizedPrompt.length) <= 4 &&
          key.includes(normalizedPrompt),
      );

      const uniqueCleanUrls = similarPrompt
        ? generatedPrompts[similarPrompt].map((url) => url.split("?")[0])
        : [];

      // Validar si ya se generaron 4 sonidos únicos
      if (uniqueCleanUrls.length >= 4) {
        setErrorMessage(
          "Ya se ha generado el máximo de sonidos para este ritual. Por favor, ingresa uno nuevo.",
        );
        setLoading(false);
        return;
      }

      let newSoundUrl = "";
      let cleanSoundUrl = "";
      let attempts = 0;

      // Solicitar sonidos únicos hasta que se obtenga uno nuevo o se alcance el límite
      while (attempts < 10) {
        attempts++;
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
        newSoundUrl = data.sound_url;
        cleanSoundUrl = newSoundUrl.split("?")[0]; // Extraer clean URL

        // Verificar si la clean URL es única
        if (!cleanUrls.includes(cleanSoundUrl)) {
          break; // Salir del bucle si se encuentra un sonido único
        }
      }

      // Si no se encontró un sonido único tras varios intentos
      if (attempts >= 10) {
        setErrorMessage(
          "No se pudo generar un sonido único. Inténtalo de nuevo más tarde.",
        );
        setLoading(false);
        return;
      }

      // Actualizar las listas
      setGeneratedPrompts((prev) => ({
        ...prev,
        [similarPrompt || normalizedPrompt]: [
          ...(generatedPrompts[similarPrompt || normalizedPrompt] || []),
          cleanSoundUrl,
        ],
      }));
      setSounds((prev) => [...prev, newSoundUrl]); // Agregar la URL completa
      setCleanUrls((prev) => [...prev, cleanSoundUrl]); // Agregar la clean URL
    } catch (error) {
      console.error("Error al generar sonido:", error);
      setErrorMessage(
        "Hubo un error al generar el sonido. Por favor, inténtalo nuevamente.",
      );
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
