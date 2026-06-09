import {email, z} from "zod";

export const RegiesterValidator=z.object({
    name:z.string().min(3),
    email:z.email(),
    password:z.string().min(8)
})

export const LoginValidator=z.object({
    email:z.email(),
    password:z.string().min(8)
})
