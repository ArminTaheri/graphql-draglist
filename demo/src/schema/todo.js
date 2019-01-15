import * as R from "ramda";
import gql from "graphql-tag";

export const defaults = {
  todos: []
};

// Client side type definitions
export const typeDefs = gql`
  type Todo {
    description: String
    done: Boolean
  }
`;

// Client side resolvers
export const createClientQueryResolvers = readCache => ({
  todo: (_, { id }, { cache }) => ({
    ...readCache(cache, id),
    __typename: "Todo"
  }),
  todos: (_1, _2, { cache }) =>
    readCache(cache).map(todo => ({ ...todo, __typename: "Todo" }))
});

export const createClientMutationResolvers = updateCache => ({
  setTodos: (_, { todos }, { cache }) => {
    updateCache(cache, () =>
      todos.map(todo => ({ ...todo, __typename: "Todo" }))
    );
  },
  update: (_, { params }, { cache }) => {
    updateCache(cache, todos =>
      todos.map(
        R.when(
          R.pipe(
            R.prop("id"),
            R.equals(params.id)
          ),
          () => ({ ...params, __typename: "Todo" })
        )
      )
    );
  }
});
