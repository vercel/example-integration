"use server";

import qs from "querystring";

export async function exchangeCodeForAccessToken(code: string) {
  console.log({
    code,
  });

  /*
    Exchange the code for a long-lived access token.
    Note: This call can only be made once per code.
  */
  const result = await fetch("https://api.vercel.com/v2/oauth/access_token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: qs.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.HOST}/callback`, // This parameter should match the Redirect URL in your integration settings on Vercel
    }),
  });

  const body = await result.json();

  console.log(
    "https://api.vercel.com/v2/oauth/access_token returned:",
    JSON.stringify(body, null, 2)
  );

  return body as {
    token_type: string;
    access_token: string;
    installation_id: string;
    user_id: string;
    team_id: string | null;
  };
}
