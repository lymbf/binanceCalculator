import { COST_MULTIPLIERS } from '../Consts';

export default function useOutputCalc() {
	const calcVolume = (b, p) => {
		return parseFloat(b / p).toFixed(4);
	};

	const calcMargin = (b, l) => {
		return parseFloat(b / l).toFixed(2);
	};

	const calcCosts = b => {
		return {
			maker: parseFloat(b * COST_MULTIPLIERS.maker).toFixed(2),
			taker: parseFloat(b * COST_MULTIPLIERS.taker).toFixed(2)
		};
	};

	const calcLiqPrice = (b, p, l, u, maker, position, x) => {
		const q = parseFloat(b / p);
		const bb = parseFloat(b);
		const costs = calcCosts(b);
		const c = parseFloat(costs[maker]);
		const m = parseFloat(b / l) + parseFloat(x);
		switch (position) {
			case 'long':
				return parseFloat(
					(m - c - bb) / (q * u / 100 - q)
				).toFixed(4);
			case 'short':
				return parseFloat(
					(m - c + bb) / (q * (u / 100) + q)
				).toFixed(4);
			default:
				return (
					parseFloat(p) +
					parseFloat(
						((m - c) / (q * p) -
							u / 100 * (m - c) / (q * p)) *
							p
					)
				);
		}
	};
	const calcLiqPerc = (b, p, l, u, maker, position, x) => {
		let liqP = calcLiqPrice(b, p, l, u, maker, position, x);
		switch (position) {
			case 'long':
				return -(1 - liqP / parseFloat(p)).toFixed(4);
			case 'short':
				return parseFloat(-(liqP / parseFloat(p) - 1)).toFixed(
					4
				);
		}
	};

	const getLastPrice = data => {
		return parseFloat(
			parseFloat(data[data.length - 1][4]) +
				parseFloat(data[data.length - 1][4] / 50)
		);
	};

	const getStopLossPrice = (perc, price, pos) => {
		console.log('pos: ', pos);
		switch (pos) {
			case 'long':
				return parseFloat((1 - perc / 100) * price).toFixed(4);
			case 'short':
				return parseFloat((1 + perc / 100) * price).toFixed(4);
		}
	};

	const getTakeProfitPrice = (perc, price, pos) => {
		switch (pos) {
			case 'short':
				return parseFloat((1 - perc / 100) * price).toFixed(4);
			case 'long':
				return parseFloat((1 + perc / 100) * price).toFixed(4);
		}
	};

	const getMoneyEarnedLost = (perc, price) => {
		return parseFloat(perc / 100 * price).toFixed(2);
	};

	return {
		calcVolume,
		calcMargin,
		calcCosts,
		calcLiqPrice,
		calcLiqPerc,
		getLastPrice,
		getStopLossPrice,
		getTakeProfitPrice,
		getMoneyEarnedLost
	};
}
