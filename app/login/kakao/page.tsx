import { getTokens } from "@/services/getTokens";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ code?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const query = await searchParams;

  if (Object.keys(query).length) {
    const res = await getTokens(query.code!);

    if (res.status === 200) {
      redirect("/");
    }
  }

  return <div></div>;
}
