import { useCallback, useEffect, useState } from 'react';
import { IFriendResponse, ISearchUsersByNickname, SearchModeTypes } from '../types';
import { getAllFriends, getAllRequestsForFriendship, searchUsersByNickname, sendConsentFriendship } from '../api';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import debounce from 'lodash/debounce';
import { IFindAndCount } from '@/shared/types/findAndCount';
import { useInView } from 'react-intersection-observer';
import { useMutation } from '@tanstack/react-query';
import { createFormData } from '@/shared/lib/CreateFormData';

export function usePlayerSearch(searchMode: SearchModeTypes): {
	searchBarState: string;
	changeHendler: (value: string) => void;
	result: Array<IFriendResponse>;
	searchResultCount: number;
	ref: (node: HTMLLIElement) => void;
	acceptFriendshipInvite: (inviteId: string) => void;
} {
	const LIMIT = 10;
	const PER_PAGE = 10;

	const [result, setResult] = useState<Array<IFriendResponse>>([]);
	const [searchResultCount, setSearchesultCount] = useState<number>(0);
	const [searchBarState, setSearchBarState] = useState<string>('');
	const userData = useAppSelector((state) => state.user);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [hasNextPage, setHasNextPage] = useState<boolean>(false);
	const { ref, inView } = useInView();

	const sendAcceptFriendshipInvite = useMutation({
		mutationFn: (formdata: FormData) => {
			return sendConsentFriendship(formdata);
		},
	});

	const searchBarDebounce = useCallback(
		debounce(({ query, userId, page, perPage, limit }) => sendQuerySearch({ query, userId, page, perPage, limit }), 300),
		[searchMode]
	);

	useEffect(() => {
		if (userData.isAuth) {
			changeHendler('');
		}
	}, [userData.isAuth]);

	useEffect(() => {
		if (inView && hasNextPage) {
			sendQuerySearch({ query: searchBarState, userId: userData.userId, page: currentPage, perPage: PER_PAGE, limit: LIMIT });
		}
	}, [inView, hasNextPage]);

	useEffect(() => {
		setSearchBarState('');
		setCurrentPage(1);
		setResult([]);
		searchBarDebounce({ query: '', userId: userData.userId, page: 1, perPage: PER_PAGE, limit: LIMIT });
	}, [searchMode]);

	async function sendQuerySearch({ query, userId, page, perPage, limit }: ISearchUsersByNickname) {
		let response: IFindAndCount<Array<IFriendResponse>>;

		switch (searchMode) {
			case 'Your friends':
				response = await getAllFriends({ query, userId, page, perPage, limit });
				break;
			case 'Friends requests':
				response = await getAllRequestsForFriendship({ userId, page, perPage, limit });
				break;
			case 'Global Search':
				response = await searchUsersByNickname({ query, userId, page, perPage, limit });
				break;
		}

		if (response) {
			console.log(response);
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
		searchBarDebounce({ query: value, userId: userData.userId, page: 1, perPage: PER_PAGE, limit: LIMIT });
	}

	function acceptFriendshipInvite(inviteId: string) {
		const formData: FormData = createFormData([{ key: 'inviteId', value: inviteId }]);
		console.log(formData.get('inviteId'));
		sendAcceptFriendshipInvite.mutate(formData);
	}

	return { searchBarState, changeHendler, result, searchResultCount, ref, acceptFriendshipInvite };
}
