import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const CategoriesRouter = createTRPCRouter({
  addCategory: protectedProcedure
    .input(z.object({ name: z.string(), background: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.category.create({
        data: { name: input.name, background: input.background },
      });
      return res;
    }),

  getCategories: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.category.findMany();
    return res;
  }),
});
