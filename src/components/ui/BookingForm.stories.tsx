import type { Meta, StoryObj } from "@storybook/react";
import { BookingForm } from "./BookingForm";
import { ThemeProvider } from "../providers/ThemeProvider";

const meta: Meta<typeof BookingForm> = {
  title: "UI/BookingForm",
  component: BookingForm,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ minHeight: "100vh", width: "100%" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BookingForm>;

export const Default: Story = {
  args: {
    isRtl: false,
    whatsappNumber: "972501234567",
  },
};

export const RTL: Story = {
  args: {
    isRtl: true,
    whatsappNumber: "972501234567",
  },
};
