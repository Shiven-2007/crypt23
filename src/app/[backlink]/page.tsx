import links from "./links.json";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
export default function Page({ params: { backlink }, ...searchParams }: any) {
  const lin = links.link.find((a) => a.linkName == backlink);
  if (!!lin) {
    return (
      <div
        className={
          "flex h-full items-center justify-center bg-black text-white " +
          poppins.className
        }
      >
        {lin.res}
      </div>
    );
  } else {
    notFound();
  }
}
