"use client";

import React from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PageContainer, PageTitle } from "@/components/ui/PageLayout";
import { AlbumsGrid } from "@/components/sections/AlbumsGrid";

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const OrbsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  opacity: 0.15;
  mix-blend-mode: screen;
  will-change: transform;
`;

export default function GalleryPage() {
  const t = useTranslations();

  return (
    <PageWrapper>
      <OrbsContainer>
        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #ff0080 0%, #7928ca 100%)",
            top: "20%",
            left: "5%",
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #00FFFF 0%, #7928ca 100%)",
            bottom: "20%",
            right: "5%",
          }}
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </OrbsContainer>

      <PageContainer>
        <PageTitle>{t("gallery.title")}</PageTitle>
        <AlbumsGrid />
      </PageContainer>
    </PageWrapper>
  );
}
