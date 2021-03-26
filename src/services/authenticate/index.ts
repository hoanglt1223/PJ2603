import Jwt from "@hapi/jwt";
import { JWT_AUD, JWT_ISS, JWT_SECRET_KEY } from "../../configs";
import { ICredential } from "../../types/authenticate";
import { IUser } from "../../types/users";

const mockUser = {
  email: "admin@admin.com",
  password: "admin",
};

enum UserScope {
  ADMIN = "admin",
}

export class Authenticate {
  private signToken(data: any): string {
    const token: string = Jwt.token.generate(data, JWT_SECRET_KEY, {
      ttlSec: 3600,
    });
    return token;
  }

  public loginWithEmail(user: IUser): ICredential {
    if (
      user?.email === mockUser?.email &&
      user?.password === mockUser?.password
    ) {
      const token = this.signToken({
        aud: JWT_AUD,
        iss: JWT_ISS,
        email: user?.email,
        scope: [UserScope.ADMIN],
      });
      return {
        token: token,
      };
    }

    return {
      token: "",
    };
  }
}
