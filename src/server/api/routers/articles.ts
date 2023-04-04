import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const ArticlesRouter = createTRPCRouter({
  addArticle: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        categoryId: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.article.create({
        data: {
          content: input.content,
          image: input.image,
          title: input.title,
          categories: {
            connect: {
              id: input.categoryId,
            },
          },
        },
      });
      return res;
    }),

  getArticles: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.article.findMany({
      select: {
        image: true,
        title: true,
        id: true,
        createdAt: true,
        categories: {
          select: {
            name: true,
          },
        },
      },
    });
    return res;
  }),
});
