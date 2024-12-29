import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useCryptoStore } from '../../store/cryptoStore';
import { formatPrice, formatPercent, formatMarketCap } from '../../lib/utils';
import CoinSparkline from './CoinSparkline';

export default function CoinList() {
  const { coins, loading, favorites, toggleFavorite } = useCryptoStore();

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-800 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Favorite
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Coin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                24h Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Last 7 Days
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {coins.map((coin) => (
              <tr key={coin.id} className="hover:bg-gray-700">
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleFavorite(coin.id)}
                    className="text-gray-400 hover:text-yellow-400"
                  >
                    <Star
                      className={favorites.includes(coin.id) ? 'fill-yellow-400 text-yellow-400' : ''}
                    />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/coin/${coin.id}`} className="flex items-center space-x-3">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4">{formatPrice(coin.current_price)}</td>
                <td className="px-6 py-4">
                  <span
                    className={
                      coin.price_change_percentage_24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'
                    }
                  >
                    {formatPercent(coin.price_change_percentage_24h)}
                  </span>
                </td>
                <td className="px-6 py-4">{formatMarketCap(coin.market_cap)}</td>
                <td className="px-6 py-4 w-40">
                  <CoinSparkline data={coin.sparkline_in_7d.price} change={coin.price_change_percentage_7d_in_currency} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}