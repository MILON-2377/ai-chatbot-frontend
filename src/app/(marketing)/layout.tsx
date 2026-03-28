import { Toaster } from "sonner";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>nav</div>

      <main>{children}</main>

      <footer>footer</footer>

      {/* sonner */}
      <Toaster richColors position="top-right" />
    </div>
  );
}
