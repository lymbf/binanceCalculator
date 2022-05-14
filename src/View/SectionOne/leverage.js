import React, { useEffect } from 'react';
import './leverage.css';
import { useDispatch, useSelector } from 'react-redux';
import { setInput } from '../../Application/Redux/Reducers/inputs';
import Input from '../Components/input';

export default function Leverage() {
	let dispatch = useDispatch();
	let title = useSelector(state => state.inputs.title);
	useEffect(() => {
		dispatch(setInput({ value: 'yololo', name: 'title' }));
	}, []);
	return (
		<div className="leverage common-comp">
			<Input
				name="leverage"
				type="range"
				label="Leverage"
				min="1"
				max="125"
				defaultValue="50"
			/>
		</div>
	);
}
