import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useOutputCalc from '../../../Application/Controllers/outputCalc';
import { setInput } from '../../../Application/Redux/Reducers/inputs';
import {
	scales_options,
	zoom_options,
	legend_options,
	dataset_options,
	parseDataset,
	liq_annotation_options,
	entrP_annotation_options
} from './chartOptions';

export default function useChartData() {
	const parseUrl = (interval, symbol) => {
		return `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=500`;
	};

	const dispatch = useDispatch();
	const interval = useSelector(state => state.inputs.interval);
	const symbol = useSelector(state => state.inputs.symbol);
	const [data, setData] = useState(false);
	const [liqPrice, setLiqPrice] = useState(false);
	const [entryPrice, setEntryPrice] = useState(false);
	const inputs = useSelector(state => state.inputs);
	const { calcLiqPrice, getLastPrice } = useOutputCalc();

	const getData = async (interval, symbol) => {
		let res = await fetch(parseUrl(interval, symbol), {
			method: 'GET'
		});
		res = await res.json();
		return res;
	};

	const options = {
		type: 'candlestick',
		data: data,
		options: {
			scales: { ...scales_options },
			plugins: {
				legend: { ...legend_options },
				zoom: { ...zoom_options },
				annotation: {
					annotations: [
						{
							...liq_annotation_options,
							type: 'line',
							yMin: liqPrice,
							yMax: liqPrice
						},
						{
							...entrP_annotation_options,
							type: 'line',
							yMin: entryPrice,
							yMax: entryPrice
						}
					]
				}
			}
		}
	};

	useEffect(
		() => {
			if (symbol && interval) {
				getData(interval, symbol).then(res => {
					dispatch(
						setInput({
							name: 'last_price',
							value: getLastPrice(res)
						})
					);
					setData({
						datasets: [
							{
								...dataset_options,
								data: parseDataset(res)
							}
						]
					});
				});
			}
		},
		[interval, symbol]
	);

	useEffect(
		() => {
			if (inputs) {
				setLiqPrice(
					calcLiqPrice(
						inputs.balance,
						inputs.price,
						inputs.leverage,
						inputs.percentage,
						inputs.maker,
						inputs.position
					)
				);
				setEntryPrice(inputs.price);
			}
		},
		[inputs]
	);

	return { data, liqPrice, entryPrice, options };
}
