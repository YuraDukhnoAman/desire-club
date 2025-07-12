"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PageContainer, PageTitle } from "@/components/ui/PageLayout";

export default function FAQPage() {
  const t = useTranslations();

  return (
    <PageContainer>
      <PageTitle>{t("faq.title")}</PageTitle>
      {/* FAQ content will be added here */}
    </PageContainer>
  );
}
