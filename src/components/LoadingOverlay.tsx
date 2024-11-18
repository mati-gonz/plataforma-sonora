// src/components/LoadingOverlay.tsx
import React from "react";
import "./LoadingOverlay.css";

const LoadingOverlay: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-message">
        <h3>Generando...</h3>
        <p>
          Déjate envolver por cada detalle: usa audífonos para una mejor
          experiencia sonora.
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
