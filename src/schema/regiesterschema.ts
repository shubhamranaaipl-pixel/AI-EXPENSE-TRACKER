"use client";
import {z} from "zod";

export const regiesterSchema=z.object({
    name:z.string().min(3,"Name must be 3 charcter"),
    email:z.email("Invalid Email"),
    password:z.string().min(6,"Password Must be 6 length")
})

export type RegiesterSchmeTypes=z.infer<typeof regiesterSchema>
