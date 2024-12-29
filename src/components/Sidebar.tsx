import { useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, Star } from 'lucide-react';
import SidebarLink from './sidebar/SidebarLink';
import FavoriteCoins from './sidebar/FavoriteCoins';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-800 h-[calc(100vh-4rem)] p-4 flex flex-col">
      <nav className="space-y-2">
        <SidebarLink
          to="/"
          icon={LayoutDashboard}
          label="Dashboard"
          isActive={location.pathname === '/'}
        />
        <SidebarLink
          to="/portfolio"
          icon={Wallet}
          label="Portfolio"
          isActive={location.pathname === '/portfolio'}
        />
      </nav>

      <div className="mt-8">
        <div className="flex items-center space-x-2 px-4 mb-4">
          <Star className="h-5 w-5 text-gray-400" />
          <h2 className="text-sm font-medium text-gray-400">Watchlist</h2>
        </div>
        <FavoriteCoins />
      </div>
    </div>
  );
}