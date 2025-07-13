import {
  FacebookEvent,
  FacebookPhoto,
  FacebookAlbum,
  TransformedEvent,
  TransformedPhoto,
  TransformedAlbum,
  FacebookPlace,
  BatchRequestItem,
  BatchResponse,
} from "@/types/facebook";

/**
 * Transform Facebook album data into frontend-ready format
 */
export function transformFacebookAlbum(album: FacebookAlbum): TransformedAlbum {
  const coverImage =
    album.cover_photo?.images?.find((img) => img.width >= 600)?.source ||
    album.cover_photo?.source ||
    album.cover_photo?.picture;

  return {
    id: album.id,
    name: album.name,
    description: album.description,
    photoCount: album.count || 0,
    createdAt: new Date(album.created_time || Date.now()),
    updatedAt: album.updated_time ? new Date(album.updated_time) : undefined,
    coverImage,
    coverImageSizes:
      album.cover_photo?.images?.map((img) => ({
        width: img.width,
        height: img.height,
        url: img.source,
      })) || [],
    type: album.type || "normal",
    privacy: album.privacy,
    canUpload: album.can_upload || false,
    facebookUrl:
      album.link || `https://www.facebook.com/album.php?fbid=${album.id}`,
    ownerName: album.from?.name,
    ownerId: album.from?.id,
    place: album.place
      ? {
          name: album.place.name,
          location: album.place.location
            ? {
                city: album.place.location.city,
                country: album.place.location.country,
                coordinates: {
                  latitude: album.place.location.latitude,
                  longitude: album.place.location.longitude,
                },
              }
            : undefined,
        }
      : undefined,
  };
}

/**
 * Transform Facebook event data into frontend-ready format
 */
export function transformFacebookEvent(event: FacebookEvent): TransformedEvent {
  const locationDetails = event.place?.location
    ? {
        name: event.place.name,
        address: event.place.location.street,
        city: event.place.location.city,
        country: event.place.location.country,
        coordinates: {
          latitude: event.place.location.latitude,
          longitude: event.place.location.longitude,
        },
      }
    : undefined;

  return {
    id: event.id,
    title: event.name,
    startDate: new Date(event.start_time),
    endDate: event.end_time ? new Date(event.end_time) : undefined,
    description: event.description,
    location: event.place?.name,
    locationDetails,
    coverImage: event.cover?.source,
    isOnline: event.is_online,
    isCanceled: event.is_canceled,
    ticketUrl: event.ticket_uri,
    attendingCount: event.attending_count,
    interestedCount: event.interested_count,
    timezone: event.timezone,
    facebookUrl: `https://www.facebook.com/events/${event.id}`,
  };
}

/**
 * Transform Facebook photo data into frontend-ready format
 */
export function transformFacebookPhoto(photo: FacebookPhoto): TransformedPhoto {
  const locationDetails = photo.place?.location
    ? {
        name: photo.place.name,
        address: photo.place.location.street,
        city: photo.place.location.city,
        country: photo.place.location.country,
        coordinates: {
          latitude: photo.place.location.latitude,
          longitude: photo.place.location.longitude,
        },
      }
    : undefined;

  return {
    id: photo.id,
    createdAt: new Date(photo.created_time),
    updatedAt: photo.updated_time ? new Date(photo.updated_time) : undefined,
    caption: photo.name,
    altText: photo.alt_text,
    dimensions:
      photo.height && photo.width
        ? { height: photo.height, width: photo.width }
        : undefined,
    images: photo.images.map((img) => ({
      height: img.height,
      width: img.width,
      url: img.source,
    })),
    albumName: photo.album?.name,
    albumId: photo.album?.id,
    location: photo.place?.name,
    locationDetails,
    engagement: {
      likes: photo.likes?.summary?.total_count || 0,
      comments: photo.comments?.summary?.total_count || 0,
      reactions: photo.reactions?.summary?.total_count || 0,
      tags: photo.tags?.summary?.total_count || 0,
    },
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
 * Get medium size image from Facebook photo images array
 */
export function getMediumImage(
  images: Array<{ height: number; width: number; source: string }>
) {
  if (!images || images.length === 0) return null;

  // Target around 720p (518,400 pixels)
  const targetPixels = 518400;

  const sortedImages = images.sort((a, b) => {
    const aPixels = a.width * a.height;
    const bPixels = b.width * b.height;
    const aDiff = Math.abs(aPixels - targetPixels);
    const bDiff = Math.abs(bPixels - targetPixels);
    return aDiff - bDiff;
  });

  return sortedImages[0];
}

/**
 * Filter upcoming events (events that haven't ended yet)
 */
export function filterUpcomingEvents(events: FacebookEvent[]): FacebookEvent[] {
  const now = new Date();
  return events.filter((event) => {
    if (event.is_canceled) return false;

    const eventDate = event.end_time
      ? new Date(event.end_time)
      : new Date(event.start_time);
    return eventDate > now;
  });
}

/**
 * Filter past events
 */
export function filterPastEvents(events: FacebookEvent[]): FacebookEvent[] {
  const now = new Date();
  return events.filter((event) => {
    const eventDate = event.end_time
      ? new Date(event.end_time)
      : new Date(event.start_time);
    return eventDate <= now;
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

/**
 * Group photos by album
 */
export function groupPhotosByAlbum(
  photos: FacebookPhoto[]
): Record<string, FacebookPhoto[]> {
  return photos.reduce((acc, photo) => {
    const albumId = photo.album?.id || "no-album";
    if (!acc[albumId]) {
      acc[albumId] = [];
    }
    acc[albumId].push(photo);
    return acc;
  }, {} as Record<string, FacebookPhoto[]>);
}

/**
 * Create batch request for Facebook Graph API
 */
export function createBatchRequest(
  items: BatchRequestItem[],
  accessToken: string,
  includeHeaders = false
): string {
  const batchData = items.map((item) => ({
    method: item.method,
    relative_url: item.relative_url,
    ...(item.body && { body: item.body }),
    ...(item.headers && { headers: item.headers }),
  }));

  const params = new URLSearchParams({
    access_token: accessToken,
    batch: JSON.stringify(batchData),
    ...(includeHeaders && { include_headers: "true" }),
  });

  return `https://graph.facebook.com/v23.0/?${params.toString()}`;
}

/**
 * Parse batch response from Facebook Graph API
 */
export function parseBatchResponse(response: BatchResponse[]): any[] {
  return response.map((item) => {
    if (item.code === 200) {
      try {
        return JSON.parse(item.body);
      } catch (error) {
        console.error("Failed to parse batch response item:", error);
        return null;
      }
    } else {
      console.error(`Batch request failed with code ${item.code}:`, item.body);
      return null;
    }
  });
}

/**
 * Build Facebook Graph API URL with pagination
 */
export function buildFacebookUrl(
  version: string,
  path: string,
  params: Record<string, string | number | boolean | undefined>
): string {
  const cleanParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>);

  const searchParams = new URLSearchParams(cleanParams);
  return `https://graph.facebook.com/${version}/${path}?${searchParams.toString()}`;
}

/**
 * Format location string from Facebook place data
 */
export function formatLocation(place?: FacebookPlace): string {
  if (!place) return "";

  if (!place.location) return place.name;

  const parts = [place.name];

  if (place.location.street) parts.push(place.location.street);
  if (place.location.city) parts.push(place.location.city);
  if (place.location.state) parts.push(place.location.state);
  if (place.location.country) parts.push(place.location.country);

  return parts.join(", ");
}

/**
 * Check if an event is happening today
 */
export function isEventToday(event: FacebookEvent): boolean {
  const today = new Date();
  const eventStart = new Date(event.start_time);
  const eventEnd = event.end_time ? new Date(event.end_time) : eventStart;

  return (
    eventStart.toDateString() === today.toDateString() ||
    eventEnd.toDateString() === today.toDateString() ||
    (eventStart < today && eventEnd > today)
  );
}

/**
 * Check if an event is happening this week
 */
export function isEventThisWeek(event: FacebookEvent): boolean {
  const now = new Date();
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const eventStart = new Date(event.start_time);
  const eventEnd = event.end_time ? new Date(event.end_time) : eventStart;

  return (
    (eventStart >= weekStart && eventStart <= weekEnd) ||
    (eventEnd >= weekStart && eventEnd <= weekEnd) ||
    (eventStart < weekStart && eventEnd > weekEnd)
  );
}

/**
 * Filter albums by date range
 */
export function filterAlbumsByDateRange(
  albums: TransformedAlbum[],
  startDate: Date,
  endDate: Date
): TransformedAlbum[] {
  return albums.filter(
    (album) => album.createdAt >= startDate && album.createdAt <= endDate
  );
}

/**
 * Filter albums by minimum photo count
 */
export function filterAlbumsByPhotoCount(
  albums: TransformedAlbum[],
  minCount: number
): TransformedAlbum[] {
  return albums.filter((album) => album.photoCount >= minCount);
}

/**
 * Sort albums by creation date (newest first)
 */
export function sortAlbumsByDate(
  albums: TransformedAlbum[],
  ascending = false
): TransformedAlbum[] {
  return [...albums].sort((a, b) => {
    const timeA = a.createdAt.getTime();
    const timeB = b.createdAt.getTime();
    return ascending ? timeA - timeB : timeB - timeA;
  });
}

/**
 * Sort albums by photo count (most photos first)
 */
export function sortAlbumsByPhotoCount(
  albums: TransformedAlbum[],
  ascending = false
): TransformedAlbum[] {
  return [...albums].sort((a, b) => {
    return ascending
      ? a.photoCount - b.photoCount
      : b.photoCount - a.photoCount;
  });
}

/**
 * Get best cover image for an album based on desired size
 */
export function getBestAlbumCoverImage(
  album: TransformedAlbum,
  targetWidth = 400
): string | undefined {
  if (!album.coverImageSizes.length) {
    return album.coverImage;
  }

  // Find the image size closest to target width but not smaller
  const suitableImage = album.coverImageSizes
    .filter((img) => img.width >= targetWidth)
    .sort((a, b) => a.width - b.width)[0];

  // If no suitable image found, use the largest available
  if (!suitableImage) {
    const largestImage = album.coverImageSizes.sort(
      (a, b) => b.width - a.width
    )[0];
    return largestImage?.url;
  }

  return suitableImage.url;
}
