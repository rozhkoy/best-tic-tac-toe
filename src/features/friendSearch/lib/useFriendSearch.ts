import { useCallback, useEffect, useState } from 'react';
import { ISearchUsersByNickname, SearchModeTypes } from '../types';
import { searchUsersByNickname } from '../api';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import debounce from 'lodash/debounce';
import { IFindAndCount } from '@/shared/types/findAndCount';
import { IUserResponse } from '@/features/accountAuth/types';
import { useInView } from 'react-intersection-observer';

export function usePlayerSearch(searchMode: SearchModeTypes): {
	searchBarState: string;
	changeHendler: (value: string) => void;
	result: Array<IUserResponse>;
	searchResultCount: number;
	ref: (node: HTMLLIElement) => void;
} {
	const LIMIT = 10;
	const PER_PAGE = 10;

	const [result, setResult] = useState<Array<IUserResponse>>([]);
	const [searchResultCount, setSearchesultCount] = useState<number>(0);
	const [searchBarState, setSearchBarState] = useState<string>('');
	const userData = useAppSelector((state) => state.user);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [hasNextPage, setHasNextPage] = useState<boolean>(false);
	const { ref, inView } = useInView();

	const searchBarDebounce = useCallback(
		debounce(({ query, userId, page, perPage, limit }) => sendQuerySearch({ query, userId, page, perPage, limit }), 300),
		[]
	);

	useEffect(() => {
		if (userData.isAuth) {
			changeHendler('');
		}
	}, [userData.isAuth]);

	useEffect(() => {
		setSearchBarState('');
		changeHendler('');
	}, [searchMode]);

	useEffect(() => {
		if (inView && hasNextPage) {
			sendQuerySearch({ query: searchBarState, userId: userData.userId, page: currentPage, perPage: PER_PAGE, limit: LIMIT });
		}
	}, [inView, hasNextPage]);

	async function sendQuerySearch({ query, userId, page, perPage, limit }: ISearchUsersByNickname) {
		let response: IFindAndCount<Array<IUserResponse>>;
		switch (searchMode) {
			case 'Your friends':
				response = await searchUsersByNickname({ query, userId, page, perPage, limit });
				break;
			case 'Friends requests':
				response = await searchUsersByNickname({ query, userId, page, perPage, limit });
				break;
			case 'Global Search':
				response = await searchUsersByNickname({ query, userId, page, perPage, limit });
				break;
		}

		if (response) {
			console.log('response');
			setResult((prev) => [...prev, ...response.rows]);
			setSearchesultCount(response.count);
			setHasNextPage(response.count / PER_PAGE > currentPage);
			setCurrentPage((prev) => {
				return ++prev;
			});
		}
	}

	function changeHendler(value: string) {
		setResult([]);
		setCurrentPage(1);
		setSearchBarState(value);
		searchBarDebounce({ query: value, userId: userData.userId, page: currentPage, perPage: PER_PAGE, limit: LIMIT });
	}

	return { searchBarState, changeHendler, result, searchResultCount, ref };
}
