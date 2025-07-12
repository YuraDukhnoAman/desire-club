"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import styled from "styled-components";

const SwitcherContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SwitcherButton = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const SwitcherDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  min-width: 140px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transform: translateY(${({ isOpen }) => (isOpen ? "0" : "-10px")});
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    top: auto;
    bottom: ${({ theme }) => theme.spacing.xl};
    left: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    transform: translateY(${({ isOpen }) => (isOpen ? "0" : "20px")});
  }
`;

const SwitcherOption = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.surfaceLight : "none"};
  border: none;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }

  &:first-child {
    border-radius: ${({ theme }) => theme.borderRadius.md}
      ${({ theme }) => theme.borderRadius.md} 0 0;
  }

  &:last-child {
    border-radius: 0 0 ${({ theme }) => theme.borderRadius.md}
      ${({ theme }) => theme.borderRadius.md};
  }
`;

const LanguageSymbol = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  min-width: 2em;
  text-align: center;
`;

const locales = [
  { code: "en", nativeName: "English", name: "English", symbol: "EN" },
  { code: "he", nativeName: "עברית", name: "Hebrew", symbol: "HE" },
  { code: "ru", nativeName: "Русский", name: "Russian", symbol: "RU" },
];

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

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
    setIsOpen(false);
  };

  return (
    <SwitcherContainer ref={containerRef}>
      <SwitcherButton
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <LanguageSymbol>{currentLocale.symbol}</LanguageSymbol>
        <span aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
      </SwitcherButton>

      <SwitcherDropdown isOpen={isOpen} role="menu">
        {locales.map((localeOption) => (
          <SwitcherOption
            key={localeOption.code}
            onClick={() => handleLocaleChange(localeOption.code)}
            isActive={localeOption.code === locale}
            role="menuitem"
            aria-current={localeOption.code === locale}
          >
            <LanguageSymbol>{localeOption.symbol}</LanguageSymbol>
            <span>{localeOption.nativeName}</span>
          </SwitcherOption>
        ))}
      </SwitcherDropdown>
    </SwitcherContainer>
  );
}
