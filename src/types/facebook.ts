// Facebook Graph API Response Types

export interface FacebookEvent {
  id: string;
  name: string;
  start_time: string;
  end_time?: string;
  description?: string;
  place?: {
    name: string;
    location?: {
      city: string;
      country: string;
      latitude: number;
      longitude: number;
      street: string;
      zip: string;
    };
  };
  cover?: {
    id: string;
    offset_x: number;
    offset_y: number;
    source: string;
  };
}

export interface FacebookEventsResponse {
  data: FacebookEvent[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
    previous?: string;
  };
}

export interface FacebookPhoto {
  id: string;
  created_time: string;
  name?: string;
  images: Array<{
    height: number;
    width: number;
    source: string;
  }>;
  album?: {
    id: string;
    name: string;
  };
}

export interface FacebookPhotosResponse {
  data: FacebookPhoto[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
    previous?: string;
  };
}

// Transformed types for frontend use
export interface TransformedEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  location?: string;
  coverImage?: string;
  facebookUrl: string;
}

export interface TransformedPhoto {
  id: string;
  createdAt: Date;
  caption?: string;
  images: Array<{
    height: number;
    width: number;
    url: string;
  }>;
  albumName?: string;
  facebookUrl: string;
}
