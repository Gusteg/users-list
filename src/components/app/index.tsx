import styles from './styles.module.scss';
import { FC, useState, useEffect } from 'react';
import { User } from 'types';
import { getUsers } from 'queries';
import { UsersList } from 'components';

const App: FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response: User[] = await getUsers();

				if (!response) {
					return;
				}

				setUsers(response);
			} catch (e) {
				setError((e as Error).message);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div className={styles.app}>
			<h1 className={styles.heading}>Users List</h1>
			<UsersList users={users} />
			{error && <p>{error}</p>}
		</div>
	);
};

export default App;
