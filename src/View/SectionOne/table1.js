import React, { useEffect, useState } from 'react';
import './table1.css';
import Input from '../Components/input';
import Output from '../Components/output';
import { useSelector } from 'react-redux';

export default function Table1() {
	const volume = useSelector(state => state.inputs.volume);
	const margin = useSelector(state => state.inputs.margin);

	return (
		<div className="table-one common-comp">
			<div>
				<Input
					name="balance"
					type="text"
					label="Balance"
					defaultValue="1000"
				/>
				<Input
					name="price"
					type="text"
					label="Price"
					defaultValue="38000"
				/>
				<Output name="Margin" value={margin} />
				<Output name="Volume" value={volume} />
			</div>
			<div>
				<Input
					name="extra_margin"
					type="text"
					label="Add Margin"
					defaultValue="0"
				/>
			</div>
		</div>
	);
}
