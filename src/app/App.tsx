import { AppProvider } from './provider';
import './styles/_reset.scss';
import './styles/_vars.scss';
import './styles/_global.scss';
import { Provider } from 'react-redux';
import store from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<AppProvider />
			</Provider>
		</QueryClientProvider>
	);
}

export default App;
