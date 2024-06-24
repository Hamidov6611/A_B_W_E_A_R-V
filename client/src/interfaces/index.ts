export interface IPost {
	_id: string
	title: string
	body: string
	picture: string
	createdAt: string
	author: author
}
interface author {
	_id: string
	username: string	
	email: string
}
export interface IUser {
	email: string
	isActivated: boolean
	id: string
}

export type AuthType = 'register' | 'login' | 'forgot-password'