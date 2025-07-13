"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PageContainer, PageTitle } from "@/components/ui/PageLayout";
import { AlbumsGrid } from "@/components/sections/AlbumsGrid";

export default function GalleryPage() {
  const t = useTranslations();

  return (
    <PageContainer>
      <PageTitle>{t("gallery.title")}</PageTitle>
      <AlbumsGrid />
    </PageContainer>
  );
}
