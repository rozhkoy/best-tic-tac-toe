import { AppProvider } from './provider/AppProvider';
import './styles/_reset.scss';
import './styles/_vars.scss';
import './styles/_global.scss';
import './styles/_animations.scss';
import { Provider } from 'react-redux';
import store from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GetTheme } from '@/features/theme/lib/GetTheme';
import { Footer } from '@/shared/ui/footer';
import { AppWrap } from '@/shared/ui/appWrap';

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
				<GetTheme>
					<AppWrap>
						<AppProvider />
						<Footer />
					</AppWrap>
				</GetTheme>
			</Provider>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	);
}

export default App;
