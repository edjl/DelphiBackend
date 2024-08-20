import { z } from "zod";

export const Category = z.object({
	grouping: z.number().default(-1),
	name: z.string().default(""),
});

export type CategoryType = z.infer<typeof Category>;