import { User, Prisma } from "@prisma/client";

export type CurrentUserType = Omit<User, "createdAt" | "password"> | null;

export type PostWithMetadata = Prisma.PostGetPayload<{
  include: { metadata: true };
}>;
