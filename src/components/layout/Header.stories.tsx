import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import styled from "styled-components";

// Mock components for Storybook
const MockLocaleSwitcher = () => (
  <div
    style={{
      padding: "8px 16px",
      background: "rgba(255, 0, 128, 0.1)",
      border: "1px solid rgba(255, 0, 128, 0.3)",
      borderRadius: "8px",
      color: "#fff",
      fontSize: "14px",
    }}
  >
    EN | HE | RU
  </div>
);

const MockDesireLogo = ({ size = 60 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      background: "linear-gradient(135deg, #FF0080, #00FFFF)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: "12px",
      fontWeight: "bold",
    }}
  >
    D
  </div>
);

// Mock Link component
const MockLink = ({ children, href, ...props }: any) => (
  <a href={href} {...props}>
    {children}
  </a>
);

// Styled components for the header (simplified versions)
const HeaderContainer = styled.header<{
  $isScrolled: boolean;
  $isVisible: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background: ${({ $isScrolled }) =>
    $isScrolled
      ? "linear-gradient(135deg, rgba(10, 10, 10, 0.98) 0%, rgba(26, 26, 26, 0.95) 50%, rgba(10, 10, 10, 0.98) 100%)"
      : "linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(20, 20, 20, 0.92) 50%, rgba(10, 10, 10, 0.95) 100%)"};
  backdrop-filter: blur(
    ${({ $isScrolled }) => ($isScrolled ? "15px" : "10px")}
  );
  border-bottom: 1px solid
    ${({ $isScrolled }) => ($isScrolled ? "#FF0080" : "#333333")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(${({ $isVisible }) => ($isVisible ? "0" : "-100%")});
`;

const Nav = styled.nav<{ $isScrolled: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ $isScrolled }) =>
    $isScrolled ? "0.5rem 1.5rem" : "1rem 1.5rem"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
  }
`;

const LogoText = styled.span`
  font-family: "Orbitron", monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #ff0080 0%, #ff4500 100%);
    transition: width 0.3s;
  }

  ${LogoContainer}:hover & {
    color: #ff0080;

    &::after {
      width: 100%;
    }
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(10, 10, 10, 0.98) 0%,
      rgba(26, 26, 26, 0.95) 100%
    );
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  }
`;

const NavLink = styled.a<{ $isActive: boolean; $index: number }>`
  color: ${({ $isActive }) => ($isActive ? "#FF0080" : "#cccccc")};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: #ff0080;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin: 0.5rem 0;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  span {
    position: relative;
    z-index: 1;
    display: block;
    width: 20px;
    height: 2px;
    background: #ffffff;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 2px;
      background: #ffffff;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &::before {
      top: -6px;
    }

    &::after {
      top: 6px;
    }
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    span {
      background: transparent;

      &::before {
        transform: rotate(45deg);
        top: 0;
      }

      &::after {
        transform: rotate(-45deg);
        top: 0;
      }
    }
  `}

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ScrollIndicator = styled.div<{ $progress: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(135deg, #ff0080 0%, #ff4500 100%);
  width: ${({ $progress }) => $progress}%;
  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${({ $progress }) => ($progress > 0 ? 1 : 0)};
`;

// Create a simplified Header component for Storybook
const HeaderStory = ({
  currentPath = "/",
  currentLocale = "en",
  scrollY = 0,
  contentHeight = 2000,
}: {
  currentPath?: string;
  currentLocale?: string;
  scrollY?: number;
  contentHeight?: number;
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(scrollY > 50);
  const [isVisible, setIsVisible] = React.useState(true);
  const [scrollProgress, setScrollProgress] = React.useState(
    Math.min((scrollY / (contentHeight - 800)) * 100, 100)
  );

  React.useEffect(() => {
    setIsScrolled(scrollY > 50);
    setScrollProgress(Math.min((scrollY / (contentHeight - 800)) * 100, 100));
  }, [scrollY, contentHeight]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/book", label: "Book" },
    { href: "/contact", label: "Contact" },

    { href: "/menu", label: "Menu" },
  ];

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath.includes(href);
  };

  const getLocalizedHref = (href: string) => {
    if (href === "/") {
      return `/${currentLocale}`;
    }
    return `/${currentLocale}${href}`;
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer $isScrolled={isScrolled} $isVisible={isVisible}>
      <Nav $isScrolled={isScrolled}>
        <LogoContainer href={getLocalizedHref("/")}>
          <MockDesireLogo size={100} />
          <LogoText>DESIRE</LogoText>
        </LogoContainer>

        <NavLinks $isOpen={isMenuOpen}>
          {navItems.map((item, index) => (
            <NavLink
              key={item.href}
              href={getLocalizedHref(item.href)}
              $isActive={isActive(item.href)}
              $index={index}
              onClick={handleNavClick}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <RightSection>
          <MockLocaleSwitcher />
          <MenuButton $isOpen={isMenuOpen} onClick={handleMenuToggle}>
            <span />
          </MenuButton>
        </RightSection>
      </Nav>

      <ScrollIndicator $progress={scrollProgress} />
    </HeaderContainer>
  );
};

// Story container with proper styling
const StoryContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`;

// Content to simulate scrolling
const ScrollContent = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.surfaceLight} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
`;

// Wrapper component to handle state
const HeaderWrapper = ({
  currentPath = "/",
  currentLocale = "en",
  scrollY = 0,
  contentHeight = 2000,
}: {
  currentPath?: string;
  currentLocale?: string;
  scrollY?: number;
  contentHeight?: number;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <StoryContainer>
        <HeaderStory
          currentPath={currentPath}
          currentLocale={currentLocale}
          scrollY={scrollY}
          contentHeight={contentHeight}
        />
        <ScrollContent $height={contentHeight}>
          Scroll down to see header behavior
        </ScrollContent>
      </StoryContainer>
    </ThemeProvider>
  );
};

const meta: Meta<typeof HeaderWrapper> = {
  title: "Layout/Header",
  component: HeaderWrapper,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The main navigation header with responsive design, scroll effects, and locale switching. Features a fixed position with dynamic styling based on scroll state.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPath: {
      control: "select",
      options: [
        "/",
        "/events",
        "/gallery",
        "/about",
        "/book",
        "/contact",
        "/menu",
      ],
      description: "Current page path to show active navigation state",
    },
    currentLocale: {
      control: "select",
      options: ["en", "he", "ru"],
      description: "Current locale for internationalization",
    },
    scrollY: {
      control: { type: "range", min: 0, max: 1000, step: 10 },
      description: "Simulate scroll position to see header state changes",
    },
    contentHeight: {
      control: { type: "range", min: 1000, max: 3000, step: 100 },
      description: "Content height to simulate different page lengths",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", overflow: "auto" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPath: "/",
    currentLocale: "en",
    scrollY: 0,
    contentHeight: 2000,
  },
  parameters: {
    docs: {
      description: {
        story: "Default header state when at the top of the page.",
      },
    },
  },
};

export const Scrolled: Story = {
  args: {
    currentPath: "/",
    currentLocale: "en",
    scrollY: 200,
    contentHeight: 2000,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Header state when scrolled down, showing the compact design with enhanced styling.",
      },
    },
  },
};

export const ActivePage: Story = {
  args: {
    currentPath: "/events",
    currentLocale: "en",
    scrollY: 0,
    contentHeight: 2000,
  },
  parameters: {
    docs: {
      description: {
        story: "Header showing active navigation state for the Events page.",
      },
    },
  },
};

export const HebrewLocale: Story = {
  args: {
    currentPath: "/",
    currentLocale: "he",
    scrollY: 0,
    contentHeight: 2000,
  },
  parameters: {
    docs: {
      description: {
        story: "Header with Hebrew locale selected.",
      },
    },
  },
};

export const RussianLocale: Story = {
  args: {
    currentPath: "/",
    currentLocale: "ru",
    scrollY: 0,
    contentHeight: 2000,
  },
  parameters: {
    docs: {
      description: {
        story: "Header with Russian locale selected.",
      },
    },
  },
};

export const LongPage: Story = {
  args: {
    currentPath: "/",
    currentLocale: "en",
    scrollY: 500,
    contentHeight: 3000,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Header behavior on a long page with significant scroll progress.",
      },
    },
  },
};

// Interactive demo with scroll simulation
const InteractiveDemo = () => {
  const [scrollY, setScrollY] = React.useState(0);
  const [currentPath, setCurrentPath] = React.useState("/");

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StoryContainer>
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            background: "rgba(0, 0, 0, 0.8)",
            padding: "16px",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
          }}
        >
          <div>Scroll Y: {scrollY}px</div>
          <div style={{ marginTop: "8px" }}>
            <button
              onClick={() => setCurrentPath("/")}
              style={{
                marginRight: "8px",
                padding: "4px 8px",
                background: currentPath === "/" ? "#FF0080" : "#333",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPath("/events")}
              style={{
                marginRight: "8px",
                padding: "4px 8px",
                background: currentPath === "/events" ? "#FF0080" : "#333",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Events
            </button>
            <button
              onClick={() => setCurrentPath("/gallery")}
              style={{
                padding: "4px 8px",
                background: currentPath === "/gallery" ? "#FF0080" : "#333",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Gallery
            </button>
          </div>
        </div>
        <HeaderWrapper
          currentPath={currentPath}
          currentLocale="en"
          scrollY={scrollY}
          contentHeight={3000}
        />
      </StoryContainer>
    </ThemeProvider>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo where you can scroll and change pages to see the header behavior in real-time.",
      },
    },
  },
};
