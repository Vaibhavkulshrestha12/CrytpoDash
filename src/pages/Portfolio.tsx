import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { formatPrice, formatPercent } from '../lib/utils';

interface PortfolioAsset {
  id: string;
  coin_id: string;
  quantity: number;
  purchase_price: number;
  current_price?: number;
  name?: string;
  symbol?: string;
  image?: string;
}

export default function Portfolio() {
  const { user } = useAuthStore();
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!user) return;

      try {
        const { data: portfolioData, error: portfolioError } = await supabase
          .from('portfolio')
          .select('*')
          .eq('user_id', user.id);

        if (portfolioError) throw portfolioError;

        // Fetch current prices for all assets
        const coinIds = portfolioData.map(asset => asset.coin_id).join(',');
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}`
        );
        const priceData = await response.json();

        const updatedAssets = portfolioData.map(asset => {
          const coinData = priceData.find((coin: any) => coin.id === asset.coin_id);
          return {
            ...asset,
            current_price: coinData?.current_price,
            name: coinData?.name,
            symbol: coinData?.symbol,
            image: coinData?.image,
          };
        });

        setAssets(updatedAssets);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Please sign in to view your portfolio</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-800 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4">
        {error}
      </div>
    );
  }

  const totalValue = assets.reduce(
    (sum, asset) => sum + (asset.current_price || 0) * asset.quantity,
    0
  );

  const totalCost = assets.reduce(
    (sum, asset) => sum + asset.purchase_price * asset.quantity,
    0
  );

  const totalProfit = totalValue - totalCost;
  const profitPercentage = (totalProfit / totalCost) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400">Portfolio Value</h3>
          <p className="text-2xl font-semibold mt-2">{formatPrice(totalValue)}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400">Total Profit/Loss</h3>
          <p className={`text-2xl font-semibold mt-2 ${totalProfit >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
            {formatPrice(totalProfit)}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400">Return</h3>
          <p className={`text-2xl font-semibold mt-2 ${profitPercentage >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
            {formatPercent(profitPercentage)}
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Holdings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Avg Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Current Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Profit/Loss</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {assets.map((asset) => {
              const value = (asset.current_price || 0) * asset.quantity;
              const cost = asset.purchase_price * asset.quantity;
              const profit = value - cost;
              const profitPercent = (profit / cost) * 100;

              return (
                <tr key={asset.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={asset.image} alt={asset.name} className="w-6 h-6" />
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-gray-400">{asset.symbol?.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{asset.quantity}</div>
                    <div className="text-sm text-gray-400">{formatPrice(value)}</div>
                  </td>
                  <td className="px-6 py-4">{formatPrice(asset.purchase_price)}</td>
                  <td className="px-6 py-4">{formatPrice(asset.current_price || 0)}</td>
                  <td className="px-6 py-4">
                    <div className={profit >= 0 ? 'text-crypto-green' : 'text-crypto-red'}>
                      {formatPrice(profit)}
                      <span className="text-sm ml-1">({formatPercent(profitPercent)})</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}