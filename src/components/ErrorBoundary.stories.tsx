import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import styled from "styled-components";

// Component that intentionally throws an error
const ErrorThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("This is a test error for demonstrating the ErrorBoundary");
  }

  return (
    <div
      style={{
        padding: "2rem",
        background: "#1a1a1a",
        borderRadius: "8px",
        color: "#ffffff",
        textAlign: "center",
      }}
    >
      <h3>✅ Normal Component</h3>
      <p>
        This component is working normally. Toggle the control to see the error
        boundary in action.
      </p>
    </div>
  );
};

// Wrapper to make the story interactive
const ErrorBoundaryDemo = ({ triggerError }: { triggerError: boolean }) => {
  return (
    <ErrorBoundary>
      <ErrorThrowingComponent shouldThrow={triggerError} />
    </ErrorBoundary>
  );
};

const StoryContainer = styled.div`
  padding: 2rem;
  background: #0a0a0a;
  min-height: 300px;
`;

const meta: Meta<typeof ErrorBoundaryDemo> = {
  title: "Components/ErrorBoundary",
  component: ErrorBoundaryDemo,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Error boundary component that catches JavaScript errors and displays a fallback UI with nightclub styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    triggerError: {
      control: "boolean",
      description:
        "Toggle to trigger an error and see the error boundary in action",
    },
  },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerError: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default state showing a normal component wrapped in an ErrorBoundary.",
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    triggerError: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Error state showing the ErrorBoundary fallback UI when a component throws an error.",
      },
    },
  },
};

// Custom fallback example
const CustomFallback = () => (
  <div
    style={{
      padding: "2rem",
      background: "#2a2a2a",
      borderRadius: "8px",
      border: "2px solid #FF0080",
      color: "#ffffff",
      textAlign: "center",
    }}
  >
    <h3 style={{ color: "#FF0080" }}>🎛️ Custom Error UI</h3>
    <p>This is a custom fallback component for when things go wrong.</p>
  </div>
);

export const WithCustomFallback: Story = {
  render: () => (
    <ErrorBoundary fallback={<CustomFallback />}>
      <ErrorThrowingComponent shouldThrow={true} />
    </ErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ErrorBoundary with a custom fallback component instead of the default error UI.",
      },
    },
  },
};

// Example showing nested error boundaries
const NestedErrorComponent = () => {
  const [innerError, setInnerError] = React.useState(false);
  const [outerError, setOuterError] = React.useState(false);

  return (
    <div
      style={{ padding: "1rem", background: "#1a1a1a", borderRadius: "8px" }}
    >
      <h3 style={{ color: "#00FFFF" }}>Nested Error Boundaries Demo</h3>
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setOuterError(!outerError)}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            background: outerError ? "#ff4444" : "#FF0080",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {outerError ? "Fix" : "Break"} Outer Component
        </button>
        <button
          onClick={() => setInnerError(!innerError)}
          style={{
            padding: "0.5rem 1rem",
            background: innerError ? "#ff4444" : "#00FFFF",
            color: innerError ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {innerError ? "Fix" : "Break"} Inner Component
        </button>
      </div>

      <ErrorBoundary>
        <div
          style={{
            padding: "1rem",
            background: "#2a2a2a",
            borderRadius: "4px",
          }}
        >
          <p>Outer boundary protects this area</p>
          <ErrorBoundary>
            <div
              style={{
                padding: "1rem",
                background: "#3a3a3a",
                borderRadius: "4px",
              }}
            >
              <p>Inner boundary protects this area</p>
              <ErrorThrowingComponent shouldThrow={innerError} />
            </div>
          </ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={outerError} />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export const NestedBoundaries: Story = {
  render: () => <NestedErrorComponent />,
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how nested ErrorBoundaries can isolate errors to specific parts of the component tree.",
      },
    },
  },
};
