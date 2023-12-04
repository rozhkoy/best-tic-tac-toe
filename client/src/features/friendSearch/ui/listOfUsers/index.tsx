import { ListWrap } from '@/shared/ui/listWrap';
import { ListOfUsersProps } from '../../types';
import React, { forwardRef } from 'react';
import { FriendItem, FriendItemSkeleton } from '@/shared/ui/friendItem';
import { Nothing } from '@/shared/ui/nothing';

export const ListOfUsers = forwardRef<HTMLLIElement, ListOfUsersProps>(({ list, children, isLoading, isSuccess, isError }, ref) => {
	return (
		<ListWrap>
			{isLoading ? (
				[0, 1, 2, 3, 4].map((item) => <FriendItemSkeleton key={item} variant={'secondary'} size='small' />)
			) : list.length !== 0 && list[0].rows.length ? (
				list.map((page, pageIndex, pages) => {
					return (
						<React.Fragment key={pageIndex}>
							{page.rows.map(({ status, btnsStatus, nickname, userId, invitationId }, itemIndex, page) => {
								if (pageIndex === pages.length - 1 && itemIndex === page.length - Math.floor(page.length / 2)) {
									return (
										<FriendItem
											ref={ref}
											userId={userId}
											key={userId + itemIndex}
											variant={'secondary'}
											src={`https://source.boringavatars.com/beam/100/${nickname}`}
											status={status}
											nickname={nickname}>
											{children(btnsStatus, { userId, invitationId }, { page: pageIndex, item: itemIndex }, status)}
										</FriendItem>
									);
								} else {
									return (
										<FriendItem
											key={userId + itemIndex}
											userId={userId}
											variant={'secondary'}
											src={`https://source.boringavatars.com/beam/100/${nickname}`}
											status={status}
											nickname={nickname}>
											{children(btnsStatus, { userId, invitationId }, { page: pageIndex, item: itemIndex }, status)}
										</FriendItem>
									);
								}
							})}
						</React.Fragment>
					);
				})
			) : (
				<Nothing />
			)}
		</ListWrap>
	);
});
