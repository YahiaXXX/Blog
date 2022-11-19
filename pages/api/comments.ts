// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import {gql,GraphQLClient} from "graphql-request"

const graphqlAPI = process.env.REACT_APP_NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function comments(req:any,res:any){
  if(!graphqlAPI) return;
  const graphQLClient= new GraphQLClient(graphqlAPI,{
    headers :{
      authorization : `Bearer ${process.env.REACT_APP_GRAPHCMS_TOKEN}`
    }
  })
  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;
  try{
    const result = await graphQLClient.request(query,{
      name:req.body.name,
      email:req.body.email,
      comment:req.body.comment,
      slug:req.body.slug
  
    })
    return res.status(200).send(result)

  }
  catch(err){
    console.log(err)

  }

  
}
  
 
