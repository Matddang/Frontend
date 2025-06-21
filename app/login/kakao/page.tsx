import AuthRouter from "@/components/login/AuthRouter";

type Props = {
  searchParams: Promise<{ code?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const query = await searchParams;

  if (Object.keys(query).length)
    return <AuthRouter type="kakao" code={query.code!} />;

  return <></>;
}
