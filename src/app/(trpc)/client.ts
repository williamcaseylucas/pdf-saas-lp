import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/trpc";
// Pass main type of router in here
export const trpc = createTRPCReact<AppRouter>({});
