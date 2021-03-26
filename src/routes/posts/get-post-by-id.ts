import { Boom } from "@hapi/boom"
import Joi from "joi"
import { routes } from "../../constants/routes"
import { postGateway } from "../../gateways"

const getPostById = {
  method: "GET",
  path: routes.posts.detail.value,
  options: {
    tags: ['api'],
    description: 'Get post by id',
    handler: async function (request, h): Promise<object> {
      const posts = await postGateway.getPosts()

      if (Array.isArray(posts)) {
        const result = posts.find((post) => post.id === Number(request.params.id))
        if (!!result) {
          return result
        }
      }

      throw new Boom("Post Not Found", { statusCode: 404 })
    },
    validate: {
      params: Joi.object({
        id: Joi.number()
          .required()
          .description('the id for post'),
      })
    },
    auth: {
      strategy: "jwt",
      scope: ["admin"],
    },
  }
}

module.exports = getPostById
