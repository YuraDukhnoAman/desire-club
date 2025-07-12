"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import styled from "styled-components";
import ContactInfo from "@/components/ui/ContactInfo";

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.desktop};
  margin: 0 auto;
  padding: calc(70px + ${({ theme }) => theme.spacing.xxl})
    ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize["5xl"]};
  text-shadow: ${({ theme }) => theme.shadows.neon};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  }
`;

export default function ContactPage() {
  const t = useTranslations("contact");
  const params = useParams();
  const isRtl = params.locale === "he";

  return (
    <Container>
      <Title>{t("title")}</Title>
      <ContactInfo isRtl={isRtl} />
    </Container>
  );
}
