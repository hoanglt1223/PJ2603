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
    handler: function (req): ICredential {
      const loginData: ILoginRequest = {
        email: req?.payload?.email || "",
        password: req?.payload?.password || "",
      }
      const authenticate = new Authenticate()
      const credential = authenticate.loginWithEmail(loginData)
      return credential
    },
  },
}

module.exports = login
