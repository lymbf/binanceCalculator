import React from 'react';
import './table1.css';
import { useSelector } from 'react-redux';
import Input from '../Components/input';
import Output from '../Components/output';
import useOutputCalc from '../../Application/Controllers/outputCalc';

export default function Table1() {
	const { calcLiqPrice, calcLiqPerc } = useOutputCalc();
	const inputs = useSelector(state => state.inputs);
	const liqPrice = useSelector(state => state.outputs.liq_price);
	return (
		<div className="s2-table-one common-comp">
			<div>
				<div>
					<div>Liquidation Price</div>
					<Input
						type="select"
						name="position"
						options={['long', 'short']}
						defaultValue="long"
					/>
					<Input
						type="select"
						name="percentage"
						options={[
							0.4,
							0.5,
							0.65,
							1.0,
							1.2,
							2.4,
							2.5
						]}
						defaultValue={1}
						char="%"
					/>
					<Input
						type="select"
						name="maker"
						options={['maker', 'taker']}
						defaultValue={'maker'}
					/>
				</div>
				<div>
					{inputs && <Output value={liqPrice} />}
				</div>
			</div>
			<div>
				<div>% left for liquidation</div>
				<Output
					value={(parseFloat(
						calcLiqPerc(
							inputs.balance,
							inputs.price,
							inputs.leverage,
							inputs.percentage,
							inputs.maker,
							inputs.position,
							inputs.extra_margin
						)
					) * 100).toFixed(2)}
					char="%"
				/>
			</div>
		</div>
	);
}
