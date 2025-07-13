// Facebook Graph API v23.0 Response Types

export interface FacebookPlace {
  id: string;
  name: string;
  location?: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    street: string;
    zip: string;
    state?: string;
  };
}

export interface FacebookCover {
  id: string;
  offset_x: number;
  offset_y: number;
  source: string;
}

export interface FacebookOwner {
  id: string;
  name: string;
  category?: string;
}

export interface FacebookEvent {
  id: string;
  name: string;
  start_time: string;
  end_time?: string;
  description?: string;
  updated_time?: string;
  timezone?: string;
  event_times?: Array<{
    start_time: string;
    end_time?: string;
  }>;
  is_canceled?: boolean;
  is_online?: boolean;
  is_page_owned?: boolean;
  ticket_uri?: string;
  attending_count?: number;
  declined_count?: number;
  interested_count?: number;
  maybe_count?: number;
  noreply_count?: number;
  place?: FacebookPlace;
  cover?: FacebookCover;
  owner?: FacebookOwner;
}

export interface FacebookAlbum {
  id: string;
  name: string;
  type?: string;
  description?: string;
  created_time?: string;
  updated_time?: string;
  count?: number;
  cover_photo?: {
    id: string;
    source: string;
  };
}

export interface FacebookSummary {
  total_count: number;
  can_like?: boolean;
  has_liked?: boolean;
}

export interface FacebookPhoto {
  id: string;
  created_time: string;
  updated_time?: string;
  name?: string;
  alt_text?: string;
  height?: number;
  width?: number;
  backdated_time?: string;
  can_delete?: boolean;
  can_tag?: boolean;
  link?: string;
  place?: FacebookPlace;
  images: Array<{
    height: number;
    width: number;
    source: string;
  }>;
  album?: FacebookAlbum;
  from?: FacebookOwner;
  likes?: {
    summary: FacebookSummary;
  };
  comments?: {
    summary: FacebookSummary;
  };
  reactions?: {
    summary: FacebookSummary;
  };
  tags?: {
    summary: FacebookSummary;
  };
}

export interface FacebookPaging {
  cursors: {
    before: string;
    after: string;
  };
  next?: string;
  previous?: string;
}

export interface FacebookResponseMetadata {
  total_count: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  api_version: string;
  cached_until: string;
  photo_type?: string;
}

export interface FacebookEventsResponse {
  data: FacebookEvent[];
  paging?: FacebookPaging;
  metadata?: FacebookResponseMetadata;
}

export interface FacebookPhotosResponse {
  data: FacebookPhoto[];
  paging?: FacebookPaging;
  metadata?: FacebookResponseMetadata;
}

// Enhanced API Error Response
export interface FacebookApiError {
  error: string;
  code?: number;
  type?: string;
  message?: string;
  subcode?: number;
  details?: any;
}

// Transformed types for frontend use
export interface TransformedEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  location?: string;
  locationDetails?: {
    name: string;
    address?: string;
    city?: string;
    country?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  coverImage?: string;
  isOnline?: boolean;
  isCanceled?: boolean;
  ticketUrl?: string;
  attendingCount?: number;
  interestedCount?: number;
  timezone?: string;
  facebookUrl: string;
}

export interface TransformedPhoto {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  caption?: string;
  altText?: string;
  dimensions?: {
    height: number;
    width: number;
  };
  images: Array<{
    height: number;
    width: number;
    url: string;
  }>;
  albumName?: string;
  albumId?: string;
  location?: string;
  locationDetails?: {
    name: string;
    address?: string;
    city?: string;
    country?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  engagement?: {
    likes: number;
    comments: number;
    reactions: number;
    tags: number;
  };
  facebookUrl: string;
}

// Batch Request Types
export interface BatchRequestItem {
  method: "GET" | "POST" | "PUT" | "DELETE";
  relative_url: string;
  body?: string;
  headers?: Record<string, string>;
}

export interface BatchResponse {
  code: number;
  headers: Array<{ name: string; value: string }>;
  body: string;
}

// Webhook Types
export interface WebhookEntry {
  id: string;
  time: number;
  changes: Array<{
    field: string;
    value: any;
  }>;
}

export interface WebhookPayload {
  object: string;
  entry: WebhookEntry[];
}
