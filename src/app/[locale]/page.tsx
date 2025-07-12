import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero";
import { EventsPreview } from "@/components/sections/EventsPreview";

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <Hero />
      <EventsPreview />
    </>
  );
}
