import { request, gql } from "graphql-request";

const graphqlAPI ='https://api-eu-central-1.hygraph.com/v2/cl7cc824047eu01uf74kxcd7y/master'

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const res = await request(graphqlAPI, query);
  return res.postsConnection.edges;
};
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;
  const res = await request(graphqlAPI, query, { slug });
  return res.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails(){
       posts(
        orderBy:createdAt_ASC
        last : 3  
        ){
          title
          featuredImage{
            url
          }
          createdAt
          slug
        }


    }
   
  `;

  const res = await request(graphqlAPI, query);
  return res.posts;
};

export const getSimilairePosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const res = await request(graphqlAPI, query, { categories, slug });
  return res.posts;
};
export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const res = await request(graphqlAPI,query) 
  return res.categories;
};

export const submitComment = async (x) => {
  const res = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(x),
  });
  return res.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;
  const res = await request(graphqlAPI, query, { slug });
  return res.comments;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI,query);

  return result.posts;
};
