import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createChart, IChartApi } from 'lightweight-charts';
import { formatPrice, formatPercent } from '../lib/utils';

export default function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let chart: IChartApi | null = null;
    const container = document.getElementById('chart');

    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&sparkline=true`
        );
        const data = await response.json();
        setCoin(data);

        if (container && data.market_data.sparkline_7d.price) {
          chart = createChart(container, {
            height: 400,
            layout: {
              background: { color: 'transparent' },
              textColor: '#d1d5db',
            },
            grid: {
              vertLines: { color: '#374151' },
              horzLines: { color: '#374151' },
            },
          });

          const lineSeries = chart.addLineSeries({
            color: '#60a5fa',
            lineWidth: 2,
          });

          lineSeries.setData(
            data.market_data.sparkline_7d.price.map((price: number, index: number) => ({
              time: Math.floor(Date.now() / 1000) - (168 - index) * 3600,
              value: price,
            }))
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch coin data');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();

    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-40 bg-gray-800 rounded-lg" />
        <div className="h-96 bg-gray-800 rounded-lg" />
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4">
        {error || 'Failed to load coin data'}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
          <div>
            <h1 className="text-2xl font-bold">{coin.name}</h1>
            <p className="text-gray-400">{coin.symbol.toUpperCase()}</p>
          </div>
          <div className="ml-auto">
            <div className="text-2xl font-bold">
              {formatPrice(coin.market_data.current_price.usd)}
            </div>
            <div
              className={
                coin.market_data.price_change_percentage_24h >= 0
                  ? 'text-crypto-green'
                  : 'text-crypto-red'
              }
            >
              {formatPercent(coin.market_data.price_change_percentage_24h)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div id="chart" className="w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Market Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Market Cap</span>
              <span>{formatPrice(coin.market_data.market_cap.usd)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">24h Volume</span>
              <span>{formatPrice(coin.market_data.total_volume.usd)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Circulating Supply</span>
              <span>{coin.market_data.circulating_supply.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Price Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">All-Time High</span>
              <span>{formatPrice(coin.market_data.ath.usd)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">All-Time Low</span>
              <span>{formatPrice(coin.market_data.atl.usd)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Price Change (7d)</span>
              <span className={
                coin.market_data.price_change_percentage_7d >= 0
                  ? 'text-crypto-green'
                  : 'text-crypto-red'
              }>
                {formatPercent(coin.market_data.price_change_percentage_7d)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}