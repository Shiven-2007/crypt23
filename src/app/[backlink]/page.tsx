import links from "./links.json";
import { notFound } from "next/navigation";
export default function Page({ params: { backlink }, ...searchParams }: any) {
  const idk = links.link.find((a) => a.linkName == backlink);
  if (!!idk) {
    return <main>{idk.res}</main>;
  } else {
    notFound();
  }
}
