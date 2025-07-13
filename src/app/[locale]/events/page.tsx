"use client";

import React from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FacebookEventsGrid } from "@/components/sections/FacebookEventsGrid";

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
  filter: blur(120px);
  pointer-events: none;
  opacity: 0.2;
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
    ${({ theme }) => `${theme.colors.primary}15`} 100%
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
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px ${({ theme }) => `${theme.colors.primary}50`};

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

export default function EventsPage() {
  const t = useTranslations("events");

  return (
    <PageWrapper>
      <OrbsContainer>
        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #ff0080 0%, #ff4500 100%)",
            width: "500px",
            height: "500px",
            top: "10%",
            left: "0%",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #00FFFF 0%, #7928ca 100%)",
            width: "400px",
            height: "400px",
            top: "60%",
            right: "5%",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #ff4500 0%, #ffd700 100%)",
            width: "350px",
            height: "350px",
            bottom: "10%",
            left: "20%",
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 14,
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
            {t("title")}
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("description")}
          </Description>
        </Header>

        <FacebookEventsGrid />
      </PageContainer>
    </PageWrapper>
  );
}
