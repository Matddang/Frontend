import AuthRouter from "@/components/login/AuthRouter";

type Props = {
  searchParams: Promise<{ code?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const query = await searchParams;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: query.code!,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      redirect_uri:
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_LOCAL!
          : process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    }).toString(),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token || !tokenData.id_token) {
    console.error("토큰 요청 실패");
  }

  if (Object.keys(query).length)
    return (
      <AuthRouter
        type="google"
        code={tokenData.access_token}
        idToken={tokenData.id_token}
      />
    );

  return <></>;
}
