# Facebook Graph API v23.0 Integration

This project includes enhanced API routes to fetch events and photos from Facebook using the latest Graph API v23.0 with advanced features like field expansion, batch requests, and pagination support.

## Setup

### 1. Environment Variables

Add the following environment variables to your `.env` file:

```env
FACEBOOK_PAGE_ID=your_facebook_page_id_here
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token_here
```

### 2. Getting Facebook Credentials

#### Page ID

- Go to your Facebook page
- In the URL, the page ID is the number after `/pages/` or you can find it in the page settings

#### Access Token

- Go to [Facebook Developers](https://developers.facebook.com/)
- Create a new app or use an existing one
- Go to Tools > Graph API Explorer
- Select your app and generate a Page Access Token
- **Important**: Make sure to generate a long-lived token for production use

## API Endpoints

### Events: `/api/facebook/events`

Fetches events from your Facebook page with enhanced field support and pagination.

**Parameters:**

- `limit` (optional): Number of events to fetch (default: 25)
- `after` (optional): Cursor for pagination (next page)
- `before` (optional): Cursor for pagination (previous page)

**Enhanced Fields:**

- Basic info: `id`, `name`, `description`, `start_time`, `end_time`
- Event details: `updated_time`, `timezone`, `is_canceled`, `is_online`, `ticket_uri`
- Attendance: `attending_count`, `interested_count`, `declined_count`, `maybe_count`
- Location: Expanded place data with coordinates
- Cover image: Enhanced cover photo details
- Owner information: Page/user details

**Response Format:**

```json
{
  "data": [
    {
      "id": "event_id",
      "name": "Event Name",
      "start_time": "2024-01-01T20:00:00+0000",
      "end_time": "2024-01-01T23:00:00+0000",
      "description": "Event description",
      "updated_time": "2024-01-01T12:00:00+0000",
      "timezone": "America/New_York",
      "is_canceled": false,
      "is_online": false,
      "ticket_uri": "https://example.com/tickets",
      "attending_count": 45,
      "interested_count": 123,
      "place": {
        "id": "place_id",
        "name": "Venue Name",
        "location": {
          "city": "Tel Aviv",
          "country": "Israel",
          "street": "123 Main St",
          "latitude": 32.0853,
          "longitude": 34.7818,
          "zip": "12345"
        }
      },
      "cover": {
        "id": "cover_id",
        "source": "https://scontent.xx.fbcdn.net/...",
        "offset_x": 0,
        "offset_y": 0
      },
      "owner": {
        "id": "owner_id",
        "name": "Page Name",
        "category": "Musician/Band"
      }
    }
  ],
  "paging": {
    "cursors": {
      "before": "cursor_string",
      "after": "cursor_string"
    },
    "next": "https://graph.facebook.com/v23.0/..."
  },
  "metadata": {
    "total_count": 10,
    "has_next_page": true,
    "has_previous_page": false,
    "api_version": "v23.0",
    "cached_until": "2024-01-01T12:05:00.000Z"
  }
}
```

### Photos: `/api/facebook/photos`

Fetches photos from your Facebook page with enhanced metadata and engagement data.

**Parameters:**

- `limit` (optional): Number of photos to fetch (default: 25)
- `after` (optional): Cursor for pagination (next page)
- `before` (optional): Cursor for pagination (previous page)
- `type` (optional): Type of photos - "uploaded", "tagged", or "profile" (default: "uploaded")

**Enhanced Fields:**

- Basic info: `id`, `created_time`, `updated_time`, `name`, `alt_text`
- Dimensions: `height`, `width`, multiple image sizes
- Album details: Expanded album information with cover photo
- Location: Place data with coordinates
- Engagement: Likes, comments, reactions, and tags counts
- Metadata: Upload details and permissions

**Response Format:**

```json
{
  "data": [
    {
      "id": "photo_id",
      "created_time": "2024-01-01T12:00:00+0000",
      "updated_time": "2024-01-01T12:30:00+0000",
      "name": "Photo caption",
      "alt_text": "Alternative text for accessibility",
      "height": 1080,
      "width": 1920,
      "images": [
        {
          "height": 1080,
          "width": 1920,
          "source": "https://scontent.xx.fbcdn.net/..."
        },
        {
          "height": 720,
          "width": 1280,
          "source": "https://scontent.xx.fbcdn.net/..."
        }
      ],
      "album": {
        "id": "album_id",
        "name": "Album Name",
        "type": "normal",
        "description": "Album description",
        "count": 25,
        "cover_photo": {
          "id": "cover_photo_id",
          "source": "https://scontent.xx.fbcdn.net/..."
        }
      },
      "place": {
        "id": "place_id",
        "name": "Location Name",
        "location": {
          "city": "Tel Aviv",
          "country": "Israel",
          "latitude": 32.0853,
          "longitude": 34.7818
        }
      },
      "likes": {
        "summary": {
          "total_count": 42,
          "can_like": true,
          "has_liked": false
        }
      },
      "comments": {
        "summary": {
          "total_count": 8
        }
      },
      "reactions": {
        "summary": {
          "total_count": 50
        }
      }
    }
  ],
  "paging": {
    "cursors": {
      "before": "cursor_string",
      "after": "cursor_string"
    }
  },
  "metadata": {
    "total_count": 25,
    "has_next_page": true,
    "has_previous_page": false,
    "api_version": "v23.0",
    "photo_type": "uploaded",
    "cached_until": "2024-01-01T12:10:00.000Z"
  }
}
```

### Batch Requests: `/api/facebook/batch`

Efficiently fetch both events and photos in a single API call using Facebook's batch request feature.

**Parameters:**

- `events_limit` (optional): Number of events to fetch (default: 10)
- `photos_limit` (optional): Number of photos to fetch (default: 10)
- `events_after` (optional): Cursor for events pagination
- `photos_after` (optional): Cursor for photos pagination

**Response Format:**

```json
{
  "events": {
    "data": [...],
    "paging": {...},
    "metadata": {...}
  },
  "photos": {
    "data": [...],
    "paging": {...},
    "metadata": {...}
  },
  "batch_info": {
    "requests_made": 2,
    "successful_requests": 2,
    "failed_requests": 0,
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

## Enhanced Utility Functions

### Event Utilities

```typescript
import {
  transformFacebookEvent,
  filterUpcomingEvents,
  filterPastEvents,
  sortEventsByDate,
  isEventToday,
  isEventThisWeek,
  formatLocation,
} from "@/lib/facebook";

// Transform Facebook event to frontend format
const transformedEvent = transformFacebookEvent(facebookEvent);

// Filter events
const upcomingEvents = filterUpcomingEvents(events);
const pastEvents = filterPastEvents(events);

// Sort events by date
const sortedEvents = sortEventsByDate(events);

// Check event timing
const isToday = isEventToday(event);
const isThisWeek = isEventThisWeek(event);

// Format location
const locationString = formatLocation(event.place);
```

### Photo Utilities

```typescript
import {
  transformFacebookPhoto,
  getBestQualityImage,
  getThumbnailImage,
  getMediumImage,
  groupPhotosByAlbum,
  sortPhotosByDate,
} from "@/lib/facebook";

// Transform Facebook photo to frontend format
const transformedPhoto = transformFacebookPhoto(facebookPhoto);

// Get different quality images
const bestQuality = getBestQualityImage(photo.images);
const thumbnail = getThumbnailImage(photo.images);
const medium = getMediumImage(photo.images);

// Group and sort photos
const photosByAlbum = groupPhotosByAlbum(photos);
const sortedPhotos = sortPhotosByDate(photos);
```

## Usage Examples

### Fetching Events with Pagination

```typescript
import { FacebookEventsResponse } from "@/types/facebook";

async function fetchEvents(after?: string) {
  const params = new URLSearchParams({
    limit: "10",
    ...(after && { after }),
  });

  const response = await fetch(`/api/facebook/events?${params}`);
  const data: FacebookEventsResponse = await response.json();

  return data;
}

// Usage
const firstPage = await fetchEvents();
const nextPage = await fetchEvents(firstPage.paging?.cursors.after);
```

### Using Batch Requests

```typescript
async function fetchAllData() {
  const response = await fetch(
    "/api/facebook/batch?events_limit=20&photos_limit=20"
  );
  const data = await response.json();

  const { events, photos, batch_info } = data;

  console.log(
    `Fetched ${events.data.length} events and ${photos.data.length} photos`
  );
  console.log(
    `Batch completed with ${batch_info.successful_requests} successful requests`
  );

  return { events, photos };
}
```

### Enhanced Event Display

```typescript
import { transformFacebookEvent, formatLocation } from "@/lib/facebook";

function EventCard({ event }: { event: FacebookEvent }) {
  const transformed = transformFacebookEvent(event);
  const location = formatLocation(event.place);

  return (
    <div className="event-card">
      <h3>{transformed.title}</h3>
      <p>📅 {transformed.startDate.toLocaleDateString()}</p>
      <p>📍 {location}</p>
      {transformed.isOnline && <span className="badge">🌐 Online Event</span>}
      {transformed.isCanceled && (
        <span className="badge error">❌ Canceled</span>
      )}
      {transformed.ticketUrl && (
        <a
          href={transformed.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          🎫 Get Tickets
        </a>
      )}
      <div className="attendance">
        <span>✅ {transformed.attendingCount || 0} attending</span>
        <span>⭐ {transformed.interestedCount || 0} interested</span>
      </div>
    </div>
  );
}
```

## Graph API v23.0 Features

### Field Expansion

The API now uses field expansion to efficiently fetch related data:

```typescript
// Single request gets event with place details and cover photo
const fields =
  "id,name,start_time,place{name,location{city,country,latitude,longitude}},cover{source}";
```

### Enhanced Error Handling

```typescript
// API responses include detailed Facebook error information
{
  "error": "Facebook API Error",
  "code": 190,
  "type": "OAuthException",
  "message": "Invalid OAuth access token",
  "subcode": 458,
  "details": {...}
}
```

### Pagination Support

All endpoints support cursor-based pagination:

```typescript
// Navigate through pages
const nextPage = await fetch(`/api/facebook/events?after=${cursor}`);
const prevPage = await fetch(`/api/facebook/events?before=${cursor}`);
```

## Performance Optimizations

### Caching Strategy

- **Events**: Cached for 5 minutes (`revalidate: 300`)
- **Photos**: Cached for 10 minutes (`revalidate: 600`)
- **Batch Requests**: Cached for 5 minutes

### Batch Requests

- Combine multiple API calls into single request
- Reduce API rate limit consumption
- Improve response times

### Field Selection

- Only request needed fields to reduce payload size
- Use field expansion for related data
- Optimize for specific use cases

## Rate Limiting & Best Practices

### Facebook API Limits

- Use latest API version (v23.0) for best performance
- Implement proper caching to reduce API calls
- Use batch requests when fetching multiple resources
- Monitor usage in Facebook Developer Console

### Error Handling

1. **Authentication Errors (190)**: Invalid or expired access token
2. **Rate Limiting (613)**: Too many requests
3. **Permissions (100)**: Missing required permissions
4. **Invalid Parameters (400)**: Check field names and values

### Security

1. **Never expose access tokens** to client-side code
2. **Use environment variables** for sensitive data
3. **Validate all API responses** before processing
4. **Implement proper error logging** for debugging
5. **Rotate access tokens regularly** for security

## Troubleshooting

### Common Issues

1. **"Facebook API credentials not configured"**

   - Check your `.env` file
   - Ensure variable names match exactly

2. **"Invalid OAuth access token" (Error 190)**

   - Token may be expired or invalid
   - Generate new long-lived token
   - Check token permissions

3. **"Too many requests" (Error 613)**

   - Implement longer caching intervals
   - Use batch requests
   - Add exponential backoff

4. **Empty response**
   - Check page privacy settings
   - Verify page has events/photos
   - Ensure proper permissions

### API Version Migration

When upgrading to newer Graph API versions:

1. **Check changelog** for breaking changes
2. **Update API version** in all requests
3. **Test field compatibility** with new version
4. **Update type definitions** if needed
5. **Monitor for deprecation warnings**

## Advanced Features

### Webhooks (Future Enhancement)

Set up real-time updates for:

- New events created
- Event updates
- Photo uploads
- Page updates

### Custom Fields

Add custom fields to requests:

```typescript
const customFields = "id,name,custom_field,nested{sub_field}";
const url = `https://graph.facebook.com/v23.0/${pageId}/events?fields=${customFields}`;
```

### Metadata Exploration

Discover available fields:

```typescript
const metadataUrl = `https://graph.facebook.com/v23.0/${pageId}/events?metadata=1`;
// Returns all available fields and their descriptions
```
