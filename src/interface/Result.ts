
export type loginResult {
  token?: string;
  error?: string;
}
export type statusResult {
  status: boolean;
  error?: string;
}

export type result = loginResult | statusResult;