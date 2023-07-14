import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Song_Myung } from "next/font/google";

const songMyung = Song_Myung({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={songMyung.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
