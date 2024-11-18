// src/components/CircleButton.tsx
import React from "react";
import "./CircleButton.css";
import startButton from "../assets/start_button.png";

interface CircleButtonProps {
  text: string;
  onClick?: () => void;
  size?: string; // Nueva propiedad opcional para el tamaño
}

const CircleButton: React.FC<CircleButtonProps> = ({
  text,
  onClick,
  size = "12rem",
}) => {
  return (
    <button
      className="circle-button"
      onClick={onClick}
      style={{ width: size, height: size }}
    >
      <img src={startButton} alt="Circle button" className="button-image" />
      <span className="button-text" style={{ fontSize: `calc(${size} / 6)` }}>
        {text}
      </span>
    </button>
  );
};

export default CircleButton;
