"use client";

import React from "react";
import styled from "styled-components";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { StyledComponentsRegistry } from "@/lib/styled-components";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const BackgroundEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 30%,
      rgba(255, 0, 128, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(0, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 50% 50%,
      rgba(255, 69, 0, 0.05) 0%,
      transparent 50%
    );
  animation: backgroundShift 8s ease-in-out infinite;

  @keyframes backgroundShift {
    0%,
    100% {
      transform: translateX(0) translateY(0);
    }
    25% {
      transform: translateX(20px) translateY(-10px);
    }
    50% {
      transform: translateX(-10px) translateY(15px);
    }
    75% {
      transform: translateX(15px) translateY(-20px);
    }
  }
`;

const NotFoundContent = styled.div`
  max-width: 600px;
  z-index: 2;
  position: relative;
`;

const ErrorCode = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["6xl"]};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  color: transparent;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: neonFlicker 3s infinite;

  @keyframes neonFlicker {
    0%,
    18%,
    22%,
    25%,
    53%,
    57%,
    100% {
      text-shadow: 0 0 4px #ff0080, 0 0 11px #ff0080, 0 0 19px #ff0080,
        0 0 40px #ff0080;
    }
    20%,
    24%,
    55% {
      text-shadow: none;
    }
  }
`;

const NotFoundTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const NotFoundMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

export default function NotFound() {
  const t = useTranslations();

  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <NotFoundContainer>
              <BackgroundEffect />
              <NotFoundContent>
                <ErrorCode>404</ErrorCode>
                <NotFoundTitle>{t("notFound.title")}</NotFoundTitle>
                <NotFoundMessage>{t("notFound.message")}</NotFoundMessage>

                <ButtonGroup>
                  <Button variant="primary" href="/">
                    {t("notFound.backHome")}
                  </Button>
                  <Button variant="secondary" href="/events">
                    {t("notFound.exploreEvents")}
                  </Button>
                  <Button variant="outline" href="/contact">
                    {t("notFound.contact")}
                  </Button>
                </ButtonGroup>
              </NotFoundContent>
            </NotFoundContainer>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
