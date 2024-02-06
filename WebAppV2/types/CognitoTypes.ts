/** Payload of an ID token */
export interface IIdTokenPayload {
  /** Subject identifier - locally unique identifier for the end user */
  sub: string;

  /** True if the user's email is verified, false otherwise */
  email_verified: boolean;

  /** Issuer identifier - identifies the principal that issued the JWT */
  iss: string;

  /** Username passed during authentication */
  'cognito:username': string;

  /** Globally unique identifier for the token - used to prevent replay attacks */
  origin_jti: string;

  /** Intended audience for the token */
  aud: string;

  /** Unique identifier for the event that triggered token issuance */
  event_id: string;

  /** How the token is intended to be used - 'id' for ID tokens */
  token_use: string;

  /** Unix timestamp for when the user was authenticated */
  auth_time: number;

  /** Expiration time in seconds since the Unix epoch */
  exp: number;

  /** Time the token was issued, in seconds since the Unix epoch */
  iat: number;

  /** Unique identifier for the token */
  jti: string;

  /** User's email address */
  email: string;
}

/** ID token returned by Cognito */
export interface IIdToken {
  /** JSON Web Token string representation of the ID token */
  jwtToken: string;

  /** Payload of the ID token */
  payload?: IIdTokenPayload;
}

/** Refresh token returned by Cognito */
export interface IRefreshToken {
  /** Refresh token string */
  token: string;
}

/** Payload of an access token returned by Cognito */
export interface IAccessTokenPayload {
  /** Subject identifier */
  sub: string;

  /** Issuer identifier */
  iss: string;

  /** Client application's ID */
  client_id: string;

  /** Unique token identifier */
  origin_jti: string;

  /** Unique event identifier */
  event_id: string;

  /** How the token is intended to be used - 'access' for access tokens */
  token_use: string;

  /** Scopes granted to this token */
  scope: string;

  /** Authentication time */
  auth_time: number;

  /** Expiration time */
  exp: number;

  /** Issued at time */
  iat: number;

  /** Unique identifier for the token */
  jti: string;

  /** Username */
  username: string;
}

/** Access token returned by Cognito */
export interface IAccessToken {
  /** JSON Web Token string */
  jwtToken: string;

  /** Payload of the access token */
  payload?: IAccessTokenPayload;
}

/** User session containing tokens */
export interface ICognitoUserSession {
  /** ID token */
  idToken: IIdToken;

  /** Refresh token */
  refreshToken: IRefreshToken;

  /** Access token */
  accessToken: IAccessToken;
}

/** Client configuration for connecting to Cognito pool */
export interface IPoolClient {
  /** Endpoint URL */
  endpoint: string;

  /** Options to pass to fetch API */
  fetchOptions: unknown;
}

/** Storage interface used by Cognito */
export interface IStorage {
  /** Storage keys */
  [key: string]: string;
  'amplify-signin-with-hostedUI': string;
  'ally-supports-cache': string;
}

/** Cognito user pool configuration */
export interface IPool {
  /** ID of the user pool */
  userPoolId: string;

  /** App client ID */
  clientId: string;

  /** Client configuration */
  client: IPoolClient;

  /** Whether advanced security is enabled */
  advancedSecurityDataCollectionFlag: boolean;

  /** Storage interface */
  storage: IStorage;
}

/** Client for connecting to Cognito API */
export interface ICognitoClient {
  /** Endpoint URL */
  endpoint: string;

  /** Options for fetch API */
  fetchOptions: unknown;
}

/** User attributes */
export interface IAttributes {
  /** Attribute keys and values */
  [key: string]: string | boolean | number;

  /** Subject identifier */
  sub: string;

  /** Email verified */
  email_verified: boolean;

  /** Email address */
  email: string;
}

/** Cognito response */
export interface ICognitoResponse {
  /** Username */
  username: string;
  /** Signed in user session */
  signInUserSession: ICognitoUserSession;
  /** User attributes */
  attributes: IAttributes;
}
