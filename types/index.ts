import { Company, User } from "@prisma/client";

export type safeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified" > & {
    createdAt: string,
    updatedAt: string,
    emailVerified: string | null
} | null

export type userWithCompany = safeUser & {company?: Company | null}