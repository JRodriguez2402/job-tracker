/** A user as exposed to the client — never includes the password hash. */
export interface AuthUser {
  id: string;
  email: string;
}

/** Credentials sent to register or log in. */
export interface AuthCredentials {
  email: string;
  password: string;
}

/** What register and login return: a signed token plus the public user. */
export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}
