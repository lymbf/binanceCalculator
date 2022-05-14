import React from 'react';
import './index.css';
import Leverage from './leverage';
import Table1 from './table1';

export default function SectionOne() {
	return (
		<div className="section-one section">
			<Leverage />
			<Table1 />
		</div>
	);
}
