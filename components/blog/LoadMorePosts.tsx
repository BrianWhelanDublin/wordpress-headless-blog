import { useEffect, useState } from "react";
import Posts from "./Posts";
import { useLazyQuery } from "@apollo/client";
import { GET_POSTS_QUERY } from "../../lib/querys";

const LoadMorePosts = ({ posts }) => {
  const [postsData, setPostsData] = useState(posts?.nodes);
  const [pageInfo, setPageInfo] = useState(posts?.pageInfo);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPostsData(posts?.nodes);
    setPageInfo(posts?.pageInfo);
  }, [posts?.nodes]);

  const setPosts = (posts) => {
    if (!posts || !posts?.nodes || !posts?.pageInfo) {
      return;
    }

    const newPosts = postsData.concat(posts?.nodes);
    setPostsData(newPosts);
    setPageInfo({ ...posts?.pageInfo });
  };

  const [fetchPosts, { loading }] = useLazyQuery(GET_POSTS_QUERY, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setPosts(data?.posts ?? []);
    },
    onError: (error) => {
      setError(error?.graphQLErrors ?? "");
    },
  });

  const loadMoreItems = (endCursor = null) => {
    let queryVariables = {
      first: 10,
      after: endCursor,
    };

    fetchPosts({
      variables: queryVariables,
    });
  };

  const { endCursor, hasNextPage } = pageInfo || {};

  return (
    <>
      <Posts posts={postsData} />
      {hasNextPage ? (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <button
              className="loadmore-button"
              onClick={() => loadMoreItems(endCursor)}
            >
              Load more
            </button>
          )}
        </div>
      ) : null}
      {error && <div>No articles available</div>}
    </>
  );
};

export default LoadMorePosts;
