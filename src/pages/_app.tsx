// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import '@/styles/globals.css'
import { persistor, store } from '@/redux/store'
import '@/styles/custom-select.scss'

import { Poppins } from 'next/font/google'
import Head from 'next/head'
import { useEffect } from 'react'

const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const importTE = async () => (await import('tw-elements')).default
		importTE()
	}, [])
	return (
		<main className={poppins.className}>
			<Head>
				<title>MentorKG</title>
			</Head>
			<PersistGate loading={null} persistor={persistor}>
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			</PersistGate>
		</main>
	)
}
