import { z } from 'zod';
import ImageKit from 'imagekit';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure
} from '~/server/api/trpc';

const imageKit = new ImageKit({
  publicKey: process.env.CLOUD_API_KEY || '',
  privateKey: process.env.CLOUD_API_SECRET || '',
  urlEndpoint: process.env.URL_ENDPOINT || ''
});

export const SummariesRouter = createTRPCRouter({
  addPicture: protectedProcedure
    .input(z.object({ fileSelected: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await imageKit.upload({
          file: input.fileSelected,
          fileName: input.name
        });
        return res;
      } catch (e) {
        return e;
      }
    }),

  addSummary: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        categoryId: z.string(),
        image: z.string(),
        content: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.prisma.summary.create({
          data: {
            content: input.content,
            title: input.title,
            description: input.description,
            image: input.image,
            category: {
              connect: {
                id: input.categoryId
              }
            }
          }
        });
        return res;
      } catch (e) {
        return e;
      }
    }),

  getPreview: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.summary.findMany({
      select: {
        title: true,
        id: true,
        image: true,
        createdAt: true,
        description: true,
        content: true,
        category: {
          select: {
            name: true,
            background: true
          }
        }
      },
      take: 4
    });
    return res;
  }),

  getSummaryById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.summary.findUnique({
        where: {
          id: input.id
        },
        select: {
          title: true,
          id: true,
          image: true,
          createdAt: true,
          description: true,
          content: true,
          category: {
            select: {
              name: true,
              background: true
            }
          }
        }
      });
      return res;
    })
});
