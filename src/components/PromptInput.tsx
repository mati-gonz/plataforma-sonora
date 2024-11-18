// src/components/PromptInput.tsx
import React from "react";
import CircleButton from "./CircleButton";
import "./PromptInput.css";

interface PromptInputProps {
  prompt: string;
  setPrompt: (text: string) => void;
  onGenerate: () => void;
}

const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  onGenerate,
}) => {
  return (
    <div className="prompt-input">
      <h2>¿Qué ritual realizarás?</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        maxLength={200}
      />
      <div className="char-count">{`${prompt.length}/200`}</div>
      <CircleButton text="Generar" size="9rem" onClick={onGenerate} />
    </div>
  );
};

export default PromptInput;
