import React, { useRef, useEffect, useState } from 'react';
import 'chartjs-adapter-luxon';
import './chart.css';
import Chart from 'chart.js/auto';
import {
	CandlestickController,
	CandlestickElement
} from 'chartjs-chart-financial';
import annotationPlugin from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';
import useChartData from './Controller/chartData';
import Input from '../Components/input';

Chart.register(
	CandlestickController,
	CandlestickElement,
	annotationPlugin,
	zoomPlugin
);

export default function MyChart() {
	const { data, liqPrice, options, entryPrice } = useChartData();
	const chartRef = useRef();
	const [myChart, setMyChart] = useState();

	useEffect(
		() => {
			if (chartRef && data && liqPrice) {
				if (!myChart) {
					setMyChart(new Chart(chartRef.current, options));
				} else {
					myChart.destroy();
					setMyChart(new Chart(chartRef.current, options));
				}
			}
		},
		[data]
	);

	useEffect(
		() => {
			if (myChart && liqPrice) {
				myChart.options.plugins.annotation.annotations[0].yMin = liqPrice;
				myChart.options.plugins.annotation.annotations[0].yMax = liqPrice;
				myChart.update();
			}
		},
		[liqPrice]
	);

	useEffect(
		() => {
			if (myChart && entryPrice) {
				myChart.options.plugins.annotation.annotations[1].yMin = entryPrice;
				myChart.options.plugins.annotation.annotations[1].yMax = entryPrice;
				myChart.update();
			}
		},
		[entryPrice]
	);

	useEffect(
		() => {
			if (myChart) {
				setTimeout(() => {
					myChart.zoom(1.6);
					myChart.pan(
						{
							x: -450
						},
						undefined,
						'active'
					);
				}, 100);
			}
		},
		[myChart]
	);

	return (
		<div className="chart">
			<Input
				name="interval"
				type="select"
				options={['1m', '5m', '15m', '30m', '1h', '4h', '1d']}
				defaultValue={'1h'}
			/>
			<Input
				name="symbol"
				type="select"
				options={[
					'BTCUSDT',
					'ETHUSDT',
					'LUNAUSDT',
					'SOLUSDT',
					'APEUSDT',
					'XRPUSDT',
					'TRXUSDT'
				]}
				defaultValue={'BTCUSDT'}
			/>
			<canvas
				ref={chartRef}
				id="myChart"
				width="500"
				height="400"
			/>
		</div>
	);
}
