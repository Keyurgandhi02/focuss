# WorkMode - Premium Productivity App

A modern, premium productivity web application inspired by Pomofocus but with enhanced UI/UX, glassmorphism design, and smooth animations.

## Features

✨ **Premium UI/UX**
- Glassmorphism design with blur and transparency effects
- Dynamic time-based gradient backgrounds
- Smooth animations and micro-interactions
- Motivational messages that change per session state

🎯 **Focus Timer**
- Centered timer layout with progress visualization
- Configurable focus time (minimum 45 minutes)
- Automatic break time calculation (20% of focus time)
- Start/Pause/Resume/Reset controls
- Keyboard shortcuts (Space: play/pause, R: reset)

📊 **Dashboard**
- Clean hub with session statistics
- Quick start floating action button
- Responsive design for all devices

⚙️ **Settings**
- Customize focus and break durations
- Enable/disable notifications and sounds
- Persistent settings with localStorage

🔐 **Authentication**
- Clerk authentication integration
- Secure user sessions

## Tech Stack

- **Frontend**: Next.js 16 (App Router), JavaScript/JSX
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Authentication**: Clerk 5.0
- **Icons**: Lucide React
- **Drag & Drop**: @dnd-kit (prepared for future task management)

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.jsx                 # Landing page
│   ├── layout.js                # Root layout with providers
│   ├── globals.css              # Global styles
│   ├── dashboard/               # Dashboard page
│   ├── focus/                   # Focus mode page
│   ├── settings/                # Settings page
│   ├── login/                   # Login page (Clerk)
│   └── sign-up/                 # Sign-up page (Clerk)
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Card.jsx
│   ├── Navbar/
│   │   └── Navbar.jsx           # Persistent navigation
│   ├── Focus/
│   │   ├── TimerModule.jsx      # Core timer component
│   │   ├── TimerDisplay.jsx     # Timer display
│   │   └── MotivationalMessage.jsx
│   ├── Dashboard/
│   │   └── FloatingActionButton.jsx
│   └── Theme/
│       └── GradientBackground.jsx # Dynamic backgrounds
├── store/
│   └── useAppStore.js           # Zustand store
├── hooks/                       # Custom React hooks (future)
└── lib/                         # Utilities (future)
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Setup Environment Variables

```bash
# Copy example environment file
cp .env.example .env.local
```

Edit `.env.local` and add your Clerk keys:
- Get keys from: https://dashboard.clerk.com/last-active?path=api-keys

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_secret_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Usage

### Landing Page
- Welcome screen for unauthenticated users
- Sign in / Sign up options

### Dashboard
- View session statistics
- Click floating action button (FAB) to start work

### Focus Mode
- Centered timer as the hero element
- Adjustable focus duration before starting (minimum 45 minutes)
- Sessions flow: Idle → Work → Break → Completed
- Browser notifications on session completion
- Keyboard shortcuts for quick navigation

### Settings
- Configure focus time duration
- Break time auto-calculates as 20% of focus time
- Toggle notifications and sound effects
- Settings persist to localStorage

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause timer |
| `R` | Reset session |

## Customization

### Change Focus Duration
1. Go to Settings page
2. Update "Focus Time" (minimum 45 minutes)
3. Break time auto-adjusts to 20% of focus time

### Gradient Colors
Edit `src/components/Theme/GradientBackground.jsx` to customize time-based gradients:
- Morning (6-12): Blue gradient
- Afternoon (12-18): Purple/Pink gradient
- Evening (18-22): Orange/Red gradient
- Night (22-6): Dark/Black gradient

### Button Variants
Available variants in `src/components/ui/Button.jsx`:
- `primary` - Default gradient button
- `secondary` - Glassmorphic with border
- `success` - Green gradient
- `danger` - Red gradient
- `outline` - Border only

## Features in Development

- 📈 Real focus time tracking and analytics
- 🎯 Deep focus goals and milestones
- 📝 Pomodoro session history
- 🎵 Ambient sounds integration
- 👥 Team/social features
- 📊 Session reports and export

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Performance

- Production build optimized with Next.js
- Lighthouse score targets: 95+ on all metrics
- Smooth 60fps animations
- Optimized bundle size

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
npm run build
```

## Troubleshooting

### "Missing publishableKey" Error
- Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to `.env.local`
- Restart dev server after adding environment variables

### Timer Not Running
- Check if browser notifications are enabled
- Ensure JavaScript is enabled in browser
- Try a different browser

### Settings Not Persisting
- Check browser localStorage is enabled
- Make sure focus duration is >= 45 minutes

## Architecture Decisions

1. **Zustand over Redux**: Simpler, less boilerplate for this scale
2. **Client-side State**: Focus timer runs locally for optimal performance
3. **Glassmorphism**: Modern aesthetic aligned with premium SaaS products
4. **Tailwind CSS**: Rapid development with consistent design tokens
5. **App Router**: Next.js 16 latest features and best practices

## Contributing

This is a portfolio project. For improvements or suggestions, feel free to:
1. Create an issue describing your idea
2. Fork and submit a pull request

## License

MIT - Feel free to use this as inspiration for your own projects!

## Getting Help

- Check the troubleshooting section above
- Review `.env.example` for required environment variables
- Ensure all dependencies are installed: `npm install`
- Restart the development server: `npm run dev`

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
