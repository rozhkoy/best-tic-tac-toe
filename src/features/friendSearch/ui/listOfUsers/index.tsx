import { ListWrap } from '@/shared/ui/listWrap';
import { ListOfUsersProps } from '../../types';
import React, { forwardRef } from 'react';
import { FriendItem } from '@/shared/ui/friendItem';
import { Nothing } from '@/shared/ui/nothing';

export const ListOfUsers = forwardRef<HTMLLIElement, ListOfUsersProps>(({ list, children }, ref) => {
	return (
		<ListWrap>
			{list.length &&
				(list[0].rows.length ? (
					list.map((page, pageIndex, pages) => {
						return (
							<React.Fragment key={pageIndex}>
								{page.rows.map(({ status, btnsStatus, nickname, userId, invitationId }, itemIndex, page) => {
									if (pageIndex === pages.length - 1 && itemIndex === page.length - 1) {
										return (
											<FriendItem ref={ref} key={userId + itemIndex} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{children(btnsStatus, { userId, invitationId }, { page: pageIndex, item: itemIndex }, status)}
											</FriendItem>
										);
									} else {
										return (
											<FriendItem key={userId + itemIndex} variant={'secondary'} src={''} status={status} nickname={nickname}>
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
				))}
		</ListWrap>
	);
});
