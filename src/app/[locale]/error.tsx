"use client";

import React from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorContainer = styled.div`
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

const ErrorContent = styled.div`
  max-width: 600px;
  z-index: 2;
  position: relative;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }
`;

const ErrorTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-shadow: 0 0 10px rgba(255, 0, 128, 0.3);
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const ErrorDetails = styled.details`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: monospace;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  max-width: 100%;
  overflow-x: auto;

  summary {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

export default function Error({ error, reset }: ErrorPageProps) {
  const t = useTranslations();

  React.useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <ErrorContainer>
      <BackgroundEffect />
      <ErrorContent>
        <ErrorIcon>⚠️</ErrorIcon>
        <ErrorTitle>{t("error.title")}</ErrorTitle>
        <ErrorMessage>{t("error.message")}</ErrorMessage>

        <ButtonGroup>
          <Button variant="primary" onClick={reset}>
            {t("error.tryAgain")}
          </Button>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            {t("error.refresh")}
          </Button>
          <Button variant="outline" href="/">
            {t("error.backHome")}
          </Button>
        </ButtonGroup>

        {process.env.NODE_ENV === "development" && error.digest && (
          <ErrorDetails>
            <summary>Error Details (Development Only)</summary>
            <pre>
              <strong>Error ID:</strong> {error.digest}
              <br />
              <strong>Message:</strong> {error.message}
            </pre>
          </ErrorDetails>
        )}
      </ErrorContent>
    </ErrorContainer>
  );
}
