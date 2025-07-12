# Facebook API Integration

This project includes API routes to fetch events and photos from Facebook using the Graph API.

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

Fetches upcoming events from your Facebook page.

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
      "place": {
        "name": "Venue Name",
        "location": {
          "city": "Tel Aviv",
          "country": "Israel",
          "street": "123 Main St"
        }
      },
      "cover": {
        "source": "https://scontent.xx.fbcdn.net/..."
      }
    }
  ]
}
```

### Photos: `/api/facebook/photos`

Fetches uploaded photos from your Facebook page.

**Response Format:**

```json
{
  "data": [
    {
      "id": "photo_id",
      "created_time": "2024-01-01T12:00:00+0000",
      "name": "Photo caption",
      "images": [
        {
          "height": 720,
          "width": 720,
          "source": "https://scontent.xx.fbcdn.net/..."
        }
      ],
      "album": {
        "id": "album_id",
        "name": "Album Name"
      }
    }
  ]
}
```

## Usage in Components

### Fetching Events

```tsx
import { FacebookEventsResponse } from "@/types/facebook";
import { transformFacebookEvent, filterUpcomingEvents } from "@/lib/facebook";

export default function EventsPage() {
  const [events, setEvents] = useState<FacebookEventsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/facebook/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (!events) return <div>Failed to load events</div>;

  // Filter and transform events
  const upcomingEvents = filterUpcomingEvents(events.data);
  const transformedEvents = upcomingEvents.map(transformFacebookEvent);

  return (
    <div>
      {transformedEvents.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.startDate.toLocaleDateString()}</p>
          <p>{event.location}</p>
        </div>
      ))}
    </div>
  );
}
```

### Fetching Photos

```tsx
import { FacebookPhotosResponse } from "@/types/facebook";
import { transformFacebookPhoto, getBestQualityImage } from "@/lib/facebook";

export default function GalleryPage() {
  const [photos, setPhotos] = useState<FacebookPhotosResponse | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch("/api/facebook/photos");
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    }

    fetchPhotos();
  }, []);

  if (!photos) return <div>Loading photos...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.data.map((photo) => {
        const bestImage = getBestQualityImage(photo.images);
        return (
          <div key={photo.id}>
            {bestImage && (
              <img
                src={bestImage.source}
                alt={photo.name || "Facebook photo"}
                className="w-full h-auto"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
```

## Caching Strategy

### Server-Side Caching (ISR)

- **Events**: Cached for 5 minutes (`revalidate: 300`)
- **Photos**: Cached for 10 minutes (`revalidate: 600`)

### Client-Side Caching

- **Events**: `Cache-Control: public, s-maxage=300, stale-while-revalidate=600`
- **Photos**: `Cache-Control: public, s-maxage=600, stale-while-revalidate=1200`

### Benefits

- Reduces Facebook API calls
- Improves performance
- Handles rate limiting gracefully
- Provides stale content while revalidating

## Error Handling

The API routes include comprehensive error handling:

1. **Missing Credentials**: Returns 500 error if environment variables are not set
2. **Facebook API Errors**: Returns the original error status with details
3. **Network Errors**: Returns 500 error with generic message
4. **Detailed Logging**: All errors are logged to the console

## Rate Limiting

Facebook Graph API has rate limits. The caching strategy helps mitigate this:

- Use long-lived access tokens
- Cache responses appropriately
- Monitor API usage in Facebook Developer Console
- Consider implementing exponential backoff for retries

## Security Considerations

1. **Never expose access tokens** to the client-side
2. **Use environment variables** for sensitive data
3. **Validate** all incoming data from Facebook API
4. **Monitor** API usage for suspicious activity
5. **Rotate** access tokens regularly

## Troubleshooting

### Common Issues

1. **"Facebook API credentials not configured"**

   - Check your `.env` file
   - Ensure variable names match exactly

2. **"Failed to fetch events/photos from Facebook API"**

   - Verify your access token is valid
   - Check if the token has the required permissions
   - Ensure the page ID is correct

3. **Empty response**
   - Your page might not have any events/photos
   - Check Facebook page privacy settings
   - Verify the page is published

### Testing

You can test the API routes directly:

```bash
# Test events endpoint
curl http://localhost:3000/api/facebook/events

# Test photos endpoint
curl http://localhost:3000/api/facebook/photos
```
