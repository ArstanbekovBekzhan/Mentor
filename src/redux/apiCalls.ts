import { Dispatch, SetStateAction } from 'react'
import { NextRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import {
	IAccepted,
	IAccess,
	IDenied,
	IDispatch,
	IMentee,
	INewPassword,
	IPassToRestore,
	IRefresh,
	IUserLog,
	IUserReg,
	IUserStatus,
	IUserToEdit,
} from '@/types/types'
import { IMentor } from '@/types/mentor.interface'

import {
	loginFailure,
	loginStart,
	loginSuccess,
	registerFailure,
	registerStart,
	registerSuccess,
	restoreFailure,
	restoreStart,
	restoreSuccess,
	forgotStart,
	forgotSuccess,
	forgotFailure,
	changeStart,
	changeSuccess,
	changeFailure,
	deleteStart,
	deleteSuccess,
	deleteFailure,
	refreshStart,
	refreshSuccess,
	refreshFailure,
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
} from './userSlice'
import { writingStart, writingSuccess, writingFailure } from './mentorSlice'

export interface IProps {
	data: IUserReg
}

export const API = 'https://mentorkgapi.pythonanywhere.com/'

export const publicReq = axios.create({
	baseURL: API,
})

export const register = async (
	dispatch: Dispatch<IDispatch>,
	user: IUserReg,
	setModal: Dispatch<SetStateAction<boolean>>
) => {
	dispatch(registerStart())
	try {
		const res = await publicReq.post(`account/register/`, user)
		console.log(res.status, res.data)
		toast.success('Вы успешно зарегистрировались', {
			style: {
				borderRadius: '6px',
				background: '#333',
				color: '#fff',
				padding: '20px auto',
				fontSize: '20px',
			},
		})
		dispatch(registerSuccess())
		setModal(true)
	} catch (err) {
		console.log(err)
		dispatch(registerFailure())
		toast.error('Ошибка регистрации', {
			style: {
				borderRadius: '6px',
				background: '#333',
				color: '#fff',
				padding: '20px auto',
				fontSize: '20px',
			},
		})
	}
}

export const login = async (
	dispatch: Dispatch<IDispatch>,
	user: IUserLog,
	router: NextRouter
) => {
	dispatch(loginStart())
	try {
		const res = await publicReq.post(`account/login/`, user)
		console.log('login', res.status)
		console.log(res.data.access)
		toast.success('Вы успешно вошли', {
			style: {
				borderRadius: '6px',
				background: '#333',
				color: '#fff',
				padding: '20px auto',
				fontSize: '20px',
			},
		})
		dispatch(loginSuccess({ ...res.data, email: user.email }))
		router.push(`/profile/my-profile?t=${res.data.access}`)
	} catch (err) {
		dispatch(loginFailure())
		toast.error('Ошибка входа', {
			style: {
				borderRadius: '6px',
				background: '#333',
				color: '#fff',
				padding: '20px auto',
				fontSize: '20px',
			},
		})
	}
}

export const forgotPassword = async (
	dispatch: Dispatch<IDispatch>,
	email: { email: string },
	setEmailValid: Dispatch<SetStateAction<boolean>>
) => {
	dispatch(forgotStart())
	try {
		await publicReq.post(`account/restore-password/`, email)
		setEmailValid(true)
		dispatch(forgotSuccess())
	} catch (err) {
		dispatch(forgotFailure())
	}
}

export const restorePassword = async (
	dispatch: Dispatch<IDispatch>,
	newPassword: IPassToRestore,
	setError: Dispatch<SetStateAction<boolean>>
) => {
	dispatch(restoreStart())
	try {
		const res = await publicReq.post(
			`account/set-restored-password/`,
			newPassword
		)
		console.log('password restored', res.status)
		dispatch(restoreSuccess())
		setError(false)
		toast.success('Пароль восстановлен', {
			style: {
				borderRadius: '6px',
				background: '#333',
				color: '#fff',
				padding: '20px auto',
				fontSize: '20px',
			},
		})
	} catch (err) {
		dispatch(restoreFailure())
		console.log(1234)
		toast.error('Пароль не восстанавливается', {
			style: {
				borderRadius: '6px',
				background: '#333',
				color: '#fff',
				padding: '20px auto',
				fontSize: '20px',
			},
		})
	}
}

export const changePassword = async (
	dispatch: Dispatch<IDispatch>,
	newPassword: INewPassword,
	token: string | undefined
) => {
	dispatch(changeStart())

	const Authorization = `Bearer ${token}`

	const config = {
		headers: {
			Authorization: Authorization,
		},
	}

	try {
		const res = await publicReq.post(
			`account/change-password/`,
			newPassword,
			config
		)
		dispatch(changeSuccess())
		console.log('password changed', res.status, res.statusText)
		toast.success('пароль изменен', {
			style: {
				borderRadius: '6px',
				background: '#333',
				color: '#fff',
				padding: '20px auto',
				fontSize: '20px',
			},
		})
	} catch (err) {
		dispatch(changeFailure())
		console.log(err)
		toast.error('Ошибка смены пароля', {
			style: {
				borderRadius: '6px',
				background: '#333',
				color: '#fff',
				padding: '20px auto',
				fontSize: '20px',
			},
		})
	}
}

export const deleteAccount = async (
	dispatch: Dispatch<IDispatch>,
	user: IUserLog,
	token: string | undefined
) => {
	dispatch(deleteStart())

	try {
		const Authorization = `Bearer ${token}`

		const config = {
			headers: {
				Authorization: Authorization,
			},
		}

		const res = await publicReq.post(`account/delete-account/`, user, config)
		dispatch(deleteSuccess())

		console.log('account deleted', res.status, res.statusText)
	} catch (err) {
		dispatch(deleteFailure())
	}
}

interface IData {
	data: IAccess
	status: number
}

export const tokenRefresh = async (
	dispatch: Dispatch<IDispatch>,
	token: IRefresh,
	setStatus: Dispatch<SetStateAction<number>>
) => {
	dispatch(refreshStart())
	try {
		const { data, status }: IData = await publicReq.post(
			`account/token/refresh/`,
			token
		)
		const tokens = {
			access: data.access,
			refresh: token.refresh,
		}
		dispatch(refreshSuccess(tokens))
		setStatus(status)
	} catch (err) {
		dispatch(refreshFailure())
		console.log(err)
	}
}

export const logout = (dispatch: Dispatch<IDispatch>) => {
	dispatch(logoutSuccess())
}

export const getUser = async (
	dispatch: Dispatch<IDispatch>,
	token: string | undefined,
	setError?: Dispatch<SetStateAction<boolean>>,
	setStatus?: Dispatch<SetStateAction<number>>
) => {
	try {
		dispatch(getStart())
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}

		const { data }: IProps = await publicReq(`base/personal-profile/`, config)

		dispatch(getSuccess(data))
	} catch (err: any) {
		dispatch(getFailure())
		console.log(err)
		setStatus && setStatus(err.response.status)
		setError && setError(true)
	}
}

export const getPersonalUser = async (
	token: string | undefined,
	setUser: Dispatch<SetStateAction<IMentor | null>>
) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}

		const { data } = await publicReq(`base/personal-profile/`, config)

		setUser(data)
	} catch (err) {
		// dispatch(getFailure())
		console.log(err)
	}
}

export const userUpdate = async (
	dispatch: Dispatch<IDispatch>,
	user: IUserToEdit,
	token: string | undefined
) => {
	dispatch(updateStart())

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}

		const res = await publicReq.patch(`account/update-user/`, user, config)

		dispatch(updateSuccess())

		console.log('user updated', res.status)
	} catch (err) {
		dispatch(updateFailure())
		console.log(err)
	}
}

export const updateEmail = async (
	dispatch: Dispatch<IDispatch>,
	user: IUserLog,
	token: string,
	setIsEdit: Dispatch<SetStateAction<boolean>>,
	setPassword: Dispatch<SetStateAction<string>>
) => {
	dispatch(updateEmailStart())
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}

		const res = await publicReq.post(`account/update-email/`, user, config)
		toast.success('Почта изменена', {
			style: {
				borderRadius: '6px',
				background: '#333',
				color: '#fff',
				padding: '20px auto',
				fontSize: '20px',
			},
		})

		dispatch(updateEmailSuccess(user.email))
		setPassword('')
		console.log(res.data)
		setIsEdit(false)
	} catch (err) {
		dispatch(updateEmailFailure())
		console.log(err)
	}
}

export const writing = async (
	dispatch: Dispatch<IDispatch>,
	mentee: IMentee,
	setModal: Dispatch<SetStateAction<boolean>>,
	router: NextRouter
) => {
	dispatch(writingStart())
	try {
		const res = await publicReq.post(`statement/menti-statement/`, mentee)
		toast.success('Ваша заявка отправлена', {
			style: {
				borderRadius: '6px',
				background: '#333',
				color: '#fff',
				padding: '20px auto',
				fontSize: '20px',
			},
		})
		dispatch(writingSuccess())
		console.log(res.data)
		setModal(true)
		router.push('/')
	} catch (err) {
		toast.error('Произошла ошибка и ваша заявка не была отправлена', {
			style: {
				borderRadius: '6px',
				background: '#333',
				color: '#fff',
				padding: '20px auto',
				fontSize: '20px',
			},
		})
		dispatch(writingFailure())
		console.log(err)
	}
}

export const acceptRequest = async (
	id: number | string,
	request: IAccepted,
	token: string
) => {
	//////////////////////////////////
	// const request: IRequest = {	//
	// 	accepted: true,					  	//
	// 	denied: false,							//
	// }														//
	//////////////////////////////////

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}

		const res = await publicReq.patch(
			`statement/update-delete/${id}/`,
			request,
			config
		)

		console.log('request accepted', res.status)
	} catch (err) {
		console.log(err)
	}
}

export const deniedRequest = async (
	id: number | string,
	request: IDenied,
	token: string
) => {
	//////////////////////////////////
	// const request: IRequest = {	//
	// 	accepted: false,						//
	// 	denied: true,								//
	// }														//
	//////////////////////////////////

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}

		const res = await publicReq.patch(
			`statement/update-delete/${id}/`,
			request,
			config
		)

		console.log('request denied', res.status)
	} catch (err) {
		console.log(err)
	}
}

export const getRequest = async (token: string) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		const res = await publicReq(`statement/my-statement/`, config)
		return res.data
	} catch (err) {
		console.log(err)
	}
}

export const userStatusUpdate = async (
	user: IUserStatus,
	token: string | undefined
) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}

		const res = await publicReq.patch(`account/update-user/`, user, config)

		console.log('user updated', res.status)
	} catch (err) {
		console.log(err)
	}
}
