import React from "react";

export default function Logo({ className = "h-8", alt = "Snaplifye" }) {
  return (
    <img
      src="/images/logo.png"
      alt={alt}
      className={className}
    />
  );
}
