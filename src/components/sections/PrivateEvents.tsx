"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  }
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const SubtitleLink = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.md};
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    text-decoration-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const TabsContainer = styled.div`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const TabList = styled.div<{ $isRtl: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

const Tab = styled.button<{ active: boolean; $isRtl: boolean }>`
  position: relative;
  background: ${({ active }) =>
    active ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"};
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.primary : "rgba(255, 255, 255, 0.1)"};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
  overflow: hidden;
  backdrop-filter: blur(10px);
  min-height: 200px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.98);
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
      ${({ theme }) => theme.colors.primary}20 0%,
      ${({ theme }) => theme.colors.secondary}20 100%
    );
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleY(${({ active }) => (active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
    min-height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &::after {
      width: 100%;
      height: 3px;
      top: auto;
      bottom: 0;
      transform: scaleX(${({ active }) => (active ? 1 : 0)});
    }
  }
`;

const TabImage = styled.div<{ src: string }>`
  width: 100%;
  height: 120px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 80px;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const TabTitle = styled.h3<{ $isRtl: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const TabInfo = styled.p<{ $isRtl: boolean }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: 1.4;
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    line-height: 1.3;
  }
`;

const TabContent = styled.div<{ $isRtl: boolean }>`
  margin-top: ${({ theme }) => theme.spacing.xl};
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};
`;

const TabDescription = styled.div<{ $isRtl: boolean }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
  white-space: pre-line;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 24px;
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
`;

const FeatureDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const CTA = styled(motion.div)`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const CTAButton = styled(Button)`
  margin: 0 auto;
`;

const BackgroundOrb = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  opacity: 0.1;
  mix-blend-mode: screen;
  background: linear-gradient(135deg, #ff0080 0%, #7928ca 100%);
  top: 20%;
  right: 10%;
  z-index: -1;
`;

export function PrivateEvents() {
  const t = useTranslations("events.privateEvents");
  const tEvents = useTranslations("events");
  const locale = useLocale();
  const isRtl = locale === "he";
  const [activeTab, setActiveTab] = useState("corporate");

  const eventTypes = [
    {
      id: "corporate",
      label: t("features.corporate"),
      description: t("features.corporateDesc"),
      image:
        "/assets/ui/backgrounds/about/disco/492694337_1243597207770976_179124857974170616_n.jpg",
      details: t.raw("features.details.corporate"),
    },
    {
      id: "birthdays",
      label: t("features.birthdays"),
      description: t("features.birthdaysDesc"),
      image:
        "/assets/ui/backgrounds/about/standup/500331705_1271017951695568_3759745623717392760_n.jpg",
      details: t.raw("features.details.birthdays"),
    },
    {
      id: "anniversaries",
      label: t("features.anniversaries"),
      description: t("features.anniversariesDesc"),
      image:
        "/assets/ui/backgrounds/about/live-concerts/514728464_1300841482046548_6550638706408135999_n.jpg",
      details: t.raw("features.details.anniversaries"),
    },
    {
      id: "custom",
      label: t("features.custom"),
      description: t("features.customDesc"),
      image:
        "/assets/ui/backgrounds/about/mom/492522651_1242690481194982_8592720461180068310_n.jpg",
      details: t.raw("features.details.custom"),
    },
  ];

  const activeEvent =
    eventTypes.find((event) => event.id === activeTab) || eventTypes[0];

  const handleContactClick = () => {
    window.location.href = `/${locale}/contact`;
  };

  const handleUpcomingEventsClick = () => {
    const upcomingEventsSection = document.getElementById("upcoming-events");
    if (upcomingEventsSection) {
      upcomingEventsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Section>
      <BackgroundOrb
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t("title")}
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("description")}
          </Description>

          <SubtitleLink
            onClick={handleUpcomingEventsClick}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tEvents("upcomingEventsSubtitle")}
          </SubtitleLink>
        </Header>

        <TabsContainer>
          <TabList $isRtl={isRtl}>
            {eventTypes.map((event) => (
              <Tab
                key={event.id}
                active={activeTab === event.id}
                onClick={() => setActiveTab(event.id)}
                $isRtl={isRtl}
              >
                <TabImage src={event.image} />
                <TabTitle $isRtl={isRtl}>{event.label}</TabTitle>
                <TabInfo $isRtl={isRtl}>{event.description}</TabInfo>
              </Tab>
            ))}
          </TabList>

          <TabContent $isRtl={isRtl}>
            <TabDescription $isRtl={isRtl}>
              {activeTab === "corporate"
                ? t("features.corporateFull")
                : activeEvent.description}
            </TabDescription>

            <FeatureCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FeatureTitle>{activeEvent.label}</FeatureTitle>
              <FeatureDescription>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {activeEvent.details.map((detail: string, index: number) => (
                    <li key={index} style={{ marginBottom: "8px" }}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </FeatureDescription>
            </FeatureCard>
          </TabContent>
        </TabsContainer>

        <CTA
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <CTAButton onClick={handleContactClick} size="large">
            {t("contactUs")}
          </CTAButton>
        </CTA>
      </Container>
    </Section>
  );
}
