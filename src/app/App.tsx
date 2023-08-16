import { AppProvider } from './provider';
import './styles/_reset.scss';
import './styles/_vars.scss';
import './styles/_global.scss';
import { Provider } from 'react-redux';
import store from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WebSocketProvider } from '@/shared/providers/WebSocketProvider';

function App() {
	const queryClient = new QueryClient();

	return (
		<WebSocketProvider>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<AppProvider />
				</Provider>
			</QueryClientProvider>
		</WebSocketProvider>
	);
}

export default App;
