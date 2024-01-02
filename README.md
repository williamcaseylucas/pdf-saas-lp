# Quill

## packages

- yarn add clsx tailwind-merge
- yarn add tailwindcss-animate @tailwindcss/typography
- yarn add lucid-react
- npx shadcn-ui@latest init
- npx shadcn-ui@latest add button
- yarn add @kinde-oss/kinde-auth-nextjs
- yarn add @clerk/nextjs

## urls

- /auth-callback?origin=dashboard
  - for reauthentication with origin being back to the dashboard (where the user currently is)

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
