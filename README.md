# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Technologies Used

This project uses:

- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [wavesurfer.js](https://wavesurfer-js.org/) for audio previews and waveform visualizations
- [lucide-react](https://lucide.dev/) for icons
- [date-fns](https://date-fns.org/) for date formatting
- [gitmoji](https://gitmoji.dev/) for commit messages

## Authentication

You can use the following credentials for testing or you can create one:

- Email: macallwalter@gmail.com
- Password: Admin123!

When registering, a confirmation email will be sent to verify your identity.

## Routing & State Management

- Next.js middleware is used for route protection
- Authenticated users cannot access `/login` or root `('/')` routes until logout
- Non-authenticated users cannot access `/dashboard` or `/new-document` routes
- Context API is used for session validation and transcript management

## Deployment

Live demo: [https://vercel.com/walter-macalls-projects/montra-test](https://vercel.com/walter-macalls-projects/montra-test)

## DEMO

https://github.com/user-attachments/assets/e1750b4e-4658-475c-b2c1-168fc76175a1



https://github.com/user-attachments/assets/2007cfd9-2ffb-4914-9927-76d22091d06c



