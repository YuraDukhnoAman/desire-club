import {
  FacebookEvent,
  FacebookPhoto,
  TransformedEvent,
  TransformedPhoto,
} from "@/types/facebook";

/**
 * Transform Facebook event data into frontend-ready format
 */
export function transformFacebookEvent(event: FacebookEvent): TransformedEvent {
  return {
    id: event.id,
    title: event.name,
    startDate: new Date(event.start_time),
    endDate: event.end_time ? new Date(event.end_time) : undefined,
    description: event.description,
    location: event.place?.name,
    coverImage: event.cover?.source,
    facebookUrl: `https://www.facebook.com/events/${event.id}`,
  };
}

/**
 * Transform Facebook photo data into frontend-ready format
 */
export function transformFacebookPhoto(photo: FacebookPhoto): TransformedPhoto {
  return {
    id: photo.id,
    createdAt: new Date(photo.created_time),
    caption: photo.name,
    images: photo.images.map((img) => ({
      height: img.height,
      width: img.width,
      url: img.source,
    })),
    albumName: photo.album?.name,
    facebookUrl: `https://www.facebook.com/photo/?fbid=${photo.id}`,
  };
}

/**
 * Get the best quality image from Facebook photo images array
 */
export function getBestQualityImage(
  images: Array<{ height: number; width: number; source: string }>
) {
  if (!images || images.length === 0) return null;

  // Sort by total pixels (width * height) in descending order
  const sortedImages = images.sort(
    (a, b) => b.width * b.height - a.width * a.height
  );
  return sortedImages[0];
}

/**
 * Get thumbnail image from Facebook photo images array
 */
export function getThumbnailImage(
  images: Array<{ height: number; width: number; source: string }>
) {
  if (!images || images.length === 0) return null;

  // Sort by total pixels (width * height) in ascending order to get smallest
  const sortedImages = images.sort(
    (a, b) => a.width * a.height - b.width * b.height
  );
  return sortedImages[0];
}

/**
 * Filter upcoming events (events that haven't ended yet)
 */
export function filterUpcomingEvents(events: FacebookEvent[]): FacebookEvent[] {
  const now = new Date();
  return events.filter((event) => {
    const eventDate = event.end_time
      ? new Date(event.end_time)
      : new Date(event.start_time);
    return eventDate > now;
  });
}

/**
 * Sort events by start time (earliest first)
 */
export function sortEventsByDate(events: FacebookEvent[]): FacebookEvent[] {
  return events.sort(
    (a, b) =>
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );
}

/**
 * Sort photos by creation time (newest first)
 */
export function sortPhotosByDate(photos: FacebookPhoto[]): FacebookPhoto[] {
  return photos.sort(
    (a, b) =>
      new Date(b.created_time).getTime() - new Date(a.created_time).getTime()
  );
}
