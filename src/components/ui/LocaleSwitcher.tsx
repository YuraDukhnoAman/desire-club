"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import styled, { keyframes } from "styled-components";

// Animations
const neonGlow = keyframes`
  0%, 100% { 
    box-shadow: 
      0 0 5px rgba(255, 0, 128, 0.4),
      0 0 10px rgba(255, 0, 128, 0.3),
      0 0 15px rgba(255, 0, 128, 0.2);
  }
  50% { 
    box-shadow: 
      0 0 10px rgba(255, 0, 128, 0.6),
      0 0 20px rgba(255, 0, 128, 0.4),
      0 0 30px rgba(255, 0, 128, 0.3);
  }
`;

const slideIndicator = keyframes`
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const SwitcherContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ToggleContainer = styled.div`
  display: flex;
  background: linear-gradient(
    135deg,
    rgba(10, 10, 10, 0.9) 0%,
    rgba(30, 30, 30, 0.8) 100%
  );
  border: 1px solid rgba(255, 0, 128, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 4px;
  position: relative;
  backdrop-filter: blur(10px);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(255, 0, 128, 0.1) 0%,
      rgba(0, 255, 255, 0.05) 33%,
      rgba(255, 69, 0, 0.08) 66%,
      rgba(255, 0, 128, 0.1) 100%
    );
    background-size: 200% 200%;
    animation: ${slideIndicator} 3s ease-in-out infinite;
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(255, 0, 128, 0.5);
    animation: ${neonGlow} 2s ease-in-out infinite;
  }
`;

const ActiveIndicator = styled.div<{ $position: number; $width: number }>`
  position: absolute;
  top: 4px;
  left: ${({ $position }) => $position}px;
  width: ${({ $width }) => $width}px;
  height: calc(100% - 8px);
  background: linear-gradient(
    135deg,
    rgba(255, 0, 128, 0.3) 0%,
    rgba(0, 255, 255, 0.2) 50%,
    rgba(255, 69, 0, 0.3) 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.animations.duration.normal}
    cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 0, 128, 0.4);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    background-size: 200% 200%;
    animation: ${slideIndicator} 2s ease-in-out infinite;
  }
`;

const LanguageOption = styled.button<{ $isActive: boolean }>`
  background: transparent;
  border: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.text : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme, $isActive }) =>
    $isActive
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.animations.duration.fast}
    cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
  min-width: 45px;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    text-shadow: 0 0 8px rgba(255, 0, 128, 0.5);
  }

  &:active {
    transform: translateY(0);
    animation: ${pulse} 0.2s ease-out;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const LanguageLabel = styled.span<{ $isActive: boolean }>`
  background: ${({ theme, $isActive }) =>
    $isActive
      ? "linear-gradient(45deg, #fff, #f0f0f0)"
      : "linear-gradient(45deg, #888, #aaa)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};

  ${({ $isActive }) =>
    $isActive &&
    `
    filter: drop-shadow(0 0 3px rgba(255, 0, 128, 0.3));
  `}
`;

const locales = [
  {
    code: "en",
    nativeName: "English",
    name: "English",
    symbol: "EN",
  },
  {
    code: "he",
    nativeName: "עברית",
    name: "Hebrew",
    symbol: "HE",
  },
  {
    code: "ru",
    nativeName: "Русский",
    name: "Russian",
    symbol: "RU",
  },
];

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentLocaleIndex = locales.findIndex((l) => l.code === locale);

  useEffect(() => {
    const updateIndicator = () => {
      const currentOption = optionRefs.current[currentLocaleIndex];
      if (currentOption && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const optionRect = currentOption.getBoundingClientRect();

        const position = optionRect.left - containerRect.left;
        const width = optionRect.width;

        setIndicatorPosition(position);
        setIndicatorWidth(width);
      }
    };

    updateIndicator();

    // Update on window resize
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [currentLocaleIndex]);

  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const currentLocaleSegment = segments[0];

    // Check if the first segment is a locale
    const isLocaleSegment = locales.some(
      (l) => l.code === currentLocaleSegment
    );

    let newPath;
    if (isLocaleSegment) {
      // Replace the locale segment
      segments[0] = newLocale;
      newPath = "/" + segments.join("/");
    } else {
      // Add the locale segment
      newPath = "/" + newLocale + pathname;
    }

    router.push(newPath);
  };

  return (
    <SwitcherContainer ref={containerRef}>
      <ToggleContainer>
        <ActiveIndicator
          $position={indicatorPosition}
          $width={indicatorWidth}
        />
        {locales.map((localeOption, index) => (
          <LanguageOption
            key={localeOption.code}
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            onClick={() => handleLocaleChange(localeOption.code)}
            $isActive={localeOption.code === locale}
            aria-current={localeOption.code === locale}
            aria-label={`Switch to ${localeOption.name}`}
          >
            <LanguageLabel $isActive={localeOption.code === locale}>
              {localeOption.symbol}
            </LanguageLabel>
          </LanguageOption>
        ))}
      </ToggleContainer>
    </SwitcherContainer>
  );
}
