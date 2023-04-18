import "@/styles/globals.css";

export const metadata = {
  title: "Crypt@trix 2023",
  description: "Tagore International School's Annual Cryptic Hunt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full">{children}</body>
    </html>
  );
}
