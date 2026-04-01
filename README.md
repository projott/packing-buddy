# Packing Buddy

Smart packing lists for every trip. Tell the app about your trip and get a context-aware packing list you can edit, adjust, and check off.

## Features

- Weather-aware packing suggestions (forecast for near-term trips, historical averages for future trips)
- Trip-type templates: wedding (male/female), sporting event, general
- Adjusts for flying vs. driving (TSA rules, luggage constraints)
- Adjusts for hotel vs. Airbnb (toiletries, towels)
- Gender-specific item suggestions
- Duration-based quantity scaling
- Notepad-style UI: edit items, adjust quantities, check off items
- Persists your list in the browser (localStorage)

## Tech Stack

- Next.js 16 + TypeScript
- Tailwind CSS v4
- Open-Meteo API (free, no key needed)
- Deployed on Vercel

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Push to GitHub and connect to Vercel, or:

```bash
npx vercel
```
