'use client';

import {z} from "zod";


export const loginSchema=z.object({
    email:z.email("Invalid Email"),
    password:z.string(),min(6,"Password Must be 6 character")
})

export type LoginSchemaTypes=z.infer<typeof loginSchema>;