import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const TabsContainer = styled.div`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const TabList = styled.div<{ $isRtl: boolean }>`
  display: flex;
  overflow-x: auto;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

  &::-webkit-scrollbar {
    height: 2px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const Tab = styled.button<{ active: boolean; $isRtl: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: none;
  border: none;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  transition: color 0.3s ease;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(${({ active }) => (active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TabContent = styled.div<{ $isRtl: boolean }>`
  margin-top: ${({ theme }) => theme.spacing.xl};
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};
`;

const Description = styled.p<{ $isRtl: boolean }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
`;

const ImageGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "main main"
      "sub1 sub2"
      "sub3 sub4";
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "main main sub1"
      "main main sub2"
      "sub3 sub4 sub4";
  }
`;

const ImageWrapper = styled.div<{ area: string }>`
  position: relative;
  width: 100%;
  height: ${({ area }) => (area === "main" ? "400px" : "200px")};
  grid-area: ${({ area }) => area};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ExpandButton = styled.button<{ $isRtl: boolean }>`
  background: none;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  transition: all 0.3s ease;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const ExtendedContent = styled.div<{ $isRtl: boolean }>`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => `${theme.colors.surface}10`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    line-height: 1.8;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  ul,
  ol {
    margin: ${({ theme }) => theme.spacing.lg} 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
    padding-right: ${({ theme }) => theme.spacing.xl};
  }

  li {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export default function EventTypeTabs() {
  const t = useTranslations("about.events");
  const params = useParams();
  const isRtl = params.locale === "he";
  const [activeTab, setActiveTab] = useState("live");
  const [isExtendedVisible, setIsExtendedVisible] = useState(false);

  const eventTypes = [
    {
      id: "live",
      label: t("live.label"),
      description: t("live.description"),
      images: [
        "/assets/ui/backgrounds/about/live-concerts/514728464_1300841482046548_6550638706408135999_n.jpg",
        "/assets/ui/backgrounds/about/live-concerts/514418801_1300840572046639_4486554442056172558_n.jpg",
        "/assets/ui/backgrounds/about/live-concerts/514021125_1300840632046633_3371094949286788954_n.jpg",
        "/assets/ui/backgrounds/about/live-concerts/514409934_1300840645379965_2536133090406834603_n.jpg",
        "/assets/ui/backgrounds/about/live-concerts/513951011_1300841258713237_3364042759429850319_n.jpg",
      ],
    },
    {
      id: "mom",
      label: t("mom.label"),
      description: t("mom.short"),
      images: [
        "/assets/ui/backgrounds/about/mom/492522651_1242690481194982_8592720461180068310_n.jpg",
        "/assets/ui/backgrounds/about/mom/493477012_1242689451195085_305224619651085089_n.jpg",
        "/assets/ui/backgrounds/about/mom/492502589_1242689701195060_8085884784916298436_n.jpg",
        "/assets/ui/backgrounds/about/mom/493322934_1242689431195087_6893993871772007059_n.jpg",
        "/assets/ui/backgrounds/about/mom/492436951_1242690594528304_6644447610676661542_n.jpg",
      ],
    },
    {
      id: "karaoke",
      label: t("karaoke.label"),
      description: t("karaoke.description"),
      images: [],
    },
    {
      id: "standup",
      label: t("standup.label"),
      description: t("standup.description"),
      images: [
        "/assets/ui/backgrounds/about/standup/500331705_1271017951695568_3759745623717392760_n.jpg",
        "/assets/ui/backgrounds/about/standup/501353715_1271018018362228_2527854792816590876_n.jpg",
        "/assets/ui/backgrounds/about/standup/500280366_1271018098362220_8295739600963142980_n.jpg",
        "/assets/ui/backgrounds/about/standup/501751113_1271017978362232_290234329948890558_n.jpg",
        "/assets/ui/backgrounds/about/standup/500286119_1271017558362274_8565910484915782438_n.jpg",
      ],
    },
    {
      id: "quiz",
      label: t("quiz.label"),
      description: t("quiz.description"),
      images: [],
    },
    {
      id: "party",
      label: t("party.label"),
      description: t("party.description"),
      images: [
        "/assets/ui/backgrounds/about/disco/492694337_1243597207770976_179124857974170616_n.jpg",
        "/assets/ui/backgrounds/about/disco/493319057_1243597077770989_5616002219658738113_n.jpg",
        "/assets/ui/backgrounds/about/disco/492231185_1243597314437632_4946434647322291015_n.jpg",
        "/assets/ui/backgrounds/about/disco/492422926_1243597011104329_8144165938488825880_n.jpg",
        "/assets/ui/backgrounds/about/disco/492694337_1243597207770976_179124857974170616_n (1).jpg",
      ],
    },
  ];

  const activeEvent =
    eventTypes.find((event) => event.id === activeTab) || eventTypes[0];

  // Reset extended content visibility when changing tabs
  React.useEffect(() => {
    setIsExtendedVisible(false);
  }, [activeTab]);

  return (
    <TabsContainer>
      <TabList $isRtl={isRtl}>
        {eventTypes.map((event) => (
          <Tab
            key={event.id}
            active={activeTab === event.id}
            onClick={() => setActiveTab(event.id)}
            $isRtl={isRtl}
          >
            {event.label}
          </Tab>
        ))}
      </TabList>

      <TabContent $isRtl={isRtl}>
        <Description $isRtl={isRtl}>{activeEvent.description}</Description>

        {activeTab === "mom" && (
          <>
            <ExpandButton
              $isRtl={isRtl}
              onClick={() => setIsExtendedVisible(!isExtendedVisible)}
            >
              {isExtendedVisible ? t("mom.readLess") : t("mom.readMore")}
            </ExpandButton>

            {isExtendedVisible && (
              <ExtendedContent
                $isRtl={isRtl}
                dangerouslySetInnerHTML={{ __html: t.raw("mom.full") }}
              />
            )}
          </>
        )}

        {activeEvent.images.length > 0 && (
          <ImageGrid>
            {activeEvent.images.map((src, index) => (
              <ImageWrapper
                key={src}
                area={index === 0 ? "main" : `sub${index}`}
              >
                <Image
                  src={src}
                  alt={`${activeEvent.label} event ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
              </ImageWrapper>
            ))}
          </ImageGrid>
        )}
      </TabContent>
    </TabsContainer>
  );
}
