import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { printSchema, buildClientSchema } from 'graphql/utilities';
import apiJsonSchema from '../schema.json';

const getClient = (mockResolvers) => {
  const buildSchema = (json) => {
    const introspectionResult = 'data' in json || '__schema' in json ? json : JSON.parse(json);

    if (
      (introspectionResult.errors && introspectionResult.errors.length)
      || !(
        introspectionResult?.data?.__schema || introspectionResult?.__schema
      )
    ) {
      throw introspectionResult.errors;
    } else {
      const schema = introspectionResult.data || introspectionResult;

      return printSchema(buildClientSchema(schema));
    }
  };

  // 1) Convert JSON schema into Schema Definition Language
  const apiTypeDefs = buildSchema(apiJsonSchema);

  // 2) Make schema "executable"
  const schema = makeExecutableSchema({
    typeDefs: apiTypeDefs,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  // 3) Apply mock resolvers to executable schema
  addMockFunctionsToSchema({ schema, mocks: mockResolvers });

  // 4) Define ApolloClient (client variable used below)
  return new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });
};

const gqlApolloTestClient = getClient();

export default gqlApolloTestClient;
