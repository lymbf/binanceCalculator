import './TVChart.css';
import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useChartCtrl from './Controller/chartController';
import Input from '../Components/input';
import {
	chartOptions,
	seriesOptions,
	priceFormat,
	liqLineOptions,
	entryPLineOptions,
	coinArray
} from './Controller/chartOptions';

export default function TVChart() {
	const chartRef = useRef();

	const [chart, setChart] = useState();
	const [series, setSeries] = useState();
	const [liqPriceLine, setLiqPriceLine] = useState();
	const [entryPriceLine, setEntryPriceLine] = useState();
	const { data, entryPrice, lastCandle } = useChartCtrl();
	const liqPrice = useSelector(state => state.outputs.liq_price);
	const handleResize = () => {
		chart.applyOptions({
			width: chartRef.current.clientWidth
		});
	};

	//Creating new chart everytime data changes ( timeframe / coin)

	useEffect(
		() => {
			if (data) {
				setChart(
					createChart(chartRef.current, {
						...chartOptions,
						width: chartRef.current.clientWidth,
						height: chartRef.current.clientHeight
					})
				);
			}
		},
		[data]
	);

	//setting up chart series

	useEffect(
		() => {
			if (chart) {
				const newSeries = chart.addCandlestickSeries({
					...seriesOptions
				});

				newSeries.setData(data);
				newSeries.applyOptions({
					priceFormat: priceFormat
				});
				setSeries(newSeries);
				window.addEventListener('resize', () => {
					handleResize();
				});
			}
			return () => {
				window.removeEventListener('resize', handleResize);

				chart && chart.remove();
			};
		},
		[chart]
	);

	// drawing lines on chart mount/change

	useEffect(
		() => {
			if (series) {
				setLiqPriceLine(
					series.createPriceLine({
						price: liqPrice,
						...liqLineOptions
					})
				);
				setEntryPriceLine(
					series.createPriceLine({
						price: entryPrice,
						...entryPLineOptions
					})
				);
			}
		},
		[series]
	);

	// updating lines on data change

	useEffect(
		() => {
			if (series) {
				if (liqPriceLine) {
					liqPriceLine.applyOptions({ price: liqPrice });
				}
				if (entryPriceLine) {
					entryPriceLine.applyOptions({
						price: entryPrice
					});
				}
			}
		},
		[liqPrice, entryPrice]
	);

	// updating last candle - realtime chart

	useEffect(
		() => {
			if (lastCandle && series) {
				series.update(lastCandle);
			}
		},
		[lastCandle]
	);
	return (
		<div className="chart-container">
			<Input
				name="interval"
				type="select"
				options={[
					'1m',
					'5m',
					'15m',
					'30m',
					'1h',
					'4h',
					'1d',
					'1w'
				]}
				defaultValue={'1h'}
			/>
			<Input
				name="symbol"
				type="select"
				options={coinArray}
				defaultValue={'BTCUSDT'}
			/>
			<div className="tv-chart" ref={chartRef} />
		</div>
	);
}
