import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useOutputCalc from '../../../Application/Controllers/outputCalc';
import { setInput } from '../../../Application/Redux/Reducers/inputs';
import { parseData, parseWSData } from './chartOptions';

export default function useChartCtrl() {
	const dispatch = useDispatch();
	const interval = useSelector(state => state.inputs.interval);
	const symbol = useSelector(state => state.inputs.symbol);
	const [data, setData] = useState(false);
	const [entryPrice, setEntryPrice] = useState(false);
	const [lastCandle, setLastCandle] = useState(false);
	const [socket, setSocket] = useState();
	const inputs = useSelector(state => state.inputs);
	const { getLastPrice } = useOutputCalc();

	const parseUrl = (interval, symbol) => {
		return `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=500`;
	};

	const getData = async (interval, symbol) => {
		let res = await fetch(parseUrl(interval, symbol), {
			method: 'GET'
		});
		res = await res.json();
		return res;
	};

	//establish websocket connection // close -> renew when coin/interval changes

	useEffect(
		() => {
			if (symbol && interval) {
				if (socket) {
					socket.close();
				}
				setSocket(
					new WebSocket(
						`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
					)
				);
			}
		},
		[interval, symbol]
	);

	//update state of last candle via websockets

	useEffect(
		() => {
			if (socket) {
				socket.onmessage = e => {
					let data = JSON.parse(e.data);
					console.log('ws msg');
					setLastCandle(parseWSData(data));
				};
			}
		},
		[socket]
	);

	//update data state whenever chosen coin / time interval changes

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
					setData(parseData(res));
				});
			}
		},
		[interval, symbol]
	);

	//update entry price state (chart) on input change

	useEffect(
		() => {
			if (inputs) {
				setEntryPrice(inputs.price);
			}
		},
		[inputs]
	);

	return { data, entryPrice, lastCandle };
}
