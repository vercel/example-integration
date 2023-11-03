"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { exchangeCodeForAccessToken } from "~/app/callback/actions/exchange-code-for-access-token";

// The URL of this page should be added as Redirect URL in your integration settings on Vercel
export default function Page() {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [scope, setScope] = useState<"team" | "personal account" | undefined>();

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  const [_, exchange] = useTransition();

  useEffect(() => {
    if (!code) return;

    exchange(async () => {
      const result = await exchangeCodeForAccessToken(code);

      /*
        Important: This is only for demonstration purposes.
        The access token should never be sent to the client. All API calls to the Vercel API should be made from the server.
        Therefore, we use a server action to exchange the code for an access token.
      */
      setAccessToken(result.access_token);
      setScope(result.team_id ? "team" : "personal account");
    });
  }, [code]);

  return (
    <div className="w-full max-w-2xl divide-y">
      <div className="py-4 flex items-center space-x-2 justify-center">
        <h1 className="text-lg font-medium">Integration is installed on a</h1>

        {accessToken ? (
          <div className="rounded-md bg-blue-500 text-white text-sm px-2.5 py-0.5">
            {scope}
          </div>
        ) : null}
      </div>

      {/*
        Important: The access token is displayed for demonstration purposes only and should never be sent to the client in a production environment.
        Depending on the scopes assigned to your integration, you can use this access token to call the corresponding API endpoints.
      */}
      <div className="py-4 flex items-center">
        <h1 className="text-lg font-medium w-1/3">Vercel Access Token:</h1>
        <div className="w-2/3">
          <code className="text-sm">
            {accessToken ? accessToken : "Loading..."}
          </code>
        </div>
      </div>

      <div className="py-4 flex justify-center">
        <a
          className="bg-black hover:bg-gray-900 text-white px-6 py-1 rounded-md"
          href={next!}
        >
          {/*
            If you have finished handling the installation, the redirect should happen programmatically
          */}
          Redirect me back to Vercel
        </a>
      </div>
    </div>
  );
}
