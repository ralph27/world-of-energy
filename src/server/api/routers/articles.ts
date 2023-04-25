import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.CLOUD_API_KEY || "",
  privateKey: process.env.CLOUD_API_SECRET || "",
  urlEndpoint: process.env.URL_ENDPOINT || "",
});

export const ArticlesRouter = createTRPCRouter({
  addArticle: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        categoryId: z.string(),
        image: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      try {
        imagekit
          .upload({
            file: input.image,
            fileName: `${input.title} image`,
          })
          .then(async (response) => {
            const res = await ctx.prisma.article.create({
              data: {
                content: input.content,
                title: input.title,
                image: response.url,
                categories: {
                  connect: {
                    id: input.categoryId,
                  },
                },
              },
            });
            return res;
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log("ERROR", e);
      }
    }),

  getPreview: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.article.findMany({
      select: {
        image: true,
        title: true,
        id: true,
        createdAt: true,
        categories: {
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
