import AuthState from './auth.state';
import ConfigState from './config.state';

export type AppStateType = {
  auth: AuthState;
  config: ConfigState;
};

export {
  AuthState,
  ConfigState,
};
