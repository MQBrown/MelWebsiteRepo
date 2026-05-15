import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton({ fallback = "/", label = "← Back" }) {
  const navigate = useNavigate();

  const goBack = () => {
    // If there is no meaningful history entry, use a safe fallback.
    if (window.history.length > 1) navigate(-1);
    else navigate(fallback, { replace: true });
  };

  return (
    <button className="btn secondary" onClick={goBack} type="button">
      {label}
    </button>
  );
}
