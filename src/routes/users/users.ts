import { Authenticate } from "../../services";
import { routes } from "../../constants/routes";
import { ICredential } from "../../types/authenticate";

interface ILoginRequest {
  email: string;
  password: string;
}

const usersLogin = {
  method: "POST",
  path: routes.users.login.value,
  config: {
    handler: function (req): ICredential {
      const loginData: ILoginRequest = {
        email: req?.payload?.email || "",
        password: req?.payload?.password || "",
      };
      const authenticate = new Authenticate();
      const credential = authenticate.loginWithEmail(loginData);
      return credential;
    },
  },
};

module.exports = usersLogin;
