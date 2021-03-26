import Hapi from "@hapi/hapi"
import Jwt from "@hapi/jwt"
import glob from "glob"
import path from "path"
import { JWT_AUD, JWT_ISS, JWT_SECRET_KEY } from "./src/configs"

async function initServer() {
  const server = Hapi.server({ port: process.env.PORT || 8000 })
  await server.register(Jwt)

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
