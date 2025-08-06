"use client";

import React from "react";
import { useTranslations } from "next-intl";

export function EventsPreview() {
  const t = useTranslations("events");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <p style={{ color: "#666", marginTop: "1rem" }}>
        Events preview component - placeholder
      </p>
    </div>
  );
}
