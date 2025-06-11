
import { NavLink, useNavigate } from "react-router-dom";
import { Home, BarChart3, FileText, Users, Settings, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  isOpen: boolean;
}

const AdminSidebar = ({ isOpen }: AdminSidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: BarChart3, path: "/admin" },
    { name: "Documents", icon: FileText, path: "/admin/documents" },
    { name: "Claims Review", icon: Users, path: "/admin/claims" },
    { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const handleBackToMain = () => {
    navigate("/");
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-purple-200 medical-shadow transition-all duration-300 z-30 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          {isOpen && (
            <div>
              <h2 className="font-bold text-purple-900">MediClaim</h2>
              <p className="text-xs text-purple-600">Admin Portal</p>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-purple-100 text-purple-900 border-l-4 border-purple-600'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {isOpen && <span className="font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 px-2">
        <Button
          onClick={handleBackToMain}
          variant="outline"
          className={`w-full ${isOpen ? 'justify-start' : 'justify-center'} gap-3`}
        >
          <Home className="w-4 h-4" />
          {isOpen && "Back to Main"}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
