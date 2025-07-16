# Desire Club - Music Club Website

A multilingual MVP website for Desire Club, a music nightclub located in Tel Aviv.

## Features

- 🌐 Multilingual support (English, Hebrew, Russian)
- 🎵 Event listings and details
- 📱 Responsive design
- 🌙 Dark mode
- 📸 Image gallery
- 🎫 Table booking system
- 📍 Location information

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Styled Components
- next-intl for internationalization
- Storybook for component development

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/
├── messages/          # Translation files
├── public/           # Static assets
└── src/
    ├── app/          # Next.js app router pages
    ├── components/   # React components
    ├── data/        # Static data files
    ├── lib/         # Utility functions
    ├── styles/      # Global styles and theme
    └── types/       # TypeScript type definitions
```

## Internationalization

The website supports three languages:

- English (en)
- Hebrew (he)
- Russian (ru)

Translation files are located in the `messages/` directory.

## Components

Components are organized into the following categories:

- `layout/` - Layout components (Header, Footer)
- `sections/` - Page sections (Hero, Events)
- `ui/` - Reusable UI components
- `providers/` - Context providers

## Styling

The project uses Styled Components with a custom theme. The theme includes:

- Color schemes
- Typography
- Spacing
- Breakpoints
- Animations

## Development

### Running Tests

```bash
npm test
```

### Running Storybook

```bash
npm run storybook
```

### Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

**Desire Club**

- Address: Carlebach 25, Tel Aviv
- Instagram: @desire_club_tlv
- Phone: +972-3-123-4567
