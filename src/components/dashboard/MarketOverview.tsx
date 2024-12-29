import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useCryptoStore } from '../../store/cryptoStore';
import { formatPrice, formatPercent } from '../../lib/utils';

export default function MarketOverview() {
  const { coins } = useCryptoStore();

  const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0);
  const totalVolume = coins.reduce((sum, coin) => sum + coin.total_volume, 0);
  const btcDominance = coins[0]?.market_cap / totalMarketCap * 100 || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-400">Total Market Cap</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold">{formatPrice(totalMarketCap)}</p>
          <p className="ml-2 flex items-center text-sm text-crypto-green">
            <ArrowUpRight className="h-4 w-4" />
            {formatPercent(2.5)}
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-400">24h Volume</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold">{formatPrice(totalVolume)}</p>
          <p className="ml-2 flex items-center text-sm text-crypto-red">
            <ArrowDownRight className="h-4 w-4" />
            {formatPercent(-1.2)}
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-400">BTC Dominance</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold">{btcDominance.toFixed(1)}%</p>
          <p className="ml-2 flex items-center text-sm text-crypto-green">
            <ArrowUpRight className="h-4 w-4" />
            {formatPercent(0.8)}
          </p>
        </div>
      </div>
    </div>
  );
}