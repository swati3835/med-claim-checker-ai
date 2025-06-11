
import { Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  title: string;
  onToggleSidebar: () => void;
}

const AdminHeader = ({ title, onToggleSidebar }: AdminHeaderProps) => {
  return (
    <header className="bg-white border-b border-purple-200 medical-shadow">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-purple-600 hover:bg-purple-100"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-purple-900">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-purple-600 hover:bg-purple-100">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-purple-600 hover:bg-purple-100">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
