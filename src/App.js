import './App.css';
import Main from './View/main';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import combinedReducers from './Application/Redux';
import Chart from './View/Chart/chart';
import TVChart from './View/TVChart/TVChart';

function App() {
	let store = createStore(
		combinedReducers,
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	);
	return (
		<div className="App">
			<Provider store={store}>
				{/* <Chart /> */}

				<Main />
				<TVChart />
			</Provider>
		</div>
	);
}

export default App;
