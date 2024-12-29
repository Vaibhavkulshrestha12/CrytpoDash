import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { fetchTrendingCoins } from '../../lib/api';

export default function TrendingCoins() {
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchTrendingCoins();
        setTrending(data.coins.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch trending coins:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/2 mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-700 rounded mb-2" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        Trending Coins
      </h2>
      <div className="space-y-4">
        {trending.map((coin) => (
          <Link
            key={coin.item.id}
            to={`/coin/${coin.item.id}`}
            className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg"
          >
            <img src={coin.item.small} alt={coin.item.name} className="w-8 h-8" />
            <div>
              <div className="font-medium">{coin.item.name}</div>
              <div className="text-sm text-gray-400">{coin.item.symbol}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}