"use client";

import { Post } from "@prisma/client";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/portfolio/${post.id}`} target="_blank">
      <div className="relative w-full aspect-video">
        <Image
          src={post.images[0]}
          layout="fill"
          objectFit="cover"
          className="rounded hover:opacity-70 transition"
        />
      </div>
      <div>{post.title}</div>
    </Link>
  );
};

export default PostCard;
