import styles from './styles.module.scss';
import { FC, useState, useEffect, ChangeEvent } from 'react';
import { User } from 'types';
import { getUsers } from 'queries';
import { UsersList, Input, Alert } from 'components';

const App: FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string>('');
	const [searchPhrase, setSearchPhrase] = useState<string>('');
	const [filtredUsers, setFiltredUsers] = useState<User[]>([]);
	const [displayError, setDisplayError] = useState<boolean>(false);

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
				setDisplayError(true);
			}
		};

		fetchUsers();
	}, []);

	useEffect(() => {
		setFiltredUsers(
			users.filter((user: User) =>
				user.name.toLowerCase().includes(searchPhrase)
			)
		);
	}, [searchPhrase, users]);

	return (
		<div className={styles.app}>
			<h1 className={styles.heading}>Users List</h1>
			<Input
				type="text"
				disabled={!!error}
				placeholder={!!error ? 'Error.' : 'Search by user name...'}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setSearchPhrase(e.target.value.toLowerCase())
				}
			/>
			{filtredUsers.length ? (
				<UsersList users={filtredUsers} />
			) : (
				<p data-testid="search-no-users">No users found.</p>
			)}
			{displayError && (
				<Alert
					message={error}
					onAlertClose={() => setDisplayError(false)}
				/>
			)}
		</div>
	);
};

export default App;
