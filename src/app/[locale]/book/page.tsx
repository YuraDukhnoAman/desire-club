"use client";

import React from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/PageLayout";
import { BookingForm } from "@/components/ui/BookingForm";

const BookingSection = styled(motion.section)`
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
  overflow: hidden;
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  pointer-events: none;
  opacity: 0.5;
`;

const AnimatedBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    ${({ theme }) => `${theme.colors.primary}15`} 0%,
    ${({ theme }) => `${theme.colors.secondary}15`} 50%,
    ${({ theme }) => `${theme.colors.primary}15`} 100%
  );
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  z-index: 0;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default function BookPage() {
  const params = useParams();
  const isRtl = params.locale === "he";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <PageContainer>
      <BookingSection
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatedBackground />

        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #ff0080 0%, #7928ca 100%)",
            top: "10%",
            left: "10%",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <FloatingOrb
          style={{
            background: "linear-gradient(135deg, #7928ca 0%, #ff0080 100%)",
            bottom: "10%",
            right: "10%",
          }}
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <BookingForm isRtl={isRtl} whatsappNumber="972502102496" />
      </BookingSection>
    </PageContainer>
  );
}
