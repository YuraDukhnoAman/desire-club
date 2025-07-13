"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { PageContainer, PageTitle } from "@/components/ui/PageLayout";
import { useParams } from "next/navigation";
import { MenuSection, MenuItem } from "@/components/ui/MenuSection";
import { menuData, AlcoholCategory } from "@/data/menu";
import AlcoholMenu from "@/components/ui/AlcoholMenu";

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const MenuContent = styled(motion.div)<{ $isRtl: boolean }>`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};
  position: relative;
  z-index: 1;
`;

const Description = styled(motion.p)<{ $isRtl: boolean }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: ${({ theme }) => `${theme.spacing.xl} auto ${theme.spacing.xxl}`};
  text-align: center;
  max-width: 800px;
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text} 0%,
    ${({ theme }) => theme.colors.textSecondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px ${({ theme }) => `${theme.colors.primary}30`};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin: ${({ theme }) => `${theme.spacing.lg} auto ${theme.spacing.xl}`};
  }
`;

const TabList = styled.div<{ $isRtl: boolean }>`
  display: flex;
  overflow-x: auto;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

  &::-webkit-scrollbar {
    height: 2px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const Tab = styled.button<{ $active: boolean; $isRtl: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: none;
  border: none;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  transition: color 0.3s ease;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MenuNote = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
`;

const FloatingOrb = styled(motion.div)`
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  opacity: 0.15;
  mix-blend-mode: screen;
  will-change: transform;
`;

export default function MenuPage() {
  const t = useTranslations("menu");
  const params = useParams();
  const isRtl = params.locale === "he";
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);

  const activeSection = menuData.find(
    (section) => section.category === activeCategory
  );

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <PageWrapper>
      <FloatingOrb
        style={{
          background: "linear-gradient(135deg, #ff0080 0%, #7928ca 100%)",
          top: "20%",
          left: "5%",
        }}
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingOrb
        style={{
          background: "linear-gradient(135deg, #00FFFF 0%, #7928ca 100%)",
          bottom: "20%",
          right: "5%",
        }}
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <PageContainer>
        <PageTitle>{t("title")}</PageTitle>
        <MenuContent
          $isRtl={isRtl}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Description $isRtl={isRtl} variants={itemVariants}>
            {t("description")}
          </Description>

          <TabList $isRtl={isRtl}>
            {menuData.map((section) => (
              <Tab
                key={section.category}
                $active={activeCategory === section.category}
                $isRtl={isRtl}
                onClick={() => setActiveCategory(section.category)}
              >
                {t(`categories.${section.category}`)}
              </Tab>
            ))}
          </TabList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection?.isAlcohol ? (
                <AlcoholMenu
                  categories={activeSection.items as AlcoholCategory[]}
                />
              ) : (
                <MenuSection
                  category={t(`categories.${activeCategory}`)}
                  items={activeSection?.items as MenuItem[]}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <MenuNote variants={itemVariants}>{t("note")}</MenuNote>
        </MenuContent>
      </PageContainer>
    </PageWrapper>
  );
}
