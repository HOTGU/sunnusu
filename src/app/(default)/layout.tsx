import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "태양누수",
  description:
    "누수탐지, 방수설비, 방수공사, 누수공사, 인천누수, 계양구누수, 서구누수",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <Navbar currentUser={currentUser} />
      <Toaster />
      <div className="pt-16">{children}</div>
    </div>
  );
}
