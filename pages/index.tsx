import { useQuery } from "@apollo/react-hooks";
import client from "../lib/apollo";
import { GET_POSTS_QUERY } from "../lib/querys";
import LoadMorePosts from "../components/blog/LoadMorePosts";

const Blog = ({ data }) => {
  const posts = data?.posts;

  return (
    <>
      <h1>Blog</h1>
      <LoadMorePosts posts={posts} />
    </>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: GET_POSTS_QUERY,
    variables: { first: 10 },
  });
  return {
    props: {
      data,
    },
  };
};
