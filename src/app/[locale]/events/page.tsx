"use client";

import React from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FacebookEventsGrid } from "@/components/sections/FacebookEventsGrid";

const PageContainer = styled.div`
  min-height: 100vh;
  padding: calc(${({ theme }) => theme.spacing.xxl} + 70px)
    ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => `${theme.colors.primary}15`} 100%
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: calc(${({ theme }) => theme.spacing.xl} + 70px);
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
  );
}
