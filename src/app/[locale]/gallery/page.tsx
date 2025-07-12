"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PageContainer, PageTitle } from "@/components/ui/PageLayout";

export default function GalleryPage() {
  const t = useTranslations();

  return (
    <PageContainer>
      <PageTitle>{t("gallery.title")}</PageTitle>
      {/* Gallery content will be added here */}
    </PageContainer>
  );
}
