### `howtographql.com` 의 GRAPHQL-NODE Tutorial 을 따라하면서 배운 내용을 정리하는 프로젝트.

# A Simple Query

First, it’s important to note that *every GraphQL resolver function actually receives four input arguments.* As the remaining three are not needed in our scenario right now, we’re simply omitting them. Don’t worry, you’ll get to know them soon.

The first argument, commonly called parent (or sometimes root) is the result of the *previous resolver execution level*. Hang on, what does that mean? 🤔

Well, as you already saw, GraphQL queries can be nested. Each level of nesting (i.e. nested curly braces) corresponds to one resolver execution level. The above query therefore has two of these execution levels.

On the first level, it invokes the feed resolver and returns the entire data stored in links. For the second execution level, the GraphQL server is smart enough to invoke the resolvers of the Link type (because thanks to the schema, it knows that feed returns a list of Link elements) for each element inside the list that was returned on the previous resolver level. Therefore, in all of the three Link resolvers, the incoming parent object is the element inside the links list.

Note: To learn more about this, check out this article.

In any case, because the implementation of the Link resolvers is trivial, *you can actually omit them* and the server will work in the same way as it did before 👌 We just wanted you to understand what’s happening under the hood