"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const StyledButton = styled.button<{ $variant: string; $size: string }>`
  background: ${({ $variant }) =>
    $variant === "primary"
      ? "#FF0080"
      : $variant === "secondary"
      ? "#00FFFF"
      : "transparent"};
  color: ${({ $variant }) =>
    $variant === "primary"
      ? "#ffffff"
      : $variant === "secondary"
      ? "#000000"
      : "#FF0080"};
  border: ${({ $variant }) =>
    $variant === "outline" ? "2px solid #FF0080" : "none"};
  padding: ${({ $size }) =>
    $size === "small"
      ? "0.5rem 1rem"
      : $size === "large"
      ? "1rem 2rem"
      : "0.75rem 1.5rem"};
  font-size: ${({ $size }) =>
    $size === "small" ? "0.875rem" : $size === "large" ? "1.125rem" : "1rem"};
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer !important;
  pointer-events: all !important;
  position: relative;
  z-index: 10;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 0, 128, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)<{ $variant: string; $size: string }>`
  background: ${({ $variant }) =>
    $variant === "primary"
      ? "#FF0080"
      : $variant === "secondary"
      ? "#00FFFF"
      : "transparent"};
  color: ${({ $variant }) =>
    $variant === "primary"
      ? "#ffffff"
      : $variant === "secondary"
      ? "#000000"
      : "#FF0080"};
  border: ${({ $variant }) =>
    $variant === "outline" ? "2px solid #FF0080" : "none"};
  padding: ${({ $size }) =>
    $size === "small"
      ? "0.5rem 1rem"
      : $size === "large"
      ? "1rem 2rem"
      : "0.75rem 1.5rem"};
  font-size: ${({ $size }) =>
    $size === "small" ? "0.875rem" : $size === "large" ? "1.125rem" : "1rem"};
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 0, 128, 0.3);
    color: ${({ $variant }) =>
      $variant === "primary"
        ? "#ffffff"
        : $variant === "secondary"
        ? "#000000"
        : "#FF0080"};
  }
`;

export function Button({
  variant = "primary",
  size = "medium",
  href,
  onClick,
  disabled,
  children,
  className,
  external = false,
}: ButtonProps) {
  if (href) {
    if (external) {
      return (
        <StyledButton
          as="a"
          href={href}
          $variant={variant}
          $size={size}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </StyledButton>
      );
    }
    return (
      <Link href={href}>
        <StyledButton
          $variant={variant}
          $size={size}
          className={className}
          onClick={() => {
            onClick?.();
          }}
        >
          {children}
        </StyledButton>
      </Link>
    );
  }

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </StyledButton>
  );
}
