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
    </div>
  );
}
