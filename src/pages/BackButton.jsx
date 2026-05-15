import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BackButton({ fallback = "/", label = "← Back" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    // If user landed directly on the page (no meaningful history),
    // navigate(-1) could go off-site. Use a safe fallback.
    const hasState = Boolean(location.state);
    if (hasState) navigate(-1);
    else navigate(fallback, { replace: true });
  };

  return (
    <button className="btn secondary" onClick={goBack} type="button">
      {label}
    </button>
  );
}
