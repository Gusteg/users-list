import { User } from 'types';

export const getUsers = async (): Promise<User[]> => {
	const response = await fetch(`${process.env.REACT_APP_API}/users`);

	if (response.ok) {
		return await response.json();
	}

	const { status, statusText } = response;

	throw new Error(`Error: ${status}: ${statusText}`);
};
