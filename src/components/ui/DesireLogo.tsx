"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

// Animations
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

// Styled Components
const LogoContainer = styled.div<{ $size?: number }>`
  display: inline-block;
  width: ${({ $size }) => $size || 60}px;
  height: ${({ $size }) => $size || 60}px;
  cursor: pointer;
  animation: ${float} 4s ease-in-out infinite;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);

    .starburst {
      animation: ${rotate} 8s linear infinite;
    }

    .sparkles {
      animation: ${sparkle} 1.5s ease-in-out infinite;
    }

    .microphone {
      animation: ${pulse} 2s ease-in-out infinite;
    }
  }
`;

const StyledSVG = styled.svg`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 10px rgba(255, 0, 128, 0.3));
  transition: filter 0.3s ease;

  &:hover {
    filter: drop-shadow(0 0 20px rgba(255, 0, 128, 0.6));
  }
`;

interface DesireLogoProps {
  size?: number;
  className?: string;
}

export function DesireLogo({ size = 60, className }: DesireLogoProps) {
  return (
    <LogoContainer $size={size} className={className}>
      <StyledSVG
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Starburst/Sunburst Pattern */}
        <g className="starburst">
          {/* Main radiating lines */}
          <line
            x1="100"
            y1="20"
            x2="100"
            y2="40"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="160"
            x2="100"
            y2="180"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="20"
            y1="100"
            x2="40"
            y2="100"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="160"
            y1="100"
            x2="180"
            y2="100"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Diagonal lines */}
          <line
            x1="35.8"
            y1="35.8"
            x2="50.2"
            y2="50.2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="164.2"
            y1="35.8"
            x2="149.8"
            y2="50.2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="35.8"
            y1="164.2"
            x2="50.2"
            y2="149.8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="164.2"
            y1="164.2"
            x2="149.8"
            y2="149.8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Additional radiating lines */}
          <line
            x1="100"
            y1="10"
            x2="100"
            y2="25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="175"
            x2="100"
            y2="190"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="10"
            y1="100"
            x2="25"
            y2="100"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="175"
            y1="100"
            x2="190"
            y2="100"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* More diagonal lines */}
          <line
            x1="25.8"
            y1="25.8"
            x2="35.2"
            y2="35.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="174.2"
            y1="25.8"
            x2="164.8"
            y2="35.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="25.8"
            y1="174.2"
            x2="35.2"
            y2="164.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="174.2"
            y1="174.2"
            x2="164.8"
            y2="164.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Shorter accent lines */}
          <line
            x1="70"
            y1="30"
            x2="75"
            y2="35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="130"
            y1="30"
            x2="125"
            y2="35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="70"
            y1="170"
            x2="75"
            y2="165"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="130"
            y1="170"
            x2="125"
            y2="165"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="30"
            y1="70"
            x2="35"
            y2="75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="30"
            y1="130"
            x2="35"
            y2="125"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="170"
            y1="70"
            x2="165"
            y2="75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="170"
            y1="130"
            x2="165"
            y2="125"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Sparkles/Dots */}
        <g className="sparkles">
          <circle cx="60" cy="50" r="2" fill="currentColor" />
          <circle cx="140" cy="50" r="2" fill="currentColor" />
          <circle cx="50" cy="80" r="1.5" fill="currentColor" />
          <circle cx="150" cy="80" r="1.5" fill="currentColor" />
          <circle cx="45" cy="120" r="2" fill="currentColor" />
          <circle cx="155" cy="120" r="2" fill="currentColor" />
          <circle cx="60" cy="150" r="1.5" fill="currentColor" />
          <circle cx="140" cy="150" r="1.5" fill="currentColor" />
          <circle cx="80" cy="40" r="1" fill="currentColor" />
          <circle cx="120" cy="40" r="1" fill="currentColor" />
          <circle cx="40" cy="100" r="1" fill="currentColor" />
          <circle cx="160" cy="100" r="1" fill="currentColor" />
          <circle cx="80" cy="160" r="1" fill="currentColor" />
          <circle cx="120" cy="160" r="1" fill="currentColor" />
        </g>

        {/* Text - "club" (script style) */}
        <text
          x="100"
          y="75"
          textAnchor="middle"
          fontSize="18"
          fontFamily="cursive"
          fontStyle="italic"
          fill="currentColor"
        >
          club
        </text>

        {/* Text - "DESIRE" (bold block letters) */}
        <text
          x="100"
          y="100"
          textAnchor="middle"
          fontSize="24"
          fontFamily="Arial Black, sans-serif"
          fontWeight="900"
          fill="currentColor"
          letterSpacing="2px"
        >
          DESIRE
        </text>

        {/* Microphone with Martini Glass Base */}
        <g className="microphone">
          {/* Martini Glass Base */}
          <path
            d="M 85 120 L 115 120 L 105 140 L 95 140 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Glass Stem */}
          <line
            x1="100"
            y1="140"
            x2="100"
            y2="155"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Glass Base */}
          <ellipse cx="100" cy="158" rx="12" ry="3" fill="currentColor" />

          {/* Microphone Body */}
          <ellipse
            cx="100"
            cy="125"
            rx="8"
            ry="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Microphone Grille Lines */}
          <line
            x1="95"
            y1="120"
            x2="105"
            y2="120"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="95"
            y1="125"
            x2="105"
            y2="125"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="95"
            y1="130"
            x2="105"
            y2="130"
            stroke="currentColor"
            strokeWidth="1"
          />

          {/* Microphone Stand/Handle */}
          <line
            x1="100"
            y1="113"
            x2="100"
            y2="108"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Microphone Top */}
          <circle
            cx="100"
            cy="106"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </g>

        {/* Additional decorative elements */}
        <g className="sparkles">
          <circle cx="70" cy="110" r="1" fill="currentColor" opacity="0.7" />
          <circle cx="130" cy="110" r="1" fill="currentColor" opacity="0.7" />
          <circle cx="85" cy="90" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="115" cy="90" r="1.5" fill="currentColor" opacity="0.6" />
        </g>
      </StyledSVG>
    </LogoContainer>
  );
}
