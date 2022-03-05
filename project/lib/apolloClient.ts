// reference https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
// ApolloClient<NormalizedCacheObject> data type
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined
const createApolloClient = () => {
  return new ApolloClient({
    // There is no window object, it is running on the server side.
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://lesson-hasura-noir.hasura.app/v1/graphql',
      // headers: {
      //   'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
      // },
    }),
    cache: new InMemoryCache(),
  })
}
export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}