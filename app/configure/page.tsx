"use client";

import { useSearchParams } from "next/navigation";

// The URL of this page should be added as Configuration URL in your integration settings on Vercel
export default function Page() {
  const searchParams = useSearchParams();

  /*
    The configurationId is passed as a query parameter, use it get additional information about the installation.
    The configurationId should always be verified, for example, by checking it against the currently logged-in user, to not leak any information.
  */
  const configurationId = searchParams.get("configurationId");

  return (
    <div className="space-y-2 text-center">
      <h1 className="text-lg font-medium">Example Integration</h1>
      <p className="max-w-lg">
        This page is used to show some configuration options for the
        configuration with the id{" "}
        <code className="text-sm inline-block text-[#F81CE5] min-w-[245px]">
          {configurationId}
        </code>
      </p>
    </div>
  );
}
