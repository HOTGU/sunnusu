import getPosts from "@/actions/getPosts";
import Container from "@/components/Container";
import PostCard from "@/components/post/PostCard";
import React from "react";

const PortfolioPage = async () => {
  const posts = await getPosts();
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-fit my-6">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </Container>
  );
};

export default PortfolioPage;
