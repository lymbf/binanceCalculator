import React from 'react';
import './output.css';

export default function Output({ name, value, char }) {
	return (
		<div className="output">
			<div>
				{name}
			</div>
			<div>
				{value}
				{char}
			</div>
		</div>
	);
}
