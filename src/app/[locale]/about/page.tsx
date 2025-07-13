"use client";

import React from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PageContainer, PageTitle } from "@/components/ui/PageLayout";
import EventTypeTabs from "@/components/sections/EventTypeTabs";
import { useParams } from "next/navigation";

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const OrbsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
`;

const AboutContent = styled(motion.div)<{ $isRtl: boolean }>`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};
  position: relative;
  z-index: 1;
`;

const Section = styled(motion.section)<{ $isRtl: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled(motion.h2)<{ $isRtl: boolean }>`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px ${({ theme }) => `${theme.colors.primary}50`};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const SectionText = styled(motion.p)<{ $isRtl: boolean }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const Highlight = styled(motion.span)`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  display: inline-block;
`;

const GlowContainer = styled(motion.div)`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.xl};
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px ${({ theme }) => `${theme.colors.primary}15`};

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${({ theme }) => theme.gradients.glow};
    opacity: 0.1;
    pointer-events: none;
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const MapContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: inset 0 0 30px rgba(0, 255, 255, 0.1);
  }
`;

const LocationInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const LocationText = styled.div`
  flex: 1;
`;

const LocationTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
`;

const LocationDetails = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  opacity: 0.15;
  mix-blend-mode: screen;
  will-change: transform;
`;

export default function AboutPage() {
  const t = useTranslations("about");
  const contact = useTranslations("contact");
  const params = useParams();
  const isRtl = params.locale === "he";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const highlightVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <PageWrapper>
      <OrbsContainer>
        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #ff0080 0%, #7928ca 100%)",
            top: "20%",
            left: "5%",
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #00FFFF 0%, #7928ca 100%)",
            bottom: "20%",
            right: "5%",
          }}
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </OrbsContainer>

      <PageContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <PageTitle>{t("title")}</PageTitle>
          <AboutContent $isRtl={isRtl}>
            {/* Rest of the content */}

            <Section $isRtl={isRtl} variants={itemVariants}>
              <GlowContainer
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <SectionText $isRtl={isRtl}>
                  <Highlight variants={highlightVariants}>
                    {t("story").split(" ").slice(0, 4).join(" ")}
                  </Highlight>
                  {" " + t("story").split(" ").slice(4).join(" ")}
                </SectionText>
              </GlowContainer>
            </Section>

            <Section $isRtl={isRtl} variants={itemVariants}>
              <SectionTitle $isRtl={isRtl} variants={itemVariants}>
                {t("concept")}
              </SectionTitle>
              <GlowContainer
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <SectionText $isRtl={isRtl}>
                  {t("conceptDescription")}
                </SectionText>
              </GlowContainer>
            </Section>

            <Section $isRtl={isRtl} variants={itemVariants}>
              <SectionTitle $isRtl={isRtl} variants={itemVariants}>
                {t("vibe")}
              </SectionTitle>
              <GlowContainer
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <SectionText $isRtl={isRtl}>{t("vibeDescription")}</SectionText>
              </GlowContainer>
            </Section>

            <Section $isRtl={isRtl} variants={itemVariants}>
              <SectionTitle $isRtl={isRtl} variants={itemVariants}>
                {t("events.title")}
              </SectionTitle>
              <motion.div variants={itemVariants}>
                <EventTypeTabs />
              </motion.div>
            </Section>

            <Section $isRtl={isRtl} variants={itemVariants}>
              <SectionTitle $isRtl={isRtl} variants={itemVariants}>
                Location
              </SectionTitle>
              <MapContainer
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3533471831554!2d34.7751!3d32.0697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b7e8ead0b1d%3A0x1b6e2419b68e8f03!2sCarlebach%2025%2C%20Tel%20Aviv-Yafo!5e0!3m2!1sen!2sil!4v1647856231744!5m2!1sen!2sil"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Desire Club Location"
                />
              </MapContainer>
              <LocationInfo
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <LocationText>
                  <LocationTitle>Visit Us</LocationTitle>
                  <LocationDetails>{contact("address")}</LocationDetails>
                </LocationText>
              </LocationInfo>
            </Section>
          </AboutContent>
        </motion.div>
      </PageContainer>
    </PageWrapper>
  );
}
