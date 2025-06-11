
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

const StatsCard = ({ title, value, change, icon: Icon, color }: StatsCardProps) => {
  const colorClasses = {
    purple: "text-purple-600 bg-purple-100",
    green: "text-green-600 bg-green-100",
    orange: "text-orange-600 bg-orange-100",
    pink: "text-pink-600 bg-pink-100",
  };

  const changeColor = change.startsWith('+') ? 'text-green-600' : 'text-red-600';

  return (
    <Card className="medical-shadow hover:scale-105 transition-transform duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className={`text-sm ${changeColor}`}>{change} from last month</p>
          </div>
          <div className={`w-12 h-12 ${colorClasses[color as keyof typeof colorClasses]} rounded-full flex items-center justify-center`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
