import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}

export default function SidebarLink({ to, icon: Icon, label, isActive }: SidebarLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors',
        isActive
          ? 'bg-gray-700 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-700'
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}