import express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

const app: express.Application = express();
const port: number = 3000;


let typeDefs: any = [`
  type Query {
    hello: String
  }

  type Mutation {
    hello(message: String) : String
  }
`];

let helloMessage: String = 'World!';

let resolvers = {
    Query: {
        hello: () => helloMessage
    },
    Mutation: {
        hello: (_: any, helloData: any) => {
            helloMessage = helloData.message;
            return helloMessage;
        }
    }
};


app.use(
    '/graphql',
    graphqlHTTP({
        schema: makeExecutableSchema({typeDefs, resolvers}),
        graphiql: true
    })
);

app.listen(port, () => console.log(`Node Graphql API listening on port ${port}!`));