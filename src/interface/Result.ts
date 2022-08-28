export type LoginResult =
  | {
      token: string;
      joined: boolean;
    }
  | { error: string };

export type StatusResult = {
  status: boolean;
  error?: string;
};

export type Result = LoginResult | StatusResult;
