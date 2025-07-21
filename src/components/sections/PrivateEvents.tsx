"use client";

import React from "react";
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

const ContentContainer = styled(motion.div)<{ $isRtl: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};
`;

const VideoDescriptionSection = styled(motion.div)<{ $isRtl: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;
  margin: ${({ theme }) => theme.spacing.xxl} 0;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    text-align: center;
  }
`;

const DescriptionContent = styled.div<{ $isRtl: boolean }>`
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: center;
    order: -1;
  }
`;

const MainDescription = styled(motion.div)<{ $isRtl: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  white-space: pre-line;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const FeaturesList = styled(motion.ul)<{ $isRtl: boolean }>`
  list-style: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: center;
  }
`;

const FeatureItem = styled.li`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.lg};

  &::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: 0;

    &::before {
      display: none;
    }
  }
`;

const VideoSection = styled(motion.div)`
  position: relative;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  aspect-ratio: 9 / 16;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary}05 0%,
      ${({ theme }) => theme.colors.secondary}05 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 350px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 280px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  &::-webkit-media-controls-panel {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-volume-slider,
  &::-webkit-media-controls-timeline {
    filter: brightness(1.2);
  }
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
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

        <ContentContainer
          $isRtl={isRtl}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <VideoDescriptionSection
            $isRtl={isRtl}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <VideoSection
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <VideoContainer>
                <Video controls preload="metadata" playsInline muted>
                  <source
                    src="/assets/videos/private-events-mov.MP4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </Video>
              </VideoContainer>
            </VideoSection>

            <DescriptionContent $isRtl={isRtl}>
              <MainDescription
                $isRtl={isRtl}
                initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {t("features.corporateFull")}
              </MainDescription>

              <FeaturesList
                $isRtl={isRtl}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                {t
                  .raw("features.details.corporate")
                  .map((feature: string, index: number) => (
                    <FeatureItem key={index}>{feature}</FeatureItem>
                  ))}
              </FeaturesList>
            </DescriptionContent>
          </VideoDescriptionSection>
        </ContentContainer>

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
