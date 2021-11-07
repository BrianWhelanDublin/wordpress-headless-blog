import { useQuery } from "@apollo/react-hooks";
import client from "../lib/apollo";
import { useRouter } from "next/router";
import { GET_POST_QUERY, GET_POST_SLUGS } from "../lib/querys";
import Image from "next/image";
import styles from "../styles/modules/Post.module.scss";

const Post = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { content, featuredImage, postId, title } = data.postBy;

  return (
    <>
      <header className={styles["post-header"]}>
        <div className={styles["post-image"]}>
          <Image
            src={featuredImage.node.sourceUrl}
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <h1 className={styles["post-title"]}>{title}</h1>
      </header>
      <article className={styles["post-content"]}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </>
  );
};

export default Post;

export const getStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: GET_POST_QUERY,
    variables: {
      slug: params.slug,
    },
  });

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_POST_SLUGS,
  });
  const paths = [];
  data?.posts?.nodes.map((post) => {
    paths.push({ params: { slug: post.slug } });
  });

  return {
    paths,
    fallback: true,
  };
};
