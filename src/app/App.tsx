import { AppProvider } from './provider/AppProvider';
import './styles/_reset.scss';
import './styles/_vars.scss';
import './styles/_global.scss';
import './styles/_animations.scss';
import { Provider } from 'react-redux';
import store from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GetAuthState } from '@/features/accountAuth/lib/getAuthState';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 5,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		},
	},
});

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
