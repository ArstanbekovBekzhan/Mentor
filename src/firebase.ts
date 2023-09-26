// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: 'AIzaSyBknsI7TxwkTZxng_Xe1kBldbOG8dzfboQ',
	authDomain: 'mentorkg-59875.firebaseapp.com',
	databaseURL:
		'https://mentorkg-59875-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'mentorkg-59875',
	storageBucket: 'mentorkg-59875.appspot.com',
	messagingSenderId: '655817295085',
	appId: '1:655817295085:web:2c8a4d3e375c4d8035b8e4',
	// measurementId: 'G-DKEP79ZDGT',
}

const app = initializeApp(firebaseConfig)

export default app
