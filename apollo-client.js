import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.REACT_APP_NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    cache: new InMemoryCache(),
});

export default client;