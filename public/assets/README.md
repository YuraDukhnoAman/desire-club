# Assets Directory Structure

This directory contains all the static assets for the Desire Music Club website. The assets are organized into two main categories: UI assets and content images.

## Directory Structure

```
public/assets/
├── images/          # Content images
└── ui/             # UI-related assets
    ├── backgrounds/ # Background images
    ├── decorative/ # Decorative elements
    ├── icons/      # All icons
    │   ├── common/  # General purpose icons
    │   ├── nav/     # Navigation icons
    │   └── social/  # Social media icons
    ├── logos/      # Logo variations
    └── patterns/   # Repeatable patterns
```

## Usage Guidelines

### 1. UI Assets (`/assets/ui/`)

All interface-related graphics, icons, and decorative elements.

#### Backgrounds (`/ui/backgrounds/`)

- Hero section backgrounds
- Section backgrounds
- Modal backgrounds
- Gradient overlays
- **Format**: Prefer `.jpg` for photos, `.png` for graphics with transparency
- **Naming**: `section-name-bg.jpg`, `modal-bg.png`

#### Decorative (`/ui/decorative/`)

- Corner elements
- Dividers
- Borders
- Glowing effects
- **Format**: Prefer `.svg` or `.png` with transparency
- **Naming**: `corner-element.svg`, `divider-glow.png`

#### Icons (`/ui/icons/`)

- **Common** (`/icons/common/`): Universal icons (arrows, close, search)
- **Navigation** (`/icons/nav/`): Menu items, indicators
- **Social** (`/icons/social/`): Social media platforms
- **Format**: Always use `.svg` for scalability
- **Naming**: `icon-name.svg` (e.g., `arrow-right.svg`, `menu.svg`)

#### Logos (`/ui/logos/`)

- Full logo
- Symbol only
- Dark/light variations
- **Format**: Primarily `.svg`, with `.png` fallbacks if needed
- **Naming**: `logo-[variant].svg` (e.g., `logo-full.svg`, `logo-symbol.svg`)

#### Patterns (`/ui/patterns/`)

- Background patterns
- Texture overlays
- Grid patterns
- **Format**: `.svg` for geometric patterns, `.png` for complex textures
- **Naming**: `pattern-[type].svg` (e.g., `pattern-grid.svg`)

### 2. Content Images (`/assets/images/`)

Actual content-related images like event photos, gallery images, etc.

- Event photos
- Gallery images
- Artist photos
- Venue photos
- **Format**: `.jpg` for photos, `.png` for images requiring transparency
- **Naming**: Use descriptive names with date if relevant (e.g., `event-nye-2024.jpg`)

## Best Practices

1. **File Formats**

   - Use SVG for icons, logos, and simple graphics
   - Use JPG for photographs and complex images
   - Use PNG when transparency is needed
   - Optimize all images before committing

2. **Naming Conventions**

   - Use lowercase letters
   - Use hyphens for spaces
   - Be descriptive but concise
   - Include dimensions if relevant (e.g., `hero-bg-1920x1080.jpg`)

3. **Image Optimization**

   - Compress JPG and PNG files
   - Optimize SVGs (remove unnecessary metadata)
   - Consider providing multiple sizes for responsive images
   - Keep file sizes under 200KB when possible

4. **Usage in Code**

```tsx
// Icons
<img src="/assets/ui/icons/nav/menu.svg" alt="Menu" />

// Backgrounds
<div style={{ backgroundImage: "url('/assets/ui/backgrounds/hero.jpg')" }} />

// Logo
<img src="/assets/ui/logos/logo-light.svg" alt="Desire" />
```

5. **Accessibility**
   - Always include meaningful alt text for images
   - Use appropriate ARIA labels for decorative elements
   - Consider reduced motion preferences for animated elements

## Adding New Assets

1. Choose the appropriate directory based on the asset type
2. Follow the naming conventions
3. Optimize the asset before adding
4. Update this README if adding new categories or conventions

## Maintenance

- Regularly review and remove unused assets
- Keep track of asset versions and updates
- Document any special requirements or dependencies
- Consider implementing a version control strategy for frequently updated assets
