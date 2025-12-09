# Accessibility Testing Guide

This guide outlines how to test the Desire Music Club website for accessibility compliance with Israeli Standard 5568 (WCAG 2.0 Level AA).

## Overview

The website has been designed to meet Israeli Standard 5568, which is based on WCAG 2.0 Level AA. This includes full support for:

- Hebrew RTL (right-to-left) layout
- Keyboard navigation
- Screen reader compatibility
- Proper color contrast
- Semantic HTML structure
- ARIA labels and live regions

## Automated Testing

### Development Mode

When running the development server (`npm run dev`), axe-core automatically checks for accessibility issues and logs warnings to the browser console.

```bash
npm run dev
# Open browser console to see accessibility warnings
```

### Manual Axe Core Testing

You can also use the Axe DevTools browser extension:

1. Install [Axe DevTools Extension](https://www.deque.com/axe/browser-extensions/)
2. Open your site in the browser
3. Open DevTools and navigate to the "Axe DevTools" tab
4. Click "Scan All of My Page"

## Keyboard Navigation Testing

Test that all interactive elements are accessible via keyboard:

### Basic Navigation
- `Tab` - Move to next interactive element
- `Shift + Tab` - Move to previous interactive element
- `Enter` - Activate links and buttons
- `Space` - Activate buttons and toggle controls
- `Escape` - Close modals and menus
- `Arrow keys` - Navigate within components (like menus)

### Testing Checklist

- [ ] **Skip to Content Link**: Press `Tab` once on page load - should see "Skip to main content" link
- [ ] **Main Navigation**: Navigate through all menu items using `Tab`
- [ ] **Mobile Menu**: Open mobile menu with `Enter`, navigate items with `Tab`
- [ ] **Event Filters**: Navigate filter buttons with `Tab`, activate with `Enter` or `Space`
- [ ] **Forms**: Navigate all form fields with `Tab`, check that labels are announced
- [ ] **Social Links**: Navigate to all social media icons and verify focus indicator
- [ ] **Language Switcher**: Navigate and change languages using keyboard
- [ ] **Focus Indicators**: All focused elements have visible outline (2px primary color)

## Screen Reader Testing

### Recommended Screen Readers

- **Windows**: [NVDA](https://www.nvaccess.org/) (free) or JAWS
- **macOS**: VoiceOver (built-in)
- **Linux**: Orca

### macOS VoiceOver Quick Start

1. Enable VoiceOver: `Cmd + F5`
2. Navigate: `Control + Option + Arrow keys`
3. Interact with element: `Control + Option + Space`
4. Read from current position: `Control + Option + A`

### Testing Checklist

- [ ] **Page Structure**: Screen reader announces landmarks (banner, main, contentinfo)
- [ ] **Headings**: Proper heading hierarchy (h1, h2, h3) is announced
- [ ] **Navigation**: Nav items are announced with "current page" for active page
- [ ] **Images**: All images have descriptive alt text or are marked decorative
- [ ] **Forms**: All form fields have associated labels that are announced
- [ ] **Form Errors**: Validation errors are announced immediately
- [ ] **Live Regions**: Loading states and dynamic content changes are announced
- [ ] **Buttons**: Button purpose is clear from label or aria-label
- [ ] **Links**: Link destination is clear from text or aria-label
- [ ] **Language**: Page language is announced correctly (English, Russian, Hebrew)

## RTL (Hebrew) Testing

### Visual Testing

1. Switch to Hebrew locale
2. Verify:
   - [ ] Text flows from right to left
   - [ ] Layout mirrors correctly (nav items, forms, etc.)
   - [ ] Icons and images are positioned correctly
   - [ ] Margins and padding are flipped appropriately
   - [ ] Focus indicators appear correctly in RTL

### Screen Reader Testing in Hebrew

1. Use NVDA (Windows) or VoiceOver (macOS) with Hebrew voice
2. Verify content is read in correct order
3. Check that navigation makes sense in RTL context

## Color Contrast Testing

### Automated Tools

1. Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
2. Or use browser extension: [WCAG Color Contrast Checker](https://chrome.google.com/webstore/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf)

### Manual Testing

Test against WCAG 2.0 Level AA requirements:
- Normal text: minimum 4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): minimum 3:1 contrast ratio
- UI components and graphics: minimum 3:1 contrast ratio

## Reduced Motion Testing

Test that animations respect user preferences:

1. Enable reduced motion in OS:
   - **macOS**: System Preferences → Accessibility → Display → Reduce motion
   - **Windows**: Settings → Ease of Access → Display → Show animations

2. Verify:
   - [ ] Page loads without animations
   - [ ] Transitions are instant or very brief
   - [ ] Scrolling behavior is immediate

## Touch Target Size Testing

All interactive elements should be at least 44x44 pixels:

1. Use browser DevTools to measure elements
2. Check on mobile devices
3. Verify spacing between adjacent interactive elements

## WCAG 2.0 Level AA Compliance Checklist

### Perceivable

- [ ] All images have appropriate alt text
- [ ] Color is not the only means of conveying information
- [ ] Text has sufficient contrast (4.5:1 minimum)
- [ ] Content is adaptable and doesn't lose information when magnified

### Operable

- [ ] All functionality is available from keyboard
- [ ] Users have enough time to read and use content
- [ ] Content doesn't cause seizures (no flashing more than 3 times per second)
- [ ] Users can navigate and find content easily
- [ ] Multiple ways to navigate (menu, skip links, etc.)

### Understandable

- [ ] Page language is set correctly (lang attribute)
- [ ] Content appears and operates in predictable ways
- [ ] Users are helped to avoid and correct mistakes
- [ ] Form inputs have labels
- [ ] Form errors are identified and described

### Robust

- [ ] Content is compatible with current and future assistive technologies
- [ ] HTML is valid and semantic
- [ ] ARIA is used correctly
- [ ] Status messages are announced by screen readers

## Israeli Standard 5568 Specific Requirements

### Language Support
- [ ] Hebrew interface fully functional
- [ ] RTL layout works correctly
- [ ] Hebrew text is readable and properly spaced
- [ ] Date and number formatting follows Hebrew conventions

### Keyboard Navigation
- [ ] All interactive elements reachable by keyboard
- [ ] Tab order is logical in both LTR and RTL
- [ ] Keyboard shortcuts don't conflict with screen readers
- [ ] Focus is visible at all times

### Documentation
- [ ] Accessibility statement available (if required)
- [ ] Contact information for accessibility issues provided
- [ ] Known issues documented with workarounds

## Testing Schedule

Recommended testing frequency:

- **During Development**: Run axe-core on every build (automatic)
- **Before PR Merge**: Quick keyboard and screen reader test
- **Before Release**: Full manual accessibility audit
- **Quarterly**: Complete WCAG audit with external tools

## Common Issues and Fixes

### Missing Alt Text
**Issue**: Images without alt attributes
**Fix**: Add descriptive alt text or alt="" for decorative images

### Low Contrast
**Issue**: Text too light on background
**Fix**: Adjust color values to meet 4.5:1 ratio

### Missing Labels
**Issue**: Form inputs without associated labels
**Fix**: Add `<label>` with matching `htmlFor` attribute

### Keyboard Trap
**Issue**: User cannot escape element with keyboard
**Fix**: Ensure focus can move to next element with Tab

### Inaccessible Modal
**Issue**: Modal doesn't trap focus or announce properly
**Fix**: Add `role="dialog"`, `aria-modal="true"`, and implement focus trap

## Resources

- [WCAG 2.0 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Israeli Ministry of Justice - Accessibility](https://www.gov.il/en/departments/topics/accessibility)
- [Israeli Standard 5568](https://www.nbn.org.il/aliyahpedia/government-services/accessibility-statement/)

## Contact

For accessibility issues or questions, please contact the development team or open an issue on the project repository.

