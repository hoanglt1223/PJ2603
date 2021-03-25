import { posts } from "../../datasources";
import { routes } from "../../constants/routes";

const getPosts = {
  method: "GET",
  path: routes.posts.value,
  config: {
    handler: async function (): Promise<object> {
      return posts;
    },
    auth: {
      strategy: "jwt",
      scope: ["admin"],
    },
  },
};

module.exports = getPosts;
