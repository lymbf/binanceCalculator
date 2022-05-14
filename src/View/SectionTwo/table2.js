import React from 'react';
import { useSelector } from 'react-redux';
import './table2.css';
import Output from '../Components/output';
import Input from '../Components/input';
import useOutputCalc from '../../Application/Controllers/outputCalc';

export default function Table2() {
	const costs = useSelector(state => state.inputs.costs);
	const margin = useSelector(state => state.inputs.margin);
	const stopLossPerc = useSelector(state => state.inputs.stop_loss_perc);
	const takeProfitPerc = useSelector(
		state => state.inputs.take_profit_perc
	);
	const price = useSelector(state => state.inputs.price);
	const balance = useSelector(state => state.inputs.balance);
	const position = useSelector(state => state.inputs.position);
	const {
		getStopLossPrice,
		getTakeProfitPrice,
		getMoneyEarnedLost
	} = useOutputCalc();
	return (
		<div className="s2-table-two common-comp">
			<div>
				<div>
					<div>
						<h2>Costs</h2>
					</div>
					{costs &&
						<div>
							<Output
								name="Maker"
								value={costs.maker}
								char="$"
							/>
							<Output
								name="Taker"
								value={costs.taker}
								char="$"
							/>
						</div>}
				</div>
				<div>
					<div>
						<h2>Margin + Costs</h2>
					</div>
					{costs &&
						<div>
							<Output
								name="Maker"
								value={(margin -
									costs.maker).toFixed(2)}
								char="$"
							/>
							<Output
								name="Taker"
								value={(margin -
									costs.taker).toFixed(2)}
								char="$"
							/>
						</div>}
				</div>
			</div>
			<div className="stop-loss-container">
				<div>
					<div>
						<div>
							<h2>Stop Loss</h2>
						</div>
						<Input
							type="select"
							name="stop_loss_perc"
							options={[1, 2, 3, 4, 5, 10, 20]}
							defaultValue={2}
							char={'%'}
						/>
					</div>
					<div>
						{stopLossPerc &&
							<Output
								value={getStopLossPrice(
									stopLossPerc,
									price,
									position
								)}
								char={'$'}
							/>}
					</div>
				</div>
				<div>
					<div>
						<div>
							<h2>Take Profit</h2>
						</div>
						<Input
							type="select"
							name="take_profit_perc"
							defaultValue={5}
							options={[1, 2, 3, 4, 5, 10, 20]}
							char={'%'}
						/>
					</div>
					<div>
						{takeProfitPerc &&
							<Output
								value={getTakeProfitPrice(
									takeProfitPerc,
									price,
									position
								)}
								char={'$'}
							/>}
					</div>
				</div>
			</div>
			<div>
				<div>
					<div>
						<h3>Est. Loss</h3>
					</div>
					<Output
						value={getMoneyEarnedLost(
							stopLossPerc,
							balance
						)}
						char={'$'}
					/>
				</div>
				<div>
					<div>
						<h3>Est. Profit</h3>
					</div>
					<Output
						value={getMoneyEarnedLost(
							takeProfitPerc,
							balance
						)}
						char={'$'}
					/>
				</div>
			</div>
		</div>
	);
}
