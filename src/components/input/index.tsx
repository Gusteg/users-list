import { HTMLProps } from 'react';
import style from './style.module.scss';

const Input = (props: HTMLProps<HTMLInputElement>) => (
	<input {...props} className={style.input} data-testid="search-input" />
);

export default Input;
