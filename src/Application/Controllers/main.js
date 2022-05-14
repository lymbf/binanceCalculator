import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setInput } from '../Redux/Reducers/inputs';
import { setOutput } from '../Redux/Reducers/outputs';
import useOutputCalc from './outputCalc';

export default function useMainController() {
	const dispatch = useDispatch();
	const inputs = useSelector(state => state.inputs);

	const [volume, setVolume] = useState(0);
	const [margin, setMargin] = useState(0);
	const [costs, setCosts] = useState();
	const [progress, setProgress] = useState(false);

	const {
		calcVolume,
		calcMargin,
		calcCosts,
		calcLiqPrice
	} = useOutputCalc();
	useEffect(
		() => {
			if (inputs && !progress) {
				setProgress(true);
				setVolume(calcVolume(inputs.balance, inputs.price));
				setMargin(calcMargin(inputs.balance, inputs.leverage));
				setCosts(calcCosts(inputs.balance));
				setProgress(true);
			}
		},
		[inputs]
	);

	useEffect(
		() => {
			if (inputs) {
				dispatch(
					setOutput({
						value: parseFloat(
							calcLiqPrice(
								inputs.balance,
								inputs.price,
								inputs.leverage,
								inputs.percentage,
								inputs.maker,
								inputs.position,
								inputs.extra_margin
							)
						).toFixed(4),
						name: 'liq_price'
					})
				);
			}
		},
		[inputs]
	);

	useEffect(
		() => {
			if (progress) {
				dispatch(setInput({ value: volume, name: 'volume' }));
				dispatch(setInput({ value: margin, name: 'margin' }));
				dispatch(setInput({ value: costs, name: 'costs' }));
				setProgress(false);
			}
		},
		[progress]
	);
}
