"use client";

import React from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import Link from "next/link";

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xxl} 0
    ${({ theme }) => theme.spacing.xl};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FooterTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  transition: color ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export function Footer() {
  const t = useTranslations();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>DESIRE</FooterTitle>
          <FooterText>{t("hero.subtitle")}</FooterText>
          <SocialLinks>
            <SocialLink
              href="https://instagram.com/desire_bar_tlv"
              target="_blank"
              rel="noopener noreferrer"
            >
              📷
            </SocialLink>
            <SocialLink
              href="https://facebook.com/desirebartelaviv"
              target="_blank"
              rel="noopener noreferrer"
            >
              📘
            </SocialLink>
            <SocialLink
              href="https://twitter.com/desirebartelaviv"
              target="_blank"
              rel="noopener noreferrer"
            >
              🐦
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t("contact.title")}</FooterTitle>
          <FooterText>{t("contact.address")}</FooterText>
          <FooterText>{t("contact.phone")}</FooterText>
          <FooterText>
            {t("contact.hours")}: {t("contact.hoursValue")}
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t("nav.events")}</FooterTitle>
          <FooterLink href="/events">{t("nav.events")}</FooterLink>
          <FooterLink href="/book">{t("nav.book")}</FooterLink>
          <FooterLink href="/gallery">{t("nav.gallery")}</FooterLink>
          <FooterLink href="/about">{t("nav.about")}</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t("nav.contact")}</FooterTitle>
          <FooterLink href="/contact">{t("nav.contact")}</FooterLink>

          <FooterLink href="/about">{t("nav.about")}</FooterLink>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <FooterText>{t("footer.copyright")}</FooterText>
      </Copyright>
    </FooterContainer>
  );
}
