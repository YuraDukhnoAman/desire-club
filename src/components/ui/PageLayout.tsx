"use client";

import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl};
  padding-top: calc(
    70px + ${({ theme }) => theme.spacing.xxl}
  ); /* Account for fixed header */
  background: ${({ theme }) => theme.colors.background};
`;

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;
