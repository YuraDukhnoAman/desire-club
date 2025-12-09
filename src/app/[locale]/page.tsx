import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import type { Metadata } from "next";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://desiremusicclub.com";
  
  const titles = {
    en: "Desire Music Club - Tel Aviv's Premier Nightclub",
    ru: "Desire Music Club - Лучший ночной клуб Тель-Авива",
    he: "Desire Music Club - מועדון הלילה המוביל בתל אביב"
  };
  
  const descriptions = {
    en: "Experience the ultimate nightlife at Tel Aviv's premier music club. Live performances, DJ sets, and unforgettable nights.",
    ru: "Испытайте лучшую ночную жизнь в главном музыкальном клубе Тель-Авива. Живые выступления, DJ-сеты и незабываемые вечера.",
    he: "חוו את חיי הלילה האולטימטיביים במועדון המוזיקה המוביל בתל אביב. הופעות חיות, סטים של DJ וערבים בלתי נשכחים."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      locale: locale,
      type: "website",
      url: `${baseUrl}/${locale}`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'ru': `${baseUrl}/ru`,
        'he': `${baseUrl}/he`,
      }
    }
  };
}

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
