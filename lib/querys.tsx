import { gql } from "apollo-boost";

const GET_POSTS_QUERY = gql`
  query GET_POSTS_QUERY($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        title
        featuredImage {
          node {
            link
          }
        }
        excerpt
        author {
          node {
            avatar {
              url
            }
            firstName
            lastName
          }
        }
        date
        categories {
          nodes {
            name
            slug
          }
        }
        slug
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const GET_POST_QUERY = gql`
  query GET_POST_QUERY($slug: String) {
    postBy(slug: $slug) {
      title
      postId
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

const GET_POST_SLUGS = gql`
  query GET_POST_SLUGS {
    posts: posts(last: 1) {
      nodes {
        id
        slug
      }
    }
  }
`;
export { GET_POSTS_QUERY, GET_POST_QUERY, GET_POST_SLUGS };
