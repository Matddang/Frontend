export async function getAddress(keyword: string) {
  const key =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_ADDRESS_KEY_LOCAL
      : process.env.NEXT_PUBLIC_ADDRESS_KEY;
  const url = `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${key}&currentPage=1&countPerPage=10&keyword=${encodeURIComponent(
    keyword,
  )}&resultType=json`;

  const res = await fetch(url);
  const data = await res.json();
  return data?.results?.juso || [];
}
