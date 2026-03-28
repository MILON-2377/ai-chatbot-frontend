import Sidebar from "@/src/modules/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full bg-[#050505] overflow-hidden">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.03)_0%,transparent_50%)] pointer-events-none" />

        <div className="relative z-10 h-full">{children}</div>
      </main>
    </div>
  );
}
