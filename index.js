// Main server file

import { ApolloServer, PubSub } from 'apollo-server';
import Sequelize from 'sequelize';
import resolvers from './graphql/resolvers/index.js';
import typeDefs from './graphql/typeDefs.js';
import express from 'express';
import cors from "cors";
import uploadRoutes from "./routes/api/uploads";

app.use("*", cors());
app.use(express.json());

app.use(uploadRoutes);

const pubSub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub }),
});

Sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database');
    return server.listen({ port: 4000 });
    
  })
  .then((res) => {
    console.log(`Server ready: ${res.url}`);
  })
  .catch((err) => console.error('Connection error: ', err));

 // Документация: https://www.apollographql.com/docs/apollo-server/ 
/* 
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
*/
