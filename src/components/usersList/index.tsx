import { FC } from 'react';
import styles from './styles.module.scss';
import { User } from 'types';

type UsersListProps = {
	users: User[];
};

const UsersList: FC<UsersListProps> = ({ users }) => (
	<ul className={styles.usersList} data-testid="list-container">
		{users.map((user: User, index: number) => (
			<li key={user.id}>
				<span>{index + 1}. </span>
				{user.name}
				<span> @{user.username}</span>
			</li>
		))}
	</ul>
);

export default UsersList;
