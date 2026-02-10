# Kibo Project Rules

## Tech Stack

- **Framework**: Next.js 15+ (App Router).
- **Styling**: Tailwind CSS 4 + Global CSS variables.
- **Database**: Supabase (PostgreSQL).
- **Auth**: Supabase Auth (Shared across Kibo apps).
- **Icons**: `lucide-react`.

## Architecture

- **Monorepo / Multi-App Strategy**:
  - We use a **Single Supabase Project** for all Kibo Apps (Finance, Nexus, etc.).
  - Users have a **Unified Account** (Single Sign-On experience).
  - Database tables should be namespaced (e.g., `finance_transactions`, `nexus_posts`) or schema-separated if complexity grows.

## Local Development

- Run `npm run dev` to start the server.
- Ensure `.env.local` contains valid Supabase keys.

## Deployment

- Deploy on Vercel.
- Environmental variables must be set in Vercel project settings.

## Design Philosophy (Strict)

- **NO GRADIENTS**.
- **NO GLOWS**.
- **Solid Colors Only**.
- **Color Priority**: Green > Blue > Red > Purple.

## Directories

- `app/`: Next.js App Router pages.
- `components/`: Reusable UI components.
- `lib/`: Utility functions (Supabase client, helpers).
- `docs/`: Design and Project Documentation.
