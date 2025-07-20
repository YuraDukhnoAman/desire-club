"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  profilePhoto?: string;
  authorUrl?: string;
  relativeTime?: string;
}

interface ReviewsResponse {
  reviews: Review[];
  averageRating?: number;
  totalReviewCount?: number;
  error?: string;
}

const ReviewsContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ReviewCard = styled(motion.div)`
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 0, 128, 0.15);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ProfilePhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

const FallbackAvatar = styled.div<{ $colorIndex: number }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $colorIndex, theme }) => {
    const colors = [
      theme.colors.primary,
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
    ];
    return colors[$colorIndex % colors.length];
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const StarRating = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

const Star = styled.span<{ $filled: boolean }>`
  color: ${({ $filled, theme }) =>
    $filled ? theme.colors.primary : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const ReviewDate = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

const ReviewComment = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
  word-wrap: break-word;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.error};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(20, 20, 20, 0.6);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export function GoogleReviews() {
  const t = useTranslations("reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<{
    averageRating?: number;
    totalReviewCount?: number;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedPhotos, setFailedPhotos] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/google-reviews");

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data: ReviewsResponse = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setReviews(data.reviews || []);
        setStats({
          averageRating: data.averageRating,
          totalReviewCount: data.totalReviewCount,
        });
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err instanceof Error ? err.message : "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} $filled={i < rating}>
        ★
      </Star>
    ));
  };

  if (loading) {
    return <LoadingState>{t("loading")}</LoadingState>;
  }

  if (error) {
    return <ErrorState>{t("error", { error })}</ErrorState>;
  }

  if (reviews.length === 0) {
    return <EmptyState>{t("noReviews")}</EmptyState>;
  }

  return (
    <div>
      {(stats.averageRating || stats.totalReviewCount) && (
        <StatsContainer>
          {stats.averageRating && (
            <Stat>
              <StatValue>{stats.averageRating.toFixed(1)}</StatValue>
              <StatLabel>{t("averageRating")}</StatLabel>
            </Stat>
          )}
          {stats.totalReviewCount && (
            <Stat>
              <StatValue>{stats.totalReviewCount}</StatValue>
              <StatLabel>{t("totalReviews")}</StatLabel>
            </Stat>
          )}
        </StatsContainer>
      )}

      <ReviewsContainer>
        {reviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ReviewHeader>
              <AuthorInfo>
                {review.profilePhoto ? (
                  <ProfilePhoto
                    src={`/api/proxy-image/?url=${encodeURIComponent(
                      review.profilePhoto
                    )}`}
                    alt={`${review.author}'s profile`}
                    onError={(e) => {
                      console.log(
                        "Profile photo failed to load:",
                        review.profilePhoto
                      );
                      // Mark this photo as failed
                      setFailedPhotos((prev) =>
                        new Set(prev).add(review.profilePhoto || "")
                      );
                    }}
                  />
                ) : null}
                <FallbackAvatar
                  $colorIndex={index}
                  style={{
                    display:
                      review.profilePhoto &&
                      !failedPhotos.has(review.profilePhoto)
                        ? "none"
                        : "flex",
                  }}
                >
                  {review.author.charAt(0).toUpperCase()}
                </FallbackAvatar>
                <AuthorDetails>
                  <AuthorName>{review.author}</AuthorName>
                  <ReviewDate>
                    {review.relativeTime || formatDate(review.createdAt)}
                  </ReviewDate>
                </AuthorDetails>
              </AuthorInfo>
              <StarRating>{renderStars(review.rating)}</StarRating>
            </ReviewHeader>

            {review.comment && (
              <ReviewComment>
                {review.comment.length > 200
                  ? `${review.comment.substring(0, 200)}...`
                  : review.comment}
              </ReviewComment>
            )}
          </ReviewCard>
        ))}
      </ReviewsContainer>
    </div>
  );
}
