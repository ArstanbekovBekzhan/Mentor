import { IRequest } from '@/types/mentor.interface'
import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
	value: number
}

interface initialState {
	isFetching: boolean
	request: IRequest[]
	error: boolean
}

export const mentorSlice = createSlice({
	name: 'user',
	initialState: <initialState>{
		isFetching: false,
		request: [],
		error: false,
	},
	reducers: {
		writingStart: state => {
			state.isFetching = true
			state.error = false
		},
		writingSuccess: state => {
			state.isFetching = false
			state.error = false
		},
		writingFailure: state => {
			state.isFetching = false
			state.error = true
		},
		getRequestSuccess: (state, action) => {
			state.request = action.payload
		},
	},
})

export const {
	writingStart,
	writingSuccess,
	writingFailure,
	getRequestSuccess,
} = mentorSlice.actions
export default mentorSlice.reducer
