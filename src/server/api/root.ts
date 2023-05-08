import { createTRPCRouter } from '~/server/api/trpc';
import { exampleRouter } from '~/server/api/routers/example';
import { CategoriesRouter } from './routers/categories';
import { ArticlesRouter } from './routers/articles';
import { SummariesRouter } from './routers/summaries';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  categories: CategoriesRouter,
  articles: ArticlesRouter,
  summaries: SummariesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
