# Quill

## packages

### Styling Tailwind

- bun add clsx tailwind-merge
- bun add tailwindcss-animate @tailwindcss/typography
- bun add lucid-react
- bun add react-loading-skelton
  - have to import this in layout.tsx

### Login

- bun add @kinde-oss/kinde-auth-nextjs
- bun add @clerk/nextjs
- bun add date-fns

### PDF drag and drop

- bun add react-pdf
- bun add react-dropzone
  - for the Dialoge content section in /components/UploadButton
- bun add uploadthing @uploadthing/react
- pnpm i @uploadthing/react
- pnpm i react-resize-detector
  - to make pdf fit to screen

### Shadcn

- bunx shadcn-ui@latest init
- bunx shadcn-ui@latest add button
- bunx shadcn-ui@latest add dialog
- bunx shadcn-ui@latest add progress
- bunx shadcn-ui@latest add toast
- bunx shadcn-ui@latest add input

### Prisma

- bunx prisma init
- bunx prisma generate
- bunx prisma db push
- bunx prisma studio

## Notes

- run bunx prisma generate if you delete node modules

##

## toast shadcn

- have to add to layout.tsx
- useToast hook to access

## upload thing

- only logged in users can upload
- need to add formHook that incorporates OurFileRouter they provide in /src/lib/uploadthing.ts
  - in docs it's under generateReactHelpers
  - useUploadThing is now a hook we can use that has OurFileRouter type binded
- core.ts -> onUploadComplete is for it to be added to our db
  - metadata comes from middleware
- onUploadProgress exists which could have been used for more accurate file upload info
- once mutation occurs, we reroute to new page with file

## File storage

- AWS S3 buckets (cheaper than uploadthing), Cloudinary, and uploadthing (good for 500 - 1000 users because free)

## react PDF

- have to use <input {...getInputProps()}> to have click for file explorer functionality
- use <Dropzone> component
- have to import css for Document in same page (PdfRenderer component is example)
- to parse pdf properly
  - add next.config.js part
    - add webpack with config
  - add worker
    - via pdfjs (in /components/PdfRenderer)
- make pdf expand by putting div around document and using react-resize-detector

## typescript

- if you add a '!' after a variable that's throwing an error, it will make it go away

## determinate progress bar

- have it simulate progress bar until 95% and then shoot to 100% when it completes
- /src/components/UploadButton has example of startSimulatedProgress
  - have clearInterval to have it stop using setInterval
  - then clear it again in DropZone component
- simulate slow upload with:
  - await new Promise((resolve) => setTimeout(resolve, 1500));

## Date-fns

- format(new Date(file), 'MMM yyyy')

## Get user information passed as context in objects for TRPC calls

- logic in src/trpc
- allows us to use User context later
- good for privateProcedures

## login flow

- Dashboard redirects to auth-callback
- We check if the user is logged in with Clerk
  - If yes, we create a new user if they don't exist in the db
  - If no, we redirect them to the sign in page
- Then we send back to the dashboard
  - If the user doesn't exist in the db still, send em' right back
  - Otherwise render the page content

## data base alternatives

- cockroachlabs -> sql w/ no credit card required
- neon.tech -> postgresql alternative

## prisma

- commands
  - bunx prisma migrate dev --name init
    - locally sync changes with name of "init'
    - calls it dev.db
  - bunx prisma studio
  - bunx prisma db push
- src/db/index.ts is where PrismaClient has been created
- planetscale doesn't support 'foreign key constraints"
  - add relationMode: "prisma"
- if you have a User model and an Article model
  - author User @relation(fields:[authorId], references: [id])
  - authorId Int
    - Will make "author" reference User
    - Will make "authorId" reference User id
    - when using "connect" keyword for author, it will populate authorId
  - using "include" allows additional objects to be included
- go to json and add
  - {
    "editor.formatOnSave": true,
    "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
    },
    }

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
- reference db from Prisma now in trpc/index.ts
- trpc.useUtils() can be used to cause react query to reftech from db and update page without completely refreshing
  - example in src/components/dashboard

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
- asChild allows you to create custom button instead of preconfigured button
  - would be button in button otherwise
- add to Progress.tsx a "indicatorColor"

## images

- fill or width, height
- dimensions of image when it is open is on the bottom right

## tailwind

- added components to config.ts
- can add style clipPath to give gradient some direction (app/page.tsx)
- flow-root
  - good to add to parent of "float" divs
- inset-x-0 makes the child element (that has this class applied) stretch to fill its "relative" parent completely
- gradients
  - bg-gradient-to-r from-cyan-500 to-blue-500
- truncate
  - cuts content off if they are too long
- flex-1
  - tries to take up as much space as possible
- flex-[0.75]
  - if flex-1 vs flex-[0.75]
    - left will take up slightly more room than the right
