import { CrosshairMode, ColorType, LineStyle } from 'lightweight-charts';

const parseData = data => {
	return data.map(item => {
		console.log(new Date(parseFloat(item[0])).getTime());
		return {
			time: Math.floor(
				new Date(parseFloat(item[0])).getTime() / 1000
			),
			open: parseFloat(item[1]).toFixed(4),
			high: parseFloat(item[2]).toFixed(4),
			low: parseFloat(item[3]).toFixed(4),
			close: parseFloat(item[4]).toFixed(4)
		};
	});
};

const parseWSData = data => {
	return {
		time: Math.floor(new Date(parseFloat(data.k.t)).getTime() / 1000),
		open: parseFloat(data.k.o).toFixed(4),
		high: parseFloat(data.k.h).toFixed(4),
		low: parseFloat(data.k.l).toFixed(4),
		close: parseFloat(data.k.c).toFixed(4)
	};
};

const chartOptions = {
	layout: {
		backgroundColor: 'rgb(0, 23, 31)',
		textColor: 'rgba(255, 255, 255, 0.9)'
	},
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0.1)'
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0.1)'
		}
	},
	crosshair: {
		mode: CrosshairMode.Normal
	},
	rightPriceScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)'
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
		timeVisible: true,
		fixLeftEdge: true
	}
};

const seriesOptions = {
	upColor: 'rgb(55, 194, 55)',
	downColor: 'rgb(163, 50, 50)',
	borderDownColor: 'rgb(163, 50, 50)',
	borderUpColor: 'rgb(55, 194, 55)',
	wickDownColor: 'rgb(163, 50, 50)',
	wickUpColor: 'rgb(55, 194, 55)'
};

const priceFormat = {
	type: 'price',
	precision: 4,
	minMove: 0.0001
};

const liqLineOptions = {
	color: '#be1238',
	lineWidth: 1,
	lineStyle: LineStyle.Solid,
	axisLabelVisible: true,
	title: 'Liq. Price'
};

const entryPLineOptions = {
	color: 'rgb(86, 204, 243)',
	lineWidth: 1,
	lineStyle: LineStyle.Dashed,
	axisLabelVisible: true,
	title: 'Entry Price'
};

const coinArray = [
	'BTCUSDT',
	'ETHUSDT',
	'LUNAUSDT',
	'SOLUSDT',
	'APEUSDT',
	'XRPUSDT',
	'TRXUSDT',
	'GALUSDT',
	'DOTUSDT',
	'IOTAUSDT',
	'AVAXUSDT',
	'MANAUSDT',
	'NEARUSDT',
	'GALAUSDT',
	'RUNEUSDT',
	'ATOMUSDT'
];

export {
	parseData,
	parseWSData,
	chartOptions,
	seriesOptions,
	priceFormat,
	liqLineOptions,
	entryPLineOptions,
	coinArray
};
