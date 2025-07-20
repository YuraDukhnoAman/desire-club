# Google Reviews Integration Setup

This document explains how to set up Google Business Profile Reviews integration for the Desire Club website.

## Environment Variables Required

Add the following environment variables to your `.env.local` file:

```bash
# Google Business Profile API Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REFRESH_TOKEN=your_google_refresh_token_here
# Optional: If you know your location ID, you can set it here to avoid API calls
# GOOGLE_LOCATION_ID=your_location_id_here
```

## How to Obtain Credentials

1. **Google Cloud Console Setup**:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the "Google My Business API" (now called "Business Profile API")
   - Create OAuth 2.0 credentials

2. **Get Refresh Token**:

   - Use Postman or similar tool to get the refresh token
   - Follow Google's OAuth 2.0 flow for server-to-server applications
   - The refresh token will be used to get access tokens automatically

3. **Location ID**:
   - The system will automatically fetch your location ID if not provided
   - You can also manually set it in the environment variables

## API Endpoints

- `GET /api/google-reviews` - Fetches reviews from Google Business Profile
- Returns transformed review data with author, rating, comment, and date

## Components

- `GoogleReviews.tsx` - Client component that displays reviews
- Can be reused in other pages (homepage, about page, etc.)
- Responsive design with mobile-first approach
- Shows average rating and total review count

## Features

- ✅ Automatic token refresh
- ✅ Error handling and loading states
- ✅ Responsive design
- ✅ Star ratings display
- ✅ Date formatting
- ✅ Comment truncation for long reviews
- ✅ Modular component design
- ✅ TypeScript support

## Usage

The `GoogleReviews` component can be imported and used anywhere in the app:

```tsx
import { GoogleReviews } from "@/components/ui/GoogleReviews";

// Use in any page or component
<GoogleReviews />;
```
