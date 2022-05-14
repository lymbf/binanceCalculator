import './TVChart.css';
import {
	CrosshairMode,
	createChart,
	ColorType,
	LineStyle
} from 'lightweight-charts';
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

	//drawing lines - liquidation, entry / update on data change

	useEffect(
		() => {
			if (series && liqPrice) {
				// series.removePriceLine(liqPriceLine);
				if (!liqPriceLine) {
					setLiqPriceLine(
						series.createPriceLine({
							price: liqPrice,
							...liqLineOptions
						})
					);
				} else {
					series.removePriceLine(liqPriceLine);
					setLiqPriceLine(
						series.createPriceLine({
							price: liqPrice,
							...liqLineOptions
						})
					);
				}
				if (!entryPriceLine) {
					setEntryPriceLine(
						series.createPriceLine({
							price: entryPrice,
							...entryPLineOptions
						})
					);
				} else {
					series.removePriceLine(entryPriceLine);
					setEntryPriceLine(
						series.createPriceLine({
							price: entryPrice,
							...entryPLineOptions
						})
					);
				}
			}
		},
		[liqPrice, entryPrice, series]
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
