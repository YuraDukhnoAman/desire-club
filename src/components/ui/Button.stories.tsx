import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Book Your Table",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "View Events",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Learn More",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "small",
    children: "Small Button",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "large",
    children: "Large Button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled Button",
  },
};

export const AsLink: Story = {
  args: {
    variant: "primary",
    href: "/events",
    children: "Go to Events",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When an `href` prop is provided, the button renders as a Next.js Link component.",
      },
    },
  },
};
