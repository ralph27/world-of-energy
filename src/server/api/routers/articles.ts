import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const ArticlesRouter = createTRPCRouter({
  addArticle: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        categoryId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.prisma.article.create({
          data: {
            content: input.content,
            title: input.title,
            category: {
              connect: {
                id: input.categoryId,
              },
            },
          },
        });
        console.log(res);
        return res;
      } catch (e) {
        console.log("ERROR", e);
      }
    }),

  getPreview: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.article.findMany({
      select: {
        title: true,
        id: true,
        createdAt: true,
        category: {
          select: {
            name: true,
            background: true,
          },
        },
      },
      take: 4,
    });

    return res;
  }),

  getArticles: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.article.findMany({
      select: {
        title: true,
        id: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return res;
  }),
});
