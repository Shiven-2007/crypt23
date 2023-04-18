import { prisma } from "@/server/db";
import { getServerAuthSession, getCurrentUser } from "@/server/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { section: number };
}) {
  const session = await getServerAuthSession();
  const user = await getCurrentUser();
  const section = params.section;

  function route() {
    const router = useRouter();
    router.push(`/play/${section}/${user?.level}`);
  }

  if (!session) {
    return (
      <main>
        Not logged in
        <Link href="/">Home</Link>
      </main>
    );
  } else if (isNaN(section) || Number(section) > 3) {
    return <main>Incorrect URL</main>;
  } else if (section > user!.section) {
    return (
      <main>
        You have not reached this section yet
        <Link href={`/play/${user!.section}/${user!.level}`}>
          Go to current level
        </Link>
      </main>
    );
  } else {
    return (
      <main>
        <Link href={`/play/${user!.section}/${user!.level}`}>
          Go to current level
        </Link>
      </main>
    );
  }
}
