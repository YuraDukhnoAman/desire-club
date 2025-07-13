"use client";

import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { EventCard } from "@/components/ui/EventCard";
import { FacebookEventsResponse, FacebookEvent } from "@/types/facebook";

const FiltersContainer = styled(motion.div)<{ $isRtl: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xxl} 0;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};
`;

const FilterButton = styled(motion.button)<{
  $active: boolean;
  $isRtl: boolean;
}>`
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
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const LoadingSpinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 3px solid ${({ theme }) => theme.colors.surface};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const RetryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const LoadMoreButton = styled(motion.button)`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: ${({ theme }) => theme.spacing.xl} auto 0;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoEventsMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  grid-column: 1 / -1;
`;

// Function to determine event type from Facebook event data
function determineEventType(event: FacebookEvent): string {
  const name = event.name?.toLowerCase() || "";
  const description = event.description?.toLowerCase() || "";

  // Standup detection (English + Russian)
  if (
    name.includes("standup") ||
    name.includes("stand up") ||
    name.includes("comedy") ||
    name.includes("стендап") ||
    name.includes("комедия")
  ) {
    return "standup";
  }

  // Karaoke detection (English + Russian)
  if (name.includes("karaoke") || name.includes("караоке")) {
    return "karaoke";
  }

  // Quiz detection (English + Russian)
  if (
    name.includes("quiz") ||
    name.includes("trivia") ||
    name.includes("квиз") ||
    name.includes("викторина")
  ) {
    return "quiz";
  }

  // Live music detection (English + Russian)
  if (
    name.includes("live") ||
    name.includes("concert") ||
    name.includes("band") ||
    name.includes("лайв") ||
    name.includes("концерт") ||
    name.includes("группа")
  ) {
    return "live";
  }

  // Open mic detection (English + Russian)
  if (
    name.includes("open mic") ||
    description.includes("open mic") ||
    name.includes("мом") ||
    name.includes("mom") ||
    name.includes("открытый микрофон")
  ) {
    return "mom";
  }

  // Default to party
  return "party";
}

// Function to extract price from description
function extractPrice(description: string): number {
  const priceMatch = description.match(/(\d+)\s*(?:шк|₪|ils?|shekels?)/i);
  return priceMatch ? parseInt(priceMatch[1]) : 0;
}

// Function to get cover image from event
function getEventImage(event: FacebookEvent): string {
  if (event.cover?.source) {
    return event.cover.source;
  }

  // Fallback images based on event type
  const type = determineEventType(event);
  const fallbackImages = {
    live: "/assets/ui/backgrounds/about/live-concerts/514728464_1300841482046548_6550638706408135999_n.jpg",
    standup:
      "/assets/ui/backgrounds/about/standup/500331705_1271017951695568_3759745623717392760_n.jpg",
    party:
      "/assets/ui/backgrounds/about/disco/492231185_1243597314437632_4946434647322291015_n.jpg",
    karaoke:
      "/assets/ui/backgrounds/events/karaoke/514487653_1301575825306447_3668275234757971734_n.jpg",
    quiz: "/assets/ui/backgrounds/events/kviz/514017682_1039077668330128_1972127480873474881_n.jpg",
    mom: "/assets/ui/backgrounds/about/mom/492522651_1242690481194982_8592720461180068310_n.jpg",
  };

  return (
    fallbackImages[type as keyof typeof fallbackImages] || fallbackImages.party
  );
}

export function FacebookEventsGrid() {
  const t = useTranslations("events");
  const locale = useLocale();
  const isRtl = locale === "he";

  const [events, setEvents] = useState<FacebookEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchEvents = async (after?: string) => {
    try {
      const params = new URLSearchParams({
        limit: "25",
        ...(after && { after }),
      });

      const response = await fetch(`/api/facebook/events?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: FacebookEventsResponse = await response.json();

      if (data.data && data.data.length > 0) {
        if (after) {
          setEvents((prev) => [...prev, ...data.data]);
        } else {
          setEvents(data.data);
        }

        setHasMore(data.metadata?.has_next_page || false);
        setNextCursor(data.paging?.cursors?.after || null);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const eventTypes = useMemo(() => {
    const types = Array.from(
      new Set(events.map((event) => determineEventType(event)))
    );
    return types.sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return (
      selectedType
        ? events.filter((event) => determineEventType(event) === selectedType)
        : events
    ).map((event) => {
      const type = determineEventType(event);
      const price = extractPrice(event.description || "");

      return {
        id: event.id,
        title: event.name || "Untitled Event",
        date:
          event.start_time?.split("T")[0] ||
          new Date().toISOString().split("T")[0],
        time: event.start_time
          ? new Date(event.start_time).toLocaleTimeString(locale, {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "20:00",
        description: event.description || "",
        price,
        type,
        image: getEventImage(event),
        bookingUrl: event.ticket_uri || `/${locale}/book`,
        featured: false,
      };
    });
  }, [events, selectedType, locale]);

  const handleLoadMore = async () => {
    if (nextCursor && hasMore && !loadingMore) {
      setLoadingMore(true);
      await fetchEvents(nextCursor);
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchEvents();
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>Failed to load events: {error}</ErrorMessage>
        <RetryButton onClick={handleRetry}>Try Again</RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <>
      {eventTypes.length > 0 && (
        <FiltersContainer
          $isRtl={isRtl}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FilterButton
            $isRtl={isRtl}
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
              $isRtl={isRtl}
              $active={selectedType === type}
              onClick={() => setSelectedType(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(`types.${type}`)}
            </FilterButton>
          ))}
        </FiltersContainer>
      )}

      <EventsGrid>
        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EventCard
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  description={event.description}
                  price={event.price}
                  type={event.type}
                  image={event.image}
                  bookingUrl={event.bookingUrl}
                  featured={event.featured}
                />
              </motion.div>
            ))
          ) : (
            <NoEventsMessage>{t("noEvents")}</NoEventsMessage>
          )}
        </AnimatePresence>
      </EventsGrid>

      {hasMore && filteredEvents.length > 0 && (
        <LoadMoreButton
          onClick={handleLoadMore}
          disabled={loadingMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loadingMore ? t("loading") : t("loadMore")}
        </LoadMoreButton>
      )}
    </>
  );
}
