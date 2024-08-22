import { z } from "zod";

export const Option = z.object({
    title: z.string().default(""),
    image_link: z.string().optional(),
});

export type OptionType = z.infer<typeof Option>;
