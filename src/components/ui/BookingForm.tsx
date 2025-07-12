import { useState, FormEvent, ChangeEvent } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

// Types
interface BookingFormProps {
  isRtl: boolean;
  whatsappNumber: string;
}

interface BookingFormData {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  comment?: string;
}

// Styled Components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.gradients.dark};
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 40vmax;
    height: 40vmax;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradients.primary};
    animation: move 15s linear infinite;
    opacity: 0.1;
    z-index: 0;
  }

  &::before {
    top: -20vmax;
    left: -10vmax;
    animation-delay: -5s;
  }

  &::after {
    bottom: -20vmax;
    right: -10vmax;
  }

  @keyframes move {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(20px, 20px) rotate(180deg);
    }
    100% {
      transform: translate(0, 0) rotate(360deg);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const TitleSection = styled.div<{ isRtl: boolean }>`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  max-width: 600px;
  width: 100%;
  direction: ${({ isRtl }) => (isRtl ? "rtl" : "ltr")};
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(255, 0, 128, 0.5);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: 500px;
  margin: 0 auto;
  opacity: 0.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const Form = styled.form<{ isRtl: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  backdrop-filter: blur(10px);
  direction: ${({ isRtl }) => (isRtl ? "rtl" : "ltr")};
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.gradients.primary};
    opacity: 0.05;
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Input = styled.input`
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled(Input).attrs({ as: "textarea" })`
  min-height: 100px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing.easeInOut};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.neon};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// Component
export const BookingForm: React.FC<BookingFormProps> = ({
  isRtl,
  whatsappNumber,
}) => {
  const t = useTranslations("book");
  const tf = useTranslations("book.form");
  const params = useParams();
  const locale = params.locale as string;

  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    guests: 1,
    date: "",
    time: "",
    comment: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const rtlMarker = isRtl ? "\u200F" : "";
    const hour = new Date().getHours();
    let greeting = "";
    let message = "";

    if (params.locale === "he") {
      greeting =
        hour < 12
          ? "בוקר טוב"
          : hour < 17
          ? "צהריים טובים"
          : hour < 21
          ? "ערב טוב"
          : "לילה טוב";
      message = `${greeting}
${rtlMarker}קוראים לי ${formData.name}, אני רוצה להזמין שולחן ל-${
        formData.guests
      } ${formData.guests === 1 ? "אורח" : "אורחים"} בתאריך ${
        formData.date
      } בשעה ${formData.time}
${rtlMarker}מספר הטלפון שלי: ${formData.phone}${
        formData.comment ? `\n${rtlMarker}הערות: ${formData.comment}` : ""
      }`;
    } else if (params.locale === "ru") {
      greeting =
        hour < 12
          ? "Доброе утро"
          : hour < 17
          ? "Добрый день"
          : hour < 21
          ? "Добрый вечер"
          : "Доброй ночи";
      message = `${greeting}
Меня зовут ${formData.name}, я хочу забронировать столик на ${
        formData.guests
      } ${formData.guests === 1 ? "человека" : "человек"} на ${formData.date} ${
        formData.time
      }
Мой номер телефона: ${formData.phone}${
        formData.comment ? `\nКомментарий: ${formData.comment}` : ""
      }`;
    } else {
      greeting =
        hour < 12
          ? "Good morning"
          : hour < 17
          ? "Good afternoon"
          : hour < 21
          ? "Good evening"
          : "Good night";
      message = `${greeting}
My name is ${formData.name}, I would like to book a table for ${
        formData.guests
      } ${formData.guests === 1 ? "person" : "people"} on ${formData.date} at ${
        formData.time
      }
My phone number: ${formData.phone}${
        formData.comment ? `\nComment: ${formData.comment}` : ""
      }`;
    }

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <FormContainer>
      <TitleSection isRtl={isRtl}>
        <Title>{t("title")}</Title>
        <Description>{t("description")}</Description>
      </TitleSection>
      <Form isRtl={isRtl} onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">{tf("name")} *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">{tf("phone")} *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="guests">{tf("guests")} *</Label>
          <Input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="20"
            value={formData.guests}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="date">{tf("date")} *</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="time">{tf("time")} *</Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="comment">
            {tf("comment")} ({tf("optional")})
          </Label>
          <TextArea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
          />
        </FormGroup>

        <SubmitButton type="submit">{tf("submit")} 💬</SubmitButton>
      </Form>
    </FormContainer>
  );
};
