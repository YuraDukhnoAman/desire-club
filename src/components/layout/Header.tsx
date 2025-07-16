"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { DesireLogo } from "@/components/ui/DesireLogo";

// Animations
const colorShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const neonPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px rgba(255, 0, 128, 0.3), 0 0 10px rgba(0, 255, 255, 0.2);
  }
  50% { 
    box-shadow: 0 0 10px rgba(255, 0, 128, 0.5), 0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(255, 69, 0, 0.2);
  }
`;

// Styled Components - Mobile First Design
const HeaderContainer = styled.header<{
  $isScrolled: boolean;
  $isVisible: boolean;
  $isRTL: boolean;
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
  direction: ${({ $isRTL }) => ($isRTL ? "rtl" : "ltr")};

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
      ? `${theme.spacing.sm} ${theme.spacing.md}`
      : `${theme.spacing.md} ${theme.spacing.md}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: padding ${({ theme }) => theme.animations.duration.normal}
    ${({ theme }) => theme.animations.easing.easeInOut};

  @media (min-width: 600px) {
    padding: ${({ theme, $isScrolled }) =>
      $isScrolled
        ? `${theme.spacing.sm} ${theme.spacing.lg}`
        : `${theme.spacing.md} ${theme.spacing.lg}`};
  }

  @media (min-width: 960px) {
    padding: ${({ theme, $isScrolled }) =>
      $isScrolled
        ? `${theme.spacing.sm} ${theme.spacing.xl}`
        : `${theme.spacing.md} ${theme.spacing.xl}`};
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
  }

  @media (min-width: 600px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
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

  @media (min-width: 600px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }

  @media (min-width: 960px) {
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  }
`;

// Mobile Menu Overlay
const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(10, 10, 10, 0.95) 0%,
    rgba(26, 26, 26, 0.92) 50%,
    rgba(10, 10, 10, 0.95) 100%
  );
  backdrop-filter: blur(30px) saturate(200%);
  -webkit-backdrop-filter: blur(30px) saturate(200%);
  z-index: 9999; /* Very high z-index to ensure it's on top */
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px; /* Increased padding to account for header */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 30%,
        rgba(255, 0, 128, 0.2) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(0, 255, 255, 0.15) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 50% 50%,
        rgba(255, 69, 0, 0.1) 0%,
        transparent 60%
      );
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.03) 50%,
      transparent 70%
    );
    background-size: 200% 200%;
    animation: ${colorShift} 8s ease-in-out infinite;
    pointer-events: none;
  }

  @media (min-width: 960px) {
    display: none;
  }
`;

const MobileNavLinks = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(20px) saturate(200%);
  -webkit-backdrop-filter: blur(20px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  min-width: 280px;
  max-width: 90vw;
  z-index: 10000; /* Ensure it's above the overlay */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 0, 128, 0.1) 0%,
      rgba(0, 255, 255, 0.05) 50%,
      rgba(255, 69, 0, 0.08) 100%
    );
    border-radius: 24px;
    opacity: 0.6;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.02) 100%
    );
    border-radius: 23px;
    pointer-events: none;
  }
`;

const MobileNavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  position: relative;
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: 16px;
  background: ${({ $isActive }) =>
    $isActive ? "rgba(255, 0, 128, 0.15)" : "transparent"};
  border: 1px solid
    ${({ $isActive }) => ($isActive ? "rgba(255, 0, 128, 0.3)" : "transparent")};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  min-width: 200px;
  text-align: center;
  z-index: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    background: rgba(255, 0, 128, 0.1);
    border-color: rgba(255, 0, 128, 0.2);
    box-shadow: 0 4px 16px rgba(255, 0, 128, 0.2),
      0 0 0 1px rgba(255, 0, 128, 0.1);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.02) 100%
    );
    border-radius: 16px;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animations.duration.fast};
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.gradients.primary};
    transition: width ${({ theme }) => theme.animations.duration.normal};
    border-radius: 1px;
  }

  &:hover::after {
    width: 80%;
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    &::after {
      width: 80%;
    }
  `}
`;

// Desktop Navigation
const DesktopNavLinks = styled.div`
  display: none;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  @media (min-width: 960px) {
    display: flex;
  }
`;

const DesktopNavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.textSecondary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  position: relative;
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.gradients.primary};
    transition: width ${({ theme }) => theme.animations.duration.normal};
  }

  &:hover::after {
    width: 100%;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

// Burger Menu Button
const BurgerButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  position: relative;

  &:focus {
    outline: none;
  }

  @media (min-width: 960px) {
    display: none;
  }
`;

const BurgerLine = styled.span<{ $isOpen: boolean; $lineIndex: number }>`
  width: 100%;
  height: 3px;
  background: ${({ theme }) => theme.colors.text};
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;

  ${({ $isOpen, $lineIndex }) => {
    if (!$isOpen) return "";

    switch ($lineIndex) {
      case 0:
        return `
          transform: rotate(45deg) translate(6px, 6px);
        `;
      case 1:
        return `
          opacity: 0;
          transform: translateX(-20px);
        `;
      case 2:
        return `
          transform: rotate(-45deg) translate(6px, -6px);
        `;
      default:
        return "";
    }
  }}

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${BurgerButton}:hover &::before {
    opacity: 0.3;
  }
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

  const isRTL = locale === "he";

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/events", label: t("events") },
    { href: "/gallery", label: t("gallery") },
    { href: "/about", label: t("about") },
    { href: "/book", label: t("book") },
    { href: "/contact", label: t("contact") },
    { href: "/menu", label: t("menu") },
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

  // Framer Motion variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: -30,
      scale: 0.8,
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <HeaderContainer
        $isScrolled={isScrolled}
        $isVisible={isVisible}
        $isRTL={isRTL}
      >
        <Nav $isScrolled={isScrolled}>
          <LogoContainer href={getLocalizedHref("/")}>
            <DesireLogo size={60} />
            <LogoText>DESIRE</LogoText>
          </LogoContainer>

          {/* Desktop Navigation */}
          <DesktopNavLinks>
            {navItems.map((item) => (
              <DesktopNavLink
                key={item.href}
                href={getLocalizedHref(item.href)}
                $isActive={isActive(item.href)}
              >
                {item.label}
              </DesktopNavLink>
            ))}
          </DesktopNavLinks>

          <RightSection>
            <LocaleSwitcher />
            <BurgerButton $isOpen={isMenuOpen} onClick={handleMenuToggle}>
              <BurgerLine $isOpen={isMenuOpen} $lineIndex={0} />
              <BurgerLine $isOpen={isMenuOpen} $lineIndex={1} />
              <BurgerLine $isOpen={isMenuOpen} $lineIndex={2} />
            </BurgerButton>
          </RightSection>
        </Nav>

        <ScrollIndicator $progress={scrollProgress} />
      </HeaderContainer>

      {/* Mobile Menu - Outside Header Container */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenuOverlay
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
          >
            <MobileNavLinks variants={mobileMenuVariants}>
              {navItems.map((item) => (
                <motion.div key={item.href} variants={menuItemVariants}>
                  <MobileNavLink
                    href={getLocalizedHref(item.href)}
                    $isActive={isActive(item.href)}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </MobileNavLink>
                </motion.div>
              ))}
            </MobileNavLinks>
          </MobileMenuOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
