import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";

type Props = {
  params: { locale: string };
};

export default function HomePage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations();

  return (
    <>
      <Hero />
    </>
  );
}
