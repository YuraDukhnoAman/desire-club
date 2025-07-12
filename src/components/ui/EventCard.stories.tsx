import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";

// EventCard component for Storybook
const EventCard = styled.div`
  background: #1a1a1a;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #333333;
  transition: transform 0.3s ease;
  max-width: 300px;

  &:hover {
    transform: translateY(-5px);
    border-color: #ff0080;
  }
`;

const EventTitle = styled.h3`
  font-size: 1.25rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-family: "Orbitron", monospace;
`;

const EventDate = styled.p`
  color: #00ffff;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const EventDescription = styled.p`
  color: #cccccc;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const EventPrice = styled.p`
  color: #ff0080;
  font-weight: 600;
  font-size: 1.125rem;
`;

const EventType = styled.span`
  background: #2a2a2a;
  color: #00ffff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
`;

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  price: number;
  type: string;
}

function EventCardComponent({
  title,
  date,
  description,
  price,
  type,
}: EventCardProps) {
  return (
    <EventCard>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <EventType>{type}</EventType>
      </div>
      <EventTitle>{title}</EventTitle>
      <EventDate>{date}</EventDate>
      <EventDescription>{description}</EventDescription>
      <EventPrice>{price > 0 ? `₪${price}` : "Free Entry"}</EventPrice>
    </EventCard>
  );
}

const meta: Meta<typeof EventCardComponent> = {
  title: "Components/EventCard",
  component: EventCardComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Event card component displaying event information with hover effects.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    date: { control: "text" },
    description: { control: "text" },
    price: { control: "number" },
    type: {
      control: "select",
      options: ["party", "live", "standup", "karaoke", "quiz"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Party: Story = {
  args: {
    title: "Electronic Euphoria",
    date: "2024-01-15",
    description: "Progressive house and techno night with international DJs",
    price: 80,
    type: "party",
  },
};

export const LiveMusic: Story = {
  args: {
    title: "Live Jazz Sessions",
    date: "2024-01-18",
    description:
      "Intimate jazz performances with local and international artists",
    price: 60,
    type: "live",
  },
};

export const FreeEvent: Story = {
  args: {
    title: "Comedy Night",
    date: "2024-01-20",
    description: "Stand-up comedy with the best local comedians",
    price: 0,
    type: "standup",
  },
};

export const Karaoke: Story = {
  args: {
    title: "Karaoke Madness",
    date: "2024-01-22",
    description: "Sing your heart out with our premium karaoke system",
    price: 0,
    type: "karaoke",
  },
};

export const Quiz: Story = {
  args: {
    title: "Quiz Night Challenge",
    date: "2024-01-24",
    description: "Test your knowledge and win amazing prizes",
    price: 0,
    type: "quiz",
  },
};
