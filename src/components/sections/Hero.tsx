"use client";

import React from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const HeroContainer = styled.section`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/assets/ui/backgrounds/hero/487941383_1220824813381549_7407778124659682855_n.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => `${theme.colors.background}CC`} 0%,
      ${({ theme }) => `${theme.colors.primary}26`} 100%
    );
    z-index: 1;
  }
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.xxl};
  max-width: 800px;
  width: 100%;
  z-index: 2;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const HeroContent = styled.div`
  text-align: center;
  position: relative;
`;

const NeonTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.typography.fontSize["6xl"]};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px ${({ theme }) => `${theme.colors.primary}50`};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  }
`;

const AnimatedSubtitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const GlowingDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  text-shadow: 0 0 10px ${({ theme }) => `${theme.colors.primary}30`};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const HeroActions = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  pointer-events: none;
`;

const AnimatedBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    ${({ theme }) => `${theme.colors.primary}15`} 0%,
    ${({ theme }) => `${theme.colors.secondary}15`} 50%,
    ${({ theme }) => `${theme.colors.primary}15`} 100%
  );
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  z-index: 0;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export function Hero() {
  const t = useTranslations("hero");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <HeroContainer>
      <GlassCard
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroContent>
          <NeonTitle variants={itemVariants}>{t("title")}</NeonTitle>
          <AnimatedSubtitle variants={itemVariants}>
            {t("subtitle")}
          </AnimatedSubtitle>
          <GlowingDescription variants={itemVariants}>
            {t("description")}
          </GlowingDescription>
          <HeroActions variants={itemVariants}>
            <Button variant="primary" size="large" href="/book">
              {t("bookTable")}
            </Button>
            <Button variant="secondary" size="large" href="/events">
              {t("viewEvents")}
            </Button>
          </HeroActions>
        </HeroContent>
      </GlassCard>
    </HeroContainer>
  );
}
