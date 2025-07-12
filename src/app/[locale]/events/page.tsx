"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import eventsData from "@/data/events.json";
import { useLocale } from "next-intl";
import { EventCard } from "@/components/ui/EventCard";

type EventTranslation = {
  title: string;
  description: string;
};

type EventTranslations = {
  en: EventTranslation;
  ru: EventTranslation;
  he: EventTranslation;
};

type Event = {
  id: string;
  translations: EventTranslations;
  date: string;
  time: string;
  type: string;
  price: number;
  image: string;
  bookingUrl: string;
};

const PageContainer = styled.div`
  min-height: 100vh;
  padding: calc(${({ theme }) => theme.spacing.xxl} + 70px)
    ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => `${theme.colors.primary}15`} 100%
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: calc(${({ theme }) => theme.spacing.xl} + 70px);
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 1200px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled(motion.h1)`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
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

const FiltersContainer = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xxl} 0;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const FilterButton = styled(motion.button)<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : "rgba(255, 255, 255, 0.1)"};
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const EventsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export default function EventsPage() {
  const t = useTranslations("events");
  const locale = useLocale() as keyof EventTranslations;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const eventTypes = useMemo(() => {
    return Array.from(new Set(eventsData.map((event: Event) => event.type)));
  }, []);

  const filteredEvents = useMemo(() => {
    return (
      selectedType
        ? eventsData.filter((event: Event) => event.type === selectedType)
        : eventsData
    ).map((event: Event) => ({
      ...event,
      title: event.translations[locale].title,
      description: event.translations[locale].description,
    }));
  }, [selectedType, locale]);

  return (
    <PageContainer>
      <Header>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("title")}
        </Title>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t("description")}
        </Description>
      </Header>

      <FiltersContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <FilterButton
          $active={!selectedType}
          onClick={() => setSelectedType(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("all")}
        </FilterButton>
        {eventTypes.map((type) => (
          <FilterButton
            key={type}
            $active={selectedType === type}
            onClick={() => setSelectedType(type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t(`types.${type}`)}
          </FilterButton>
        ))}
      </FiltersContainer>

      <EventsGrid>
        <AnimatePresence mode="wait">
          {filteredEvents.map((event) => (
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
        </AnimatePresence>
      </EventsGrid>
    </PageContainer>
  );
}
