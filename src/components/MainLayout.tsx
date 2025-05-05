import React from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./sidebar";
import { ToastContainer } from "react-toastify";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
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
};

export default MainLayout;
