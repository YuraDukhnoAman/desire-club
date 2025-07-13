import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.xl};
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.gradients.primary};
    opacity: 0.5;
  }

  &:hover::before {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
`;

const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px ${({ theme }) => `${theme.colors.primary}50`};
`;

const ItemsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: string;
}

interface MenuSectionProps {
  category: string;
  items: MenuItem[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function MenuSection({ category, items }: MenuSectionProps) {
  return (
    <Section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <CategoryTitle>{category}</CategoryTitle>
      <ItemsGrid>
        {items.map((item, index) => (
          <motion.div key={item.id} variants={itemVariants}>
            <MenuItem {...item} />
          </motion.div>
        ))}
      </ItemsGrid>
    </Section>
  );
}

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: baseline;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ItemInfo = styled.div``;

const ItemName = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ItemDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-style: italic;
  margin-left: ${({ theme }) => theme.spacing.md};
`;

function MenuItem({ name, description }: MenuItem) {
  const t = useTranslations("menu");
  return (
    <ItemContainer>
      <ItemInfo>
        <ItemName>{t(name)}</ItemName>
        {description && <ItemDescription>{t(description)}</ItemDescription>}
      </ItemInfo>
    </ItemContainer>
  );
}
