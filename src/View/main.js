import React from 'react';
import './main.css';
import Title from './Title';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './Section Three';
import useMainController from '../Application/Controllers/main';
import TradingViewWidget from 'react-tradingview-widget';
import Chart from './Chart/chart';

export default function Main() {
	useMainController();

	return (
		<div className="main">
			<Title />
			<SectionOne />
			<SectionTwo />
			{/* <SectionThree /> */}
			{/* <Chart /> */}
		</div>
	);
}
