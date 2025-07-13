"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const Card = styled(motion.div)<{ $isRtl: boolean }>`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => `${theme.colors.primary}15`} 0%,
      ${({ theme }) => `${theme.colors.secondary}10`} 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 20px 40px -15px ${({ theme }) => `${theme.colors.primary}40`},
      0 0 0 1px ${({ theme }) => `${theme.colors.primary}20`};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-6px) scale(1.01);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
`;

const Content = styled.div<{ $isRtl: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 2;
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PhotoCount = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const DateText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const AlbumLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const FacebookLink = styled.a`
  display: block;
  width: fit-content;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-decoration: none;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  position: relative;
  z-index: 3;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px -8px ${({ theme }) => `${theme.colors.primary}50`};

    &::before {
      left: 0;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const PhotoCountBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background: rgba(0, 0, 0, 0.8);
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  backdrop-filter: blur(10px);
`;

interface AlbumCardProps {
  id: string;
  name: string;
  description?: string;
  photoCount: number;
  coverImage?: string;
  createdAt: string;
  facebookUrl: string;
  clickable?: boolean;
}

export function AlbumCard({
  id,
  name,
  description,
  photoCount,
  coverImage,
  createdAt,
  facebookUrl,
  clickable = false,
}: AlbumCardProps) {
  const t = useTranslations("gallery.albums");
  const locale = useLocale();
  const isRtl = locale === "he";

  const formattedDate = new Date(createdAt).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const CardContent = (
    <Card
      $isRtl={isRtl}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ y: -6, scale: 1.01 }}
    >
      <ImageContainer>
        {coverImage && (
          <Image
            src={coverImage}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <PhotoCountBadge>
          {photoCount} {photoCount === 1 ? t("photo") : t("photos")}
        </PhotoCountBadge>
      </ImageContainer>
      <Content $isRtl={isRtl}>
        <Title>{name}</Title>
        <DateText>{formattedDate}</DateText>
        {description && <Description>{description}</Description>}
        <FacebookLink
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {t("viewOnFacebook")}
        </FacebookLink>
      </Content>
    </Card>
  );

  if (clickable) {
    return <AlbumLink href={`/gallery/${id}`}>{CardContent}</AlbumLink>;
  }

  return CardContent;
}
