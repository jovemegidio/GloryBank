import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen" style={{ background: "#0c0f1a" }}>
      <Sidebar />
      <div className="flex flex-1 flex-col transition-all duration-300 ml-[72px] lg:ml-[260px]">
        <Header userName={user.name} userEmail={user.email} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
