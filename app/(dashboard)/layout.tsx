import Sidebar from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row gap-10 items-start w-full">
      <Sidebar />
      {children}
    </div>
  );
}
