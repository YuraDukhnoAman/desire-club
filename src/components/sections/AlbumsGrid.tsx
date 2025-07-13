"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { AlbumCard } from "@/components/ui/AlbumCard";
import { transformFacebookAlbum } from "@/lib/facebook";
import { FacebookAlbumsResponse } from "@/types/facebook";

const GridContainer = styled.section<{ $isRtl: boolean }>`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  max-width: 1200px;
  margin: 0 auto;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
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

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
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

export function AlbumsGrid() {
  const t = useTranslations("gallery.albums");
  const locale = useLocale();
  const isRtl = locale === "he";
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchAlbums = async (after?: string) => {
    try {
      const params = new URLSearchParams({
        limit: "12",
        ...(after && { after }),
      });

      const response = await fetch(`/api/facebook/albums?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: FacebookAlbumsResponse = await response.json();

      if (data.data && data.data.length > 0) {
        const transformedAlbums = data.data.map((album) => ({
          id: album.id,
          name: album.name,
          description: album.description,
          photoCount: album.count || 0,
          coverImage:
            album.cover_photo?.images?.find((img) => img.width >= 600)
              ?.source ||
            album.cover_photo?.source ||
            album.cover_photo?.picture,
          createdAt: album.created_time || Date.now(),
          facebookUrl:
            album.link || `https://www.facebook.com/album/${album.id}`,
        }));

        if (after) {
          setAlbums((prev) => [...prev, ...transformedAlbums]);
        } else {
          setAlbums(transformedAlbums);
        }

        setHasMore(data.metadata?.has_next_page || false);
        setNextCursor(data.paging?.cursors?.after || null);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load albums");
      console.error("Error fetching albums:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleLoadMore = async () => {
    if (nextCursor && hasMore && !loadingMore) {
      setLoadingMore(true);
      await fetchAlbums(nextCursor);
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchAlbums();
  };

  if (loading) {
    return (
      <GridContainer $isRtl={isRtl}>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </GridContainer>
    );
  }

  if (error) {
    return (
      <GridContainer $isRtl={isRtl}>
        <ErrorContainer>
          <ErrorMessage>
            {t("error")}: {error}
          </ErrorMessage>
          <RetryButton onClick={handleRetry}>{t("retry")}</RetryButton>
        </ErrorContainer>
      </GridContainer>
    );
  }

  return (
    <GridContainer $isRtl={isRtl}>
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

      <Grid
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {albums.map((album, index) => (
          <motion.div
            key={album.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AlbumCard
              id={album.id}
              name={album.name}
              description={album.description}
              photoCount={album.photoCount}
              coverImage={album.coverImage}
              createdAt={album.createdAt}
              facebookUrl={album.facebookUrl}
              clickable={false}
            />
          </motion.div>
        ))}
      </Grid>

      {hasMore && (
        <LoadMoreButton
          onClick={handleLoadMore}
          disabled={loadingMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loadingMore ? t("loading") : t("loadMore")}
        </LoadMoreButton>
      )}
    </GridContainer>
  );
}
