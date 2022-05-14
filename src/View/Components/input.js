import React, { useState, useEffect } from 'react';
import './input.css';
import { useDispatch, useSelector } from 'react-redux';
import { setInput } from '../../Application/Redux/Reducers/inputs';

export default function Input({
	name,
	type,
	label,
	min,
	max,
	defaultValue,
	options,
	char
}) {
	const dispatch = useDispatch();
	const lastPrice = useSelector(state => state.inputs.last_price);
	const [value, setValue] = useState(defaultValue);

	const handleTxtInputChange = e => {
		if (!e.target.value) {
			setValue(0);
		} else {
			console.log(!isNaN(e.target.value));
			let data = !isNaN(e.target.value) ? e.target.value : value;
			setValue(data);
		}
	};

	useEffect(
		() => {
			dispatch(setInput({ value: value, name: name }));
		},
		[value]
	);

	useEffect(
		() => {
			if (name === 'price' && lastPrice) {
				console.log('lastprice: ', lastPrice);
				setValue(parseFloat(lastPrice));
			}
		},
		[lastPrice]
	);
	return (
		<div className="input">
			{type === 'text' &&
				<label>
					<div>
						{label}
						{char}
					</div>
					<input
						type="text"
						value={value}
						id={name}
						pattern="[0-9]*"
						onChange={e => {
							handleTxtInputChange(e);
						}}
					/>
				</label>}
			{type === 'range' &&
				<label>
					<div>
						<div className="label">
							{label}
						</div>
						<div className="value">
							{value}
						</div>
					</div>
					<input
						id={name}
						type="range"
						min={min}
						max={max}
						setp="1"
						value={value}
						onChange={e => {
							setValue(e.target.value);
						}}
					/>
				</label>}
			{type === 'select' &&
				<label>
					{label}
					<select
						value={value}
						onChange={e => {
							setValue(e.target.value);
						}}
					>
						{options.map(option => {
							return (
								<option value={option}>
									{option}
									{char}
								</option>
							);
						})}
					</select>
				</label>}
		</div>
	);
}
