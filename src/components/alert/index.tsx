import { FC } from 'react';
import style from './style.module.scss';

type AlertProps = {
	message: string;
	onAlertClose: any;
};

const Alert: FC<AlertProps> = ({ message, onAlertClose }) => (
	<div className={style.alert}>
		<button onClick={onAlertClose} className={style.alertCloseBtn}>
			Close
		</button>
		<p>{message}</p>
	</div>
);

export default Alert;
