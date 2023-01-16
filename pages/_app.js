import React from 'react';
import { wrapper } from '../store';
import '../styles/globals.css';
//components
import Modal from '../components/Modal';

const _app = ({ Component, pageProps }) => {



	return (
		<>
			<Component {...pageProps} />
			<Modal/>
		</>
	)
};

export default wrapper.withRedux(_app);
