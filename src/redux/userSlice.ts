import { IFullUser, IToken, IUserReg } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
	value: number
}

interface initialState {
	email: string
	currentUser: IUserReg | null
	tokens: IToken
	isFetching: boolean
	error: boolean
}

export const userSlice = createSlice({
	name: 'user',
	initialState: <initialState>{
		email: '',
		currentUser: null,
		tokens: {
			access: '',
			refresh: '',
		},
		isFetching: false,
		error: false,
	},
	reducers: {
		loginStart: state => {
			state.isFetching = true
			state.error = false
		},
		loginSuccess: (state, action: PayloadAction<IFullUser>) => {
			state.isFetching = false
			state.tokens = {
				access: action.payload.access,
				refresh: action.payload.refresh,
			}
			state.email = action.payload.email
			state.error = false
		},
		loginFailure: state => {
			state.isFetching = false
			state.error = true
		},

		registerStart: state => {
			state.isFetching = true
			state.error = false
		},
		registerSuccess: state => {
			state.isFetching = false
			state.error = false
		},
		registerFailure: state => {
			state.isFetching = false
			state.error = true
		},

		refreshStart: state => {
			state.isFetching = true
			state.error = false
		},
		refreshSuccess: (state, action: PayloadAction<IToken>) => {
			state.isFetching = false
			state.tokens = {
				access: action.payload.access,
				refresh: action.payload.refresh,
			}
			state.error = false
		},
		refreshFailure: state => {
			state.isFetching = false
			state.error = true
		},

		restoreStart: state => {
			state.isFetching = true
			state.error = false
		},
		restoreSuccess: state => {
			state.isFetching = false
			state.error = false
		},
		restoreFailure: state => {
			state.isFetching = false
			state.error = true
		},

		forgotStart: state => {
			state.isFetching = true
			state.error = false
		},
		forgotSuccess: state => {
			state.isFetching = false
			state.error = false
		},
		forgotFailure: state => {
			state.isFetching = false
			state.error = true
		},

		changeStart: state => {
			state.isFetching = true
			state.error = false
		},
		changeSuccess: state => {
			state.isFetching = false
			state.error = false
		},
		changeFailure: state => {
			state.isFetching = false
			state.error = true
		},

		deleteStart: state => {
			state.isFetching = true
			state.error = false
		},
		deleteSuccess: state => {
			state.isFetching = false
			state.email = ''
			state.currentUser = null
			state.tokens = {
				access: '',
				refresh: '',
			}
			state.error = false
		},
		deleteFailure: state => {
			state.isFetching = false
			state.error = true
		},

		logoutSuccess: state => {
			state.isFetching = false
			state.error = false
			state.email = ''
			state.currentUser = null
			state.tokens = {
				access: '',
				refresh: '',
			}
		},

		updateStart: state => {
			state.isFetching = true
			state.error = false
		},
		updateSuccess: state => {
			state.isFetching = false
			state.error = false
		},
		updateFailure: state => {
			state.isFetching = false
			state.error = true
		},

		updateEmailStart: state => {
			state.isFetching = true
			state.error = false
		},
		updateEmailSuccess: (state, action: PayloadAction<string>) => {
			state.isFetching = false
			state.email = action.payload
			state.error = false
		},
		updateEmailFailure: state => {
			state.isFetching = false
			state.error = true
		},

		getStart: state => {
			state.isFetching = true
			state.error = false
		},
		getSuccess: (state, action: PayloadAction<IUserReg>) => {
			state.isFetching = false
			state.currentUser = action.payload
			state.error = false
		},
		getFailure: state => {
			state.isFetching = false
			state.error = true
		},
	},
})

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	registerStart,
	registerSuccess,
	registerFailure,
	refreshStart,
	refreshSuccess,
	refreshFailure,
	restoreStart,
	restoreSuccess,
	restoreFailure,
	forgotStart,
	forgotSuccess,
	forgotFailure,
	changeStart,
	changeSuccess,
	changeFailure,
	deleteStart,
	deleteSuccess,
	deleteFailure,
	logoutSuccess,
	updateStart,
	updateSuccess,
	updateFailure,
	updateEmailStart,
	updateEmailSuccess,
	updateEmailFailure,
	getStart,
	getSuccess,
	getFailure,
} = userSlice.actions
export default userSlice.reducer
