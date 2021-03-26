import Hapi, { ServerRegisterPluginObject } from "@hapi/hapi"
import Inert from "@hapi/inert"
import Jwt from "@hapi/jwt"
import Vision from "@hapi/vision"
import glob from "glob"
import HapiSwagger, { RegisterOptions } from "hapi-swagger"
import path from "path"
import { JWT_AUD, JWT_ISS, JWT_SECRET_KEY } from "./src/configs"

async function initServer() {
  const server = Hapi.server({ port: process.env.PORT || 8000 })

  const swaggerOptions: RegisterOptions = {
    documentationPath: "/docs",
    info: {
      title: "Test API Documentation",
    },
    securityDefinitions: {
      jwt: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    security: [{ jwt: [] }],
  }
  const plugins: Array<ServerRegisterPluginObject<any>> = [
    Jwt,
    {
      plugin: Inert,
    },
    {
      plugin: Vision,
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]
  await server.register(plugins)

  server.auth.strategy("jwt", "jwt", {
    keys: JWT_SECRET_KEY,
    verify: {
      aud: JWT_AUD,
      iss: JWT_ISS,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15,
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
        scope: { scope: artifacts.decoded.payload.scope },
      }
    },
  })

  glob
    .sync("dist/src/routes/**/*.js", {
      root: __dirname,
    })
    .forEach((file) => {
      const route = require(path.join(__dirname, "../", file))
      server.route(route)
    })

  await server.start()
  console.log("server running at: " + server.info.uri)
}

initServer()
