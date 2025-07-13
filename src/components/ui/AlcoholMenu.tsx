import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Container = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

const CategorySection = styled(motion.section)`
  padding: ${({ theme }) => theme.spacing.xl};
  background: rgba(0, 0, 0, 0.3);
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
  text-transform: uppercase;
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ItemName = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export interface AlcoholItem {
  name: string;
}

export interface AlcoholCategory {
  category: string;
  items: AlcoholItem[];
}

interface AlcoholMenuProps {
  categories: AlcoholCategory[];
}

export default function AlcoholMenu({ categories }: AlcoholMenuProps) {
  const t = useTranslations("menu");

  return (
    <Container>
      {categories.map((category) => (
        <CategorySection
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <CategoryTitle>{t(`categories.${category.category}`)}</CategoryTitle>
          <ItemsGrid>
            {category.items.map((item) => (
              <ItemName key={item.name}>{item.name}</ItemName>
            ))}
          </ItemsGrid>
        </CategorySection>
      ))}
    </Container>
  );
}
