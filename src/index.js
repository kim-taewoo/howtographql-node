const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      })
      return newLink;
    },
  },

  // GraphQL 스키마 내의 Link 타입을 위한 추가적인 resolvers.
  // 그런데 아래처럼 아주 단순한 경우에는 생략해도 알아서 된다.
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url,
  // }
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma
  }
});

server.start(() => console.log('Server is running'));
