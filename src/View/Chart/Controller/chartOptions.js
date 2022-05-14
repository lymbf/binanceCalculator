const scales_options = {
	y: {
		grid: {
			color: 'rgba(160, 160, 160, 0.152)',
			borderWidth: 7,
			borderDash: [5, 3],
			offset: false
		},
		title: {
			text: 'Price $',
			display: true,
			color: 'white'
		},
		ticks: {
			callback: function(value) {
				return parseFloat(value).toFixed(4) + '$';
			},
			padding: 2,
			color: 'rgba(13, 143, 194, 0.877)'
		}
	}
};

const zoom_options = {
	pan: {
		enabled: true,
		mode: 'xy'
	},
	zoom: {
		wheel: {
			enabled: true
		},
		pinch: {
			enabled: false
		},
		mode: 'xy',
		overScaleMode: 'y'
	}
};

const legend_options = {
	display: false,
	labels: {
		color: 'rgb(255, 99, 132)'
	}
};

const dataset_options = {
	borderWidth: {
		up: 0,
		down: 0
	},
	borderColor: {
		up: 'rgb(81, 199, 199)',
		down: 'rgb(17, 44, 44)'
	},
	color: {
		up: 'rgb(128, 255, 255)',
		down: 'rgb(124, 77, 77)'
	}
};

const liq_annotation_options = {
	borderColor: 'rgb(255, 99, 132)',
	borderWidth: 2,
	label: {
		backgroundColor: 'rgb(255, 99, 132)',
		content: 'Liquiadtion Level',
		borderWidth: 1,
		color: 'black',
		enabled: true,
		position: '-20%',
		font: { size: 11 },
		padding: 3
	}
};

const entrP_annotation_options = {
	borderColor: 'rgb(136, 237, 255)',
	borderDash: [4, 3],
	borderWidth: 1,
	label: {
		content: 'Liquiadtion Level',
		borderWidth: 1,
		color: 'white'
	},
	label: {
		backgroundColor: 'rgb(136, 237, 255)',
		content: 'Entry Price',
		borderWidth: 1,
		color: 'black',
		enabled: true,
		position: '-20%',
		font: { size: 11 },
		padding: 3
	}
};

const parseDataset = data => {
	return data.map(item => {
		return {
			x: new Date(parseInt(item[0])).getTime(),
			o: parseFloat(item[1]).toFixed(4),
			h: parseFloat(item[2]).toFixed(4),
			l: parseFloat(item[3]).toFixed(4),
			c: parseFloat(item[4]).toFixed(4)
		};
	});
};

export {
	scales_options,
	zoom_options,
	legend_options,
	dataset_options,
	parseDataset,
	liq_annotation_options,
	entrP_annotation_options
};
