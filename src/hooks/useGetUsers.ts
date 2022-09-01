import { useEffect, useState } from 'react';
import { User } from 'types';
import { getUsers } from 'queries';

export const useGetUsers = () => {
	const [data, setData] = useState<any | undefined>();
	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response: User[] = await getUsers();

				if (!response) {
					return;
				}

				setData(response);
			} catch (e) {
				setError((e as Error).message);
			}
		};

		fetchUsers();
	}, []);

	return { data, error };
};
