import { useEffect } from 'react';
import { useCryptoStore } from '../store/cryptoStore';
import CoinList from '../components/dashboard/CoinList';
import MarketOverview from '../components/dashboard/MarketOverview';
import TrendingCoins from '../components/dashboard/TrendingCoins';
import { fetchCryptoData } from '../lib/api';

export default function Dashboard() {
  const { setCoins, setLoading, setError } = useCryptoStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCryptoData();
        setCoins(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [setCoins, setLoading, setError]);

  return (
    <div className="space-y-6">
      <MarketOverview />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <CoinList />
        </div>
        <div>
          <TrendingCoins />
        </div>
      </div>
    </div>
  );
}