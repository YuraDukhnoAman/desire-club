"use client";

import React from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { motion } from "framer-motion";
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
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  opacity: 0.18;
  mix-blend-mode: screen;
  will-change: transform;
`;

const PageContainer = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: calc(${({ theme }) => theme.spacing.xxl} + 140px)
    ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => `${theme.colors.secondary}10`} 100%
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: calc(${({ theme }) => theme.spacing.xl} + 140px);
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 1200px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled(motion.h1)`
  font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary} 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px ${({ theme }) => `${theme.colors.secondary}50`};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  }
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

export default function GalleryPage() {
  const t = useTranslations();

  return (
    <PageWrapper>
      <OrbsContainer>
        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #00FFFF 0%, #0080ff 100%)",
            width: "450px",
            height: "450px",
            top: "15%",
            right: "10%",
          }}
          animate={{
            x: [0, -25, 0],
            y: [0, 35, 0],
            scale: [1, 1.3, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #ff0080 0%, #c13584 100%)",
            width: "380px",
            height: "380px",
            bottom: "25%",
            left: "8%",
          }}
          animate={{
            x: [0, 45, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #7928ca 0%, #ff4500 100%)",
            width: "320px",
            height: "320px",
            top: "50%",
            left: "60%",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #ffd700 0%, #ff6b6b 100%)",
            width: "280px",
            height: "280px",
            bottom: "5%",
            right: "25%",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </OrbsContainer>

      <PageContainer>
        <Header>
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("gallery.title")}
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("gallery.albums.description")}
          </Description>
        </Header>

        <AlbumsGrid />
      </PageContainer>
    </PageWrapper>
  );
}
