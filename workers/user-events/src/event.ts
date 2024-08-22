import { z } from "zod";

export const Event = z.object({
    name: z.string().default(""),
    shares: z.number().default(-1),
    market_cap: z.number().default(-1),
    end_date: z.number().default(-1),
    top_option_title: z.string().default(""),
    top_option_price: z.number().default(-1),
    top_option_image: z.string().default(""),
});

export type EventType = z.infer<typeof Event>;
