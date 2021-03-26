import { Boom } from "@hapi/boom"
import { routes } from "../../constants/routes"
import { postGateway } from "../../gateways"

const getPostById = {
  method: "GET",
  path: routes.posts.detail.value,
  config: {
    handler: async function (request, h): Promise<object> {
      const posts = await postGateway.getPosts()

      if (Array.isArray(posts)) {
        console.log("Log ~ file: get-post-by-id.ts ~ line 13 ~ posts", posts)
        const result = posts.find((post) => post.id === Number(request.params.id))
        console.log("Log ~ file: get-post-by-id.ts ~ line 14 ~ result", result)
        if (!!result) {
          return result
        }
      }

      throw new Boom("Post Not Found", { statusCode: 404 })
    },
    auth: {
      strategy: "jwt",
      scope: ["admin"],
    },
  },
}

module.exports = getPostById
