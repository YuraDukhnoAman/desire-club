"use client";

import React from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { Button } from "@/components/ui/Button";

const EventsContainer = styled.section`
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const EventsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const EventsTitle = styled.h2`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-family: "Orbitron", monospace;
`;

const EventsDescription = styled.p`
  font-size: 1.125rem;
  color: #cccccc;
  margin-bottom: 2rem;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const EventCard = styled.div`
  background: #1a1a1a;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #333333;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: #ff0080;
  }
`;

const EventTitle = styled.h3`
  font-size: 1.25rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const EventDate = styled.p`
  color: #00ffff;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const EventDescription = styled.p`
  color: #cccccc;
  margin-bottom: 1rem;
`;

const EventPrice = styled.p`
  color: #ff0080;
  font-weight: 600;
  font-size: 1.125rem;
`;

export function EventsPreview() {
  const t = useTranslations("events");

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Electronic Euphoria",
      date: "2024-01-15",
      description: "Progressive house and techno night with international DJs",
      price: 80,
    },
    {
      id: 2,
      title: "Live Jazz Sessions",
      date: "2024-01-18",
      description:
        "Intimate jazz performances with local and international artists",
      price: 60,
    },
    {
      id: 3,
      title: "Comedy Night",
      date: "2024-01-20",
      description: "Stand-up comedy with the best local comedians",
      price: 0,
    },
  ];

  const description = t("description");

  return (
    <EventsContainer>
      <EventsHeader>
        <EventsTitle>{t("title")}</EventsTitle>
        <EventsDescription>{description}</EventsDescription>
      </EventsHeader>

      <EventsGrid>
        {events.map((event) => (
          <EventCard key={event.id}>
            <EventTitle>{event.title}</EventTitle>
            <EventDate>{event.date}</EventDate>
            <EventDescription>{event.description}</EventDescription>
            <EventPrice>
              {event.price > 0 ? `₪${event.price}` : t("free")}
            </EventPrice>
          </EventCard>
        ))}
      </EventsGrid>

      <div style={{ textAlign: "center" }}>
        <Button variant="primary" size="large" href="/events">
          {t("viewEvents")}
        </Button>
      </div>
    </EventsContainer>
  );
}
