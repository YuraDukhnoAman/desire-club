"use client";

import React from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PageContainer, PageTitle } from "@/components/ui/PageLayout";

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

const ReviewsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const ComingSoon = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-style: italic;
`;

export default function ReviewsPage() {
  const t = useTranslations("reviews");

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

        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #FF6B35 0%, #ff0080 100%)",
            top: "60%",
            left: "60%",
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
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

        <ReviewsContainer>
          <ComingSoon
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t("comingSoon")}
          </ComingSoon>
        </ReviewsContainer>
      </PageContainer>
    </PageWrapper>
  );
}
