import { ApolloClient, createNetworkInterface } from 'apollo-client';

// Polyfill fetch
import 'whatwg-fetch';

// __SIMPLE_API_ENDPOINT_ looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj5ld6rzgk6r80122xbcvpvcj' });

export const client = new ApolloClient({ networkInterface });
