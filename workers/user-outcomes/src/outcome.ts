import { z } from "zod";

export const Outcome = z.object({
    bet_title: z.string().default(""),
    user_id: z.number().default(-1),
    purchase_date: z.number().default(-1),
    profit: z.number().default(-1),
    multiplier: z.number().default(-1),
    sell_date: z.number().default(-1),
    image_link: z.string().default(""),
});

export type OutcomeType = z.infer<typeof Outcome>;

