import styles from './styles.module.scss';
import { FC } from 'react';

const App: FC = () => (
	<div className={styles.app}>
		<p>users list</p>
		<p>{process.env.REACT_APP_API}</p>
	</div>
);

export default App;
