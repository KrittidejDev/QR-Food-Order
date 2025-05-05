// app/dashboard/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// import Sidebar from "@/components/Widgets/SidebarWidget";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppSidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">
          <SidebarTrigger />
          <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
