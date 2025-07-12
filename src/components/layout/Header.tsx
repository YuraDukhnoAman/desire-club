"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styled, { keyframes, css } from "styled-components";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { DesireLogo } from "@/components/ui/DesireLogo";

// Animations
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 128, 0.3); }
  50% { box-shadow: 0 0 30px rgba(255, 0, 128, 0.6), 0 0 40px rgba(255, 0, 128, 0.4); }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const logoFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
`;

const menuItemSlide = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const colorShift = keyframes`
  0% { 
    background-position: 0% 50%;
  }
  50% { 
    background-position: 100% 50%;
  }
  100% { 
    background-position: 0% 50%;
  }
`;

const neonPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px rgba(255, 0, 128, 0.3), 0 0 10px rgba(0, 255, 255, 0.2);
  }
  50% { 
    box-shadow: 0 0 10px rgba(255, 0, 128, 0.5), 0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(255, 69, 0, 0.2);
  }
`;

// Styled Components
const HeaderContainer = styled.header<{
  $isScrolled: boolean;
  $isVisible: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background: ${({ $isScrolled }) =>
    $isScrolled
      ? "linear-gradient(135deg, rgba(10, 10, 10, 0.98) 0%, rgba(26, 26, 26, 0.95) 50%, rgba(10, 10, 10, 0.98) 100%)"
      : "linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(20, 20, 20, 0.92) 50%, rgba(10, 10, 10, 0.95) 100%)"};
  backdrop-filter: blur(
    ${({ $isScrolled }) => ($isScrolled ? "15px" : "10px")}
  );
  border-bottom: 1px solid
    ${({ theme, $isScrolled }) =>
      $isScrolled ? theme.colors.primary : theme.colors.border};
  transition: all ${({ theme }) => theme.animations.duration.normal}
    ${({ theme }) => theme.animations.easing.easeInOut};
  transform: translateY(${({ $isVisible }) => ($isVisible ? "0" : "-100%")});

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.gradients.primary};
    opacity: ${({ $isScrolled }) => ($isScrolled ? 1 : 0)};
    transition: opacity ${({ theme }) => theme.animations.duration.normal};
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $isScrolled }) =>
      $isScrolled
        ? `radial-gradient(ellipse at 20% 50%, rgba(255, 0, 128, 0.08) 0%, transparent 50%),
           radial-gradient(ellipse at 80% 50%, rgba(0, 255, 255, 0.06) 0%, transparent 50%),
           linear-gradient(90deg, rgba(255, 69, 0, 0.03) 0%, rgba(255, 0, 128, 0.04) 50%, rgba(0, 255, 255, 0.03) 100%)`
        : `radial-gradient(ellipse at 30% 50%, rgba(255, 0, 128, 0.05) 0%, transparent 60%),
           radial-gradient(ellipse at 70% 50%, rgba(0, 255, 255, 0.04) 0%, transparent 60%),
           linear-gradient(45deg, rgba(255, 69, 0, 0.02) 0%, rgba(255, 0, 128, 0.03) 50%, rgba(0, 255, 255, 0.02) 100%)`};
    background-size: 400% 400%;
    animation: ${colorShift} 8s ease-in-out infinite;
    pointer-events: none;
    opacity: ${({ $isScrolled }) => ($isScrolled ? 1 : 0.8)};
    transition: all ${({ theme }) => theme.animations.duration.normal};
  }
`;

const Nav = styled.nav<{ $isScrolled: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme, $isScrolled }) =>
    $isScrolled
      ? `${theme.spacing.sm} ${theme.spacing.lg}`
      : `${theme.spacing.md} ${theme.spacing.lg}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: padding ${({ theme }) => theme.animations.duration.normal}
    ${({ theme }) => theme.animations.easing.easeInOut};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.md};
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
  }
`;

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.gradients.primary};
    transition: width ${({ theme }) => theme.animations.duration.normal};
  }

  ${LogoContainer}:hover & {
    color: ${({ theme }) => theme.colors.primary};

    &::after {
      width: 100%;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(10, 10, 10, 0.98) 0%,
      rgba(26, 26, 26, 0.95) 100%
    );
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.xl};
    animation: ${({ $isOpen }) => ($isOpen ? slideDown : slideUp)}
      ${({ theme }) => theme.animations.duration.normal}
      ${({ theme }) => theme.animations.easing.easeInOut};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(
        circle at 50% 50%,
        rgba(255, 0, 128, 0.1) 0%,
        transparent 70%
      );
      pointer-events: none;
    }
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean; $index: number }>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.textSecondary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  position: relative;
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  &::before {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.gradients.primary};
    transition: all ${({ theme }) => theme.animations.duration.normal};
    transform: translateX(-50%);
  }

  &::after {
    content: "";
    position: absolute;
    inset: -8px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: rgba(255, 0, 128, 0.1);
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animations.duration.fast};
    z-index: -1;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);

    &::before {
      width: 100%;
    }

    &::after {
      opacity: 1;
    }
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      &::before {
        width: 100%;
      }
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    padding: ${({ theme }) => theme.spacing.md} 0;
    animation: ${menuItemSlide}
      ${({ theme }) => theme.animations.duration.normal}
      ${({ theme }) => theme.animations.easing.easeInOut};
    animation-delay: ${({ $index }) => $index * 0.1}s;
    animation-fill-mode: both;

    &:hover {
      transform: translateX(10px);
    }
  }
`;

const MenuButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all ${({ theme }) => theme.animations.duration.fast};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradients.primary};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animations.duration.fast};
  }

  &:hover::before {
    opacity: 0.2;
  }

  span {
    position: relative;
    z-index: 1;
    display: block;
    width: 20px;
    height: 2px;
    background: ${({ theme }) => theme.colors.text};
    transition: all ${({ theme }) => theme.animations.duration.fast};

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 2px;
      background: ${({ theme }) => theme.colors.text};
      transition: all ${({ theme }) => theme.animations.duration.fast};
    }

    &::before {
      top: -6px;
    }

    &::after {
      top: 6px;
    }
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      span {
        background: transparent;

        &::before {
          transform: rotate(45deg);
          top: 0;
        }

        &::after {
          transform: rotate(-45deg);
          top: 0;
        }
      }
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ScrollIndicator = styled.div<{ $progress: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: ${({ theme }) => theme.gradients.primary};
  width: ${({ $progress }) => $progress}%;
  transition: width ${({ theme }) => theme.animations.duration.fast};
  opacity: ${({ $progress }) => ($progress > 0 ? 1 : 0)};
`;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/events", label: t("events") },
    { href: "/gallery", label: t("gallery") },
    { href: "/about", label: t("about") },
    { href: "/book", label: t("book") },
    { href: "/contact", label: t("contact") },
    { href: "/faq", label: t("faq") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((currentScrollY / scrollHeight) * 100, 100);

      setIsScrolled(currentScrollY > 50);
      setScrollProgress(progress);

      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/" || Boolean(pathname.match(/^\/[a-z]{2}$/));
    }
    return pathname.includes(href);
  };

  const getLocalizedHref = (href: string) => {
    if (href === "/") {
      return `/${locale}`;
    }
    return `/${locale}${href}`;
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer $isScrolled={isScrolled} $isVisible={isVisible}>
      <Nav $isScrolled={isScrolled}>
        <LogoContainer href={getLocalizedHref("/")}>
          <DesireLogo size={100} />
          <LogoText>DESIRE</LogoText>
        </LogoContainer>

        <NavLinks $isOpen={isMenuOpen}>
          {navItems.map((item, index) => (
            <NavLink
              key={item.href}
              href={getLocalizedHref(item.href)}
              $isActive={isActive(item.href)}
              $index={index}
              onClick={handleNavClick}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <RightSection>
          <LocaleSwitcher />
          <MenuButton $isOpen={isMenuOpen} onClick={handleMenuToggle}>
            <span />
          </MenuButton>
        </RightSection>
      </Nav>

      <ScrollIndicator $progress={scrollProgress} />
    </HeaderContainer>
  );
}
