import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { services } from "~/server/db/schema";

export const serviceRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.services.findMany({
      orderBy: (services, { desc }) => [desc(services.createdAt)],
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        service: z.object({
          name: z.string().min(1),
          active: z.boolean(),
          isOnline: z.boolean(),
          status: z.string().min(1),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(services).values({
        name: input.service.name,
        active: input.service.active,
        isOnline: input.service.isOnline,
        status: input.service.status,

        createdById: ctx.session.user.id,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.services.findFirst({
      orderBy: (services, { desc }) => [desc(services.createdAt)],
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
