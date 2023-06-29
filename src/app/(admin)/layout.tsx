import Link from "next/link";
import { redirect } from "next/navigation";

import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import UploadModal from "@/components/modals/UploadModal";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  if (!user.is_admin) redirect("/");

  return (
    <Container>
      <Link href="/" className="inline-block">
        <nav className="p-2 my-2 rounded bg-sky-500 w-fit text-white hover:opacity-70 transition">
          홈페이지로 돌아가기
        </nav>
      </Link>
      <UploadModal />
      {children}
    </Container>
  );
}
