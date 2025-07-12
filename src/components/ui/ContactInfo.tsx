"use client";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import styled, { css } from "styled-components";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ContactInfoProps {
  isRtl?: boolean;
}

const Container = styled.div<{ isRtl?: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  direction: ${({ isRtl }) => (isRtl ? "rtl" : "ltr")};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.gradients.dark};
    opacity: 0.7;
    z-index: -1;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const MapContainer = styled.div`
  aspect-ratio: 16/9;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.medium};

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: span 2;
  }
`;

const InfoItem = styled.div<{ isRtl?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  flex-direction: ${({ isRtl }) => (isRtl ? "row-reverse" : "row")};
  width: 100%;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    flex-shrink: 0;
    margin-top: ${({ theme }) => theme.spacing.xs};
  }

  span {
    flex: 1;
  }
`;

const SocialLinks = styled.div<{ isRtl?: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-direction: ${({ isRtl }) => (isRtl ? "row-reverse" : "row")};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

const BookLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

const WorkingHours = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

const DayTime = styled.div<{ isOpen?: boolean; isRtl?: boolean }>`
  display: flex;
  justify-content: space-between;
  color: ${({ theme, isOpen }) =>
    isOpen ? theme.colors.success : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-direction: ${({ isRtl }) => (isRtl ? "row-reverse" : "row")};

  &:last-child {
    border-bottom: none;
  }
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ContactInfo: React.FC<ContactInfoProps> = ({ isRtl = false }) => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const t = useTranslations("contact");
  const params = useParams();

  const handleCopy = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(label);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, []);

  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();

  const isCurrentlyOpen = useCallback(
    (day: number, openHour: number, closeHour: number) => {
      if (currentDay !== day) return false;
      if (closeHour < openHour) {
        // Handles cases like 21:00 - 03:00
        return currentHour >= openHour || currentHour < closeHour;
      }
      return currentHour >= openHour && currentHour < closeHour;
    },
    [currentDay, currentHour]
  );

  const days = [
    {
      name: t("days.sunday"),
      hours: "08:00 – 23:00",
      day: 0,
      open: 8,
      close: 23,
    },
    {
      name: t("days.monday"),
      hours: "08:00 – 23:00",
      day: 1,
      open: 8,
      close: 23,
    },
    {
      name: t("days.tuesday"),
      hours: "08:00 – 23:00",
      day: 2,
      open: 8,
      close: 23,
    },
    {
      name: t("days.wednesday"),
      hours: "08:00 – 03:00",
      day: 3,
      open: 8,
      close: 3,
    },
    {
      name: t("days.thursday"),
      hours: "21:00 – 03:00",
      day: 4,
      open: 21,
      close: 3,
    },
    {
      name: t("days.friday"),
      hours: "21:00 – 05:00",
      day: 5,
      open: 21,
      close: 5,
    },
    {
      name: t("days.saturday"),
      hours: "21:00 – 01:00",
      day: 6,
      open: 21,
      close: 1,
    },
  ];

  return (
    <Container isRtl={isRtl}>
      <Section>
        <InfoItem isRtl={isRtl}>
          <FaMapMarkerAlt />
          <span>{t("address")}</span>
        </InfoItem>

        <InfoItem isRtl={isRtl}>
          <FaPhone />
          <span>+972 50 210 2496</span>
          <CopyButton onClick={() => handleCopy("+972502102496", "phone")}>
            {copySuccess === "phone" ? "✓" : t("copy")}
          </CopyButton>
        </InfoItem>

        <InfoItem isRtl={isRtl}>
          <FaEnvelope />
          <span>muraze@gmail.com</span>
          <CopyButton onClick={() => handleCopy("muraze@gmail.com", "email")}>
            {copySuccess === "email" ? "✓" : t("copy")}
          </CopyButton>
        </InfoItem>

        <SocialLinks isRtl={isRtl}>
          <BookLink
            href={`/${params.locale}/book`}
            aria-label={t("social.whatsapp")}
          >
            <FaWhatsapp />
          </BookLink>
          <SocialLink
            href="https://instagram.com/desireclubtlv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("social.instagram")}
          >
            <FaInstagram />
          </SocialLink>
          <SocialLink
            href="https://facebook.com/969524779859537"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("social.facebook")}
          >
            <FaFacebook />
          </SocialLink>
        </SocialLinks>
      </Section>

      <Section>
        <InfoItem isRtl={isRtl}>
          <FaClock />
          <WorkingHours>
            {days.map(({ name, hours, day, open, close }) => (
              <DayTime
                key={day}
                isOpen={isCurrentlyOpen(day, open, close)}
                isRtl={isRtl}
              >
                <span>{name}</span>
                <span>{hours}</span>
              </DayTime>
            ))}
          </WorkingHours>
        </InfoItem>
      </Section>

      <MapContainer>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3533471241583!2d34.7751!3d32.0647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b7e8e3b7e31%3A0x3c1f4f4d5e5e5e5e!2sCarlebach%2025%2C%20Tel%20Aviv-Yafo!5e0!3m2!1sen!2sil!4v1620000000000!5m2!1sen!2sil"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t("map.title")}
          style={{ filter: "invert(90%) hue-rotate(180deg)" }}
        />
      </MapContainer>
    </Container>
  );
};

export default ContactInfo;
