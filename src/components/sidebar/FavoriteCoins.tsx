import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useCryptoStore } from '../../store/cryptoStore';
import { formatPrice, formatPercent } from '../../lib/utils';

export default function FavoriteCoins() {
  const { coins, favorites, loading } = useCryptoStore();
  const favoriteCoins = coins.filter(coin => favorites.includes(coin.id));

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-700/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (favoriteCoins.length === 0) {
    return (
      <div className="text-gray-400 text-sm text-center p-4">
        Add coins to your watchlist by clicking the star icon
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {favoriteCoins.map(coin => (
        <Link
          key={coin.id}
          to={`/coin/${coin.id}`}
          className="block p-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={coin.image} alt={coin.name} className="w-6 h-6" />
              <div>
                <div className="font-medium">{coin.symbol.toUpperCase()}</div>
                <div className="text-sm text-gray-400">{formatPrice(coin.current_price)}</div>
              </div>
            </div>
            <div className={coin.price_change_percentage_24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'}>
              {formatPercent(coin.price_change_percentage_24h)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}