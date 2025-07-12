# Updating Events Guide

This guide explains how to update and manage events for the Desire Club website.

## Event Data Structure

Events are stored in `src/data/events.json`. Each event has the following structure:

```json
{
  "id": "event-1", // Unique identifier for the event
  "translations": {
    "en": {
      // English translations
      "title": "Event Title",
      "description": "Event description"
    },
    "ru": {
      // Russian translations
      "title": "Название события",
      "description": "Описание события"
    },
    "he": {
      // Hebrew translations
      "title": "כותרת האירוע",
      "description": "תיאור האירוע"
    }
  },
  "date": "2024-01-15", // Event date in YYYY-MM-DD format
  "time": "22:00", // Event time in HH:MM format (24-hour)
  "type": "party", // Event type: "party", "live", or "standup"
  "price": 80, // Price in ILS (use 0 for free events)
  "image": "https://...", // Event image URL (800x600 recommended)
  "bookingUrl": "https://..." // Booking link
}
```

## Adding a New Event

1. Open `src/data/events.json`
2. Add a new event object at the beginning of the array for chronological order
3. Ensure you provide:
   - A unique `id` (use format "event-{number}")
   - All three language translations (en, ru, he)
   - Valid date and time
   - Correct event type
   - Price in ILS
   - High-quality image (800x600)
   - Valid booking URL

## Editing Existing Events

1. Find the event by its `id` in `src/data/events.json`
2. Update the required fields
3. Maintain the JSON structure
4. Ensure all translations are present

## Image Guidelines

- Use high-quality images (800x600 pixels)
- Optimize images for web
- Host images on a CDN or image hosting service
- Use HTTPS URLs only
- Test images in all screen sizes

## Event Types

Available event types:

- `party`: Electronic music events, DJ nights
- `live`: Live music performances, concerts
- `standup`: Comedy shows, stand-up performances

## Best Practices

1. **Translations**

   - Provide all three languages
   - Keep descriptions concise but informative
   - Maintain consistent tone across languages

2. **Dates and Times**

   - Use 24-hour format for time
   - Use YYYY-MM-DD format for dates
   - Events should be in chronological order

3. **Testing**
   - Validate JSON syntax after changes
   - Check all language versions
   - Verify image loading
   - Test booking links

## Common Issues

1. **JSON Syntax**

   - Missing commas between events
   - Incorrect quotation marks
   - Missing closing brackets

2. **Translations**

   - Missing language versions
   - Inconsistent content across languages
   - RTL issues in Hebrew text

3. **Images**
   - Broken image links
   - Wrong image dimensions
   - Non-HTTPS URLs

## Need Help?

If you encounter any issues or need assistance:

1. Check JSON syntax at [JSONLint](https://jsonlint.com/)
2. Use the project's issue tracker
3. Contact the development team
