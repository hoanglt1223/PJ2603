import jwt from "jsonwebtoken";
import { JWT_EXPIRED_TIME, JWT_SECRET_KEY } from "../../configs";
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
    const token: string = jwt.sign(data, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRED_TIME,
    });
    return token;
  }

  public loginWithEmail(user: IUser): ICredential {
    if (
      user?.email === mockUser?.email &&
      user?.password === mockUser?.password
    ) {
      const token = this.signToken({
        aud: 'urn:audience:test',
        iss: 'urn:issuer:test',
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
