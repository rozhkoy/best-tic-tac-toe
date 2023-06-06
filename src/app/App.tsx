import { AppProvider } from './provider';
import './styles/_reset.scss';
import './styles/_vars.scss';
import './styles/_global.scss';
import { Provider } from 'react-redux';
import store from './store';

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<AppProvider />
			</Provider>
		</div>
	);
}

export default App;
