import React from "react";

import AppHeader from "./components/app-header";
import { SidebarProvider } from "../../contexts/sidebar-context";

interface Template1Props {
  children?: React.ReactNode;
}

// function Template1({ children }: React.PropsWithChildren) {
function Template1({ children }: Template1Props) {
  return (
    <SidebarProvider>
      <div className='min-h-screen xl:flex'>
        <div>
          sidebar <br />

        </div>
        <div className='flex-1 transition-all duration-300 ease-in-out lg:ml-[290px]'>
          <AppHeader />
          <div className='p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6'>
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Template1