# Quill

## packages

- yarn add clsx tailwind-merge
- yarn add tailwindcss-animate @tailwindcss/typography
- yarn add lucid-react
- npx shadcn-ui@latest init
- npx shadcn-ui@latest add button
- yarn add @kinde-oss/kinde-auth-nextjs
- yarn add @clerk/nextjs

## bun

- much faster than pnpm
- bun create next-app
- bun install
- bun add \_
- bun run build

- layout alternative to React.ReactNode -> PropsWithChildren
  - { children }: { children: React.ReactNode }
  - { children }: PropsWithChildren

## trpc

- https://trpc.io/docs/client/nextjs/setup
- add index.ts and trpc.ts in /src directory
- add Providers.tsx in components that wraps TRPC instance around your entire app
  - Good to wrap QueryClientProvider as child so that we can use that seperately later
- have trpc instance within app in (trpc)
- add route handlers for /api route
  - https://trpc.io/docs/server/adapters/nextjs#route-handlers
  - create /app/api/trpc/[trpc]/routes.ts
- /src/trpc/index.ts is where you create procedures to call

## urls

- /auth-callback?origin=dashboard
  - for reauthentication with origin being back to the dashboard (where the user currently is)
- use router to push urls
- use useSearchParams() to get queries from the url

## Clerk (supposed to be Kinde) (auth)

- using clerk instead since Kinde was having 500 errors
- can't grab {user} from auth(), instead grab user from await currentUser() with async function instead

## shadcn

- ui.shadcn.com
  - go to themes
  - copy and paste over everything
- add to Link button styles
  - buttonVariants({ size: "lg", className: "mt-5" })

## images

- fill or width, height
- dimensions of image when it is open is on the bottom right

## tailwind

- added components to config.ts
- can add style clipPath to give gradient some direction (app/page.tsx)
- flow-root
  - good to add to parent of "float" divs
- inset-x-0 makes the child element (that has this class applied) stretch to fill its "relative" parent completely
