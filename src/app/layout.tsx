import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/components/theme-provider";
import { inter, lexendDeca } from "@/app/fonts";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";
import { cn } from "@/utils/class-names";
import "@/app/globals.css";
import NextProgress from "@/components/next-progress";

export const metadata: Metadata = {
  title: "Social Sync",
  description: "Social Sync is a social media management tool that helps you manage your social media accounts in one place.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning
    >
    <body
      // 💡 Prevent hydration warnings caused by third-party extensions, such as Grammarly.
      suppressHydrationWarning
      className={cn(inter.variable, lexendDeca.variable, "font-inter")}
    >
    <ThemeProvider>
      <NextProgress/>
      {children}
      <Toaster/>
      <GlobalDrawer/>
      <GlobalModal/>
    </ThemeProvider>
    </body>
    </html>
  );
}
