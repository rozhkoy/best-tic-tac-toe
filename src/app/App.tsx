import { AppProvider } from './provider';
import './styles/_reset.scss';
import './styles/_vars.scss';
import './styles/_global.scss';
import './styles/_animations.scss';
import { Provider } from 'react-redux';
import store from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export const queryClient = new QueryClient();
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<AppProvider />
			</Provider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
