import { User } from "@prisma/client";

export type CurrentUserType = Omit<User, "createdAt" | "password"> | null;
