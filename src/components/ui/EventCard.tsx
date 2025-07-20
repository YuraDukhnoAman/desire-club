"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Button } from "./Button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 10px 30px -10px ${({ theme }) => `${theme.colors.primary}30`};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DateText = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Type = styled.span`
  background: ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: inline-block;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  type: string;
  image: string;
  bookingUrl: string;
  featured?: boolean;
}

export function EventCard({
  title,
  date,
  time,
  description,
  type,
  image,
}: EventCardProps) {
  const t = useTranslations("events");
  const locale = useLocale();
  const formattedDate = new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <ImageContainer>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </ImageContainer>
      <Content>
        <Type>{t(`types.${type}`)}</Type>
        <Title>{title}</Title>
        <DateText>
          {formattedDate}
          {" • "}
          {time}
        </DateText>
        <Description>{description}</Description>
        <Actions>
          <Button
            variant="primary"
            size="medium"
            href={`/${locale}/book?event=${encodeURIComponent(
              title
            )}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(
              time
            )}`}
            external={false}
            onClick={() => {
              console.log("EventCard - Button clicked");
              console.log("EventCard - Event title:", title);
              console.log("EventCard - Event date:", date);
              console.log("EventCard - Event time:", time);
              console.log(
                "EventCard - Generated URL:",
                `/${locale}/book?event=${encodeURIComponent(
                  title
                )}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(
                  time
                )}`
              );
            }}
          >
            {t("bookNow")}
          </Button>
        </Actions>
      </Content>
    </Card>
  );
}
