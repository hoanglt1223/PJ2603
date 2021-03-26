import Joi from "joi"
import { routes } from "../../constants/routes"
import { Authenticate } from "../../services"
import { ICredential } from "../../types/authenticate"

interface ILoginRequest {
  email: string
  password: string
}

const login = {
  method: "POST",
  path: routes.auth.login.value,
  config: {
    tags: ['api'],
    handler: function (req): ICredential {
      const loginData: ILoginRequest = {
        email: req?.payload?.email || "",
        password: req?.payload?.password || "",
      }
      const authenticate = new Authenticate()
      const credential = authenticate.loginWithEmail(loginData)
      return credential
    },
    validate: {
      payload: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      })
    },
  }
}

module.exports = login
