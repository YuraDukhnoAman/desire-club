import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <Hero />
    </>
  );
}
