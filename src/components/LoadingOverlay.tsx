import React from "react";
import "./LoadingOverlay.css";
import loadingGif from "../assets/generando.gif"; // Importa el gif correctamente

const LoadingOverlay: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-message">
        {/* Contenedor para la imagen */}
        <div className="loading-message-image-container">
          <img
            className="loading-message-image"
            src={loadingGif}
            alt="Loading animation"
          />
        </div>
        {/* Texto encima de la imagen */}
        <div className="loading-message-text">
          <h3>Generando...</h3>
          <p>
            Déjate envolver por cada detalle: usa audífonos para una mejor
            experiencia sonora.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
