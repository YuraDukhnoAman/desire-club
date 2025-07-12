"use client";

import React from "react";
import { StyledComponentsRegistry } from "@/lib/styled-components";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import styled from "styled-components";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: #0a0a0a;
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
  background: rgba(26, 26, 26, 0.8);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #333;
  box-shadow: 0 8px 32px rgba(255, 0, 128, 0.1);
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
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
  color: #ff0080;
  font-family: "Orbitron", monospace;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(255, 0, 128, 0.3);
`;

const ErrorMessage = styled.p`
  color: #cccccc;
  font-size: 1.125rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button<{ variant: "primary" | "secondary" }>`
  background: ${(props) =>
    props.variant === "primary" ? "#FF0080" : "transparent"};
  color: ${(props) => (props.variant === "primary" ? "#ffffff" : "#00FFFF")};
  border: ${(props) =>
    props.variant === "primary" ? "none" : "2px solid #00FFFF"};
  padding: ${(props) =>
    props.variant === "primary" ? "12px 24px" : "10px 24px"};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.variant === "primary" ? "0 4px 12px rgba(255, 0, 128, 0.3)" : "none"};

  &:hover {
    transform: ${(props) =>
      props.variant === "primary" ? "translateY(-2px)" : "none"};
    background: ${(props) =>
      props.variant === "primary" ? "#FF0080" : "#00FFFF"};
    color: ${(props) => (props.variant === "primary" ? "#ffffff" : "#000000")};
    box-shadow: ${(props) =>
      props.variant === "primary"
        ? "0 6px 20px rgba(255, 0, 128, 0.4)"
        : "none"};
  }
`;

const ErrorDetails = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #1a1a1a;
  border-radius: 6px;
  border: 1px solid #333333;
  color: #999999;
  font-family: monospace;
  font-size: 0.875rem;
  text-align: left;
`;

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  React.useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <ErrorContainer>
              <BackgroundEffect />
              <ErrorContent>
                <ErrorIcon>⚠️</ErrorIcon>
                <ErrorTitle>System Error</ErrorTitle>
                <ErrorMessage>
                  A critical error occurred in the application. The entire
                  system needs to restart.
                </ErrorMessage>

                <ButtonGroup>
                  <Button variant="primary" onClick={reset}>
                    Try Again
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => (window.location.href = "/")}
                  >
                    Go Home
                  </Button>
                </ButtonGroup>

                {process.env.NODE_ENV === "development" && error.digest && (
                  <ErrorDetails>
                    <strong>Error ID:</strong> {error.digest}
                    <br />
                    <strong>Message:</strong> {error.message}
                  </ErrorDetails>
                )}
              </ErrorContent>
            </ErrorContainer>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
