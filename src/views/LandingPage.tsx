// src/views/LandingPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import CircleButton from "../components/CircleButton";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/prompt"); // Navega a la vista de prompt
  };

  return (
    <div className="landing-container">
      <div className="landing-titles">
        <h1 className="landing-title">ECO AURA</h1>
        <h3>IA Generadora de sonidos personalizados para rituales</h3>
      </div>
      <CircleButton text="Comenzar" size="12rem" onClick={handleButtonClick} />
    </div>
  );
};

export default LandingPage;
