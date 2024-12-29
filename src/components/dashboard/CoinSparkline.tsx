import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

interface CoinSparklineProps {
  data: number[];
  change: number;
}

export default function CoinSparkline({ data, change }: CoinSparklineProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: 160,
      height: 50,
      layout: {
        background: { type: 'solid', color: 'transparent' },
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: { visible: false },
      timeScale: { visible: false },
      crosshair: { visible: false },
      handleScroll: false,
      handleScale: false,
    });

    const lineSeries = chart.addLineSeries({
      color: change >= 0 ? '#00ff88' : '#ff3358',
      lineWidth: 2,
    });

    lineSeries.setData(
      data.map((price, index) => ({
        time: index,
        value: price,
      }))
    );

    return () => {
      chart.remove();
    };
  }, [data, change]);

  return <div ref={chartContainerRef} />;
}