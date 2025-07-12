"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import styled from "styled-components";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/ui/EventCard";
import eventsData from "@/data/events.json";
import { motion } from "framer-motion";

const EventsContainer = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg}`};
  max-width: 1200px;
  margin: 0 auto;
`;

const EventsHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const EventsTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px ${({ theme }) => `${theme.colors.primary}50`};
`;

const EventsDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const EventsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const ButtonContainer = styled(motion.div)`
  text-align: center;
  position: relative;
  z-index: 10;
`;

const StyledButton = styled(Button)`
  cursor: pointer !important;
  pointer-events: all !important;
`;

export function EventsPreview() {
  const t = useTranslations("events");
  const locale = useLocale() as keyof (typeof eventsData)[0]["translations"];

  // Get upcoming events - show all events for now
  const upcomingEvents = eventsData
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  console.log("All events:", upcomingEvents);

  return (
    <EventsContainer>
      <EventsHeader>
        <EventsTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("title")}
        </EventsTitle>
        <EventsDescription
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t("description")}
        </EventsDescription>
      </EventsHeader>

      <EventsGrid
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {upcomingEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.translations[locale].title}
            date={event.date}
            time={event.time}
            description={event.translations[locale].description}
            price={event.price}
            type={event.type}
            image={event.image}
            bookingUrl={event.bookingUrl}
          />
        ))}
      </EventsGrid>

      <ButtonContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <StyledButton
          variant="primary"
          size="large"
          href={`/${locale}/events`}
          external={false}
        >
          {t("viewEvents")}
        </StyledButton>
      </ButtonContainer>
    </EventsContainer>
  );
}
