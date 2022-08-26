import { OAuth2Client, TokenPayload } from "google-auth-library";

export const testIsGSMStudentEmail: Function = (email: string): boolean =>
  /^(student\d{6}|s\d{5})@gsm.hs.kr$/.test(email);

export const getGeneration: Function = (email: string): number =>
  Number(email.replace(/[^0-9]/g, "").slice(0, 2)) - 16;

export const authGoogleToken: Function = async (
  token: string,
): Promise<TokenPayload | undefined> => {
  const client = new OAuth2Client(process.env.GOOGLE_WEB_CLIEND_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: [
      process.env.GOOGLE_WEB_CLIENT_ID,
      process.env.GOOGLE_ANDROID_CLIENT_ID,
    ] as string[],
  });
  const payload = ticket.getPayload();
  return payload;
};
