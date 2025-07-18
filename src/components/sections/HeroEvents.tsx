"use client";

import React, { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/ui/EventCard";
import { FacebookEvent, TransformedEvent } from "@/types/facebook";

const EventsSection = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const EventsTitle = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
`;

const EventsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ButtonContainer = styled(motion.div)`
  text-align: center;
`;

const LoadingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;

const ErrorText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  font-style: italic;
`;

// Transform Facebook event to match EventCard props
const transformFacebookEvent = (event: FacebookEvent): TransformedEvent => {
  const startDate = new Date(event.start_time);
  const endDate = event.end_time ? new Date(event.end_time) : undefined;

  return {
    id: event.id,
    title: event.name,
    startDate,
    endDate,
    description: event.description || "",
    location: event.place?.name || "Disire Music Club",
    locationDetails: event.place
      ? {
          name: event.place.name,
          address: event.place.location?.street,
          city: event.place.location?.city,
          country: event.place.location?.country,
          coordinates: event.place.location
            ? {
                latitude: event.place.location.latitude,
                longitude: event.place.location.longitude,
              }
            : undefined,
        }
      : undefined,
    coverImage: event.cover?.source,
    isOnline: event.is_online,
    isCanceled: event.is_canceled,
    ticketUrl: event.ticket_uri,
    attendingCount: event.attending_count,
    interestedCount: event.interested_count,
    timezone: event.timezone,
    facebookUrl: `https://www.facebook.com/events/${event.id}`,
  };
};

export function HeroEvents() {
  const t = useTranslations("events");
  const locale = useLocale();
  const [events, setEvents] = useState<TransformedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/facebook/events?limit=3");

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Transform and filter events
        const transformedEvents = data.data
          .filter((event: FacebookEvent) => {
            // Only show future events and non-canceled events
            const startDate = new Date(event.start_time);
            return startDate > new Date() && !event.is_canceled;
          })
          .sort(
            (a: FacebookEvent, b: FacebookEvent) =>
              new Date(a.start_time).getTime() -
              new Date(b.start_time).getTime()
          )
          .slice(0, 3)
          .map(transformFacebookEvent);

        setEvents(transformedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <EventsSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingText>{t("loading")}</LoadingText>
      </EventsSection>
    );
  }

  if (error) {
    return (
      <EventsSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ErrorText>{error}</ErrorText>
      </EventsSection>
    );
  }

  if (events.length === 0) {
    return null; // Don't show anything if no events
  }

  return (
    <EventsSection
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <EventsTitle
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {t("upcomingEvents")}
      </EventsTitle>

      <EventsGrid
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.startDate.toISOString().split("T")[0]}
            time={event.startDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
            description={event.description || ""}
            type="facebook"
            image={
              event.coverImage ||
              "/assets/ui/backgrounds/hero/487941383_1220824813381549_7407778124659682855_n.jpg"
            }
            bookingUrl={event.facebookUrl}
            featured={false}
          />
        ))}
      </EventsGrid>

      <ButtonContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button variant="secondary" size="large" href={`/${locale}/events`}>
          {t("viewAllEvents")}
        </Button>
      </ButtonContainer>
    </EventsSection>
  );
}
