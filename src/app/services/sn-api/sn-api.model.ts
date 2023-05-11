export declare type AccessTokenInfo = { access_token: string, expiration: number }

export type AuthProcessStates = 'None' | 'InProgress' | 'Success' | 'Failed'

export interface ISnApiResponse<T> {
    result: {
        items: T[]
    },
    error: any
}

export interface IUser {
    id: string
    userName: string
    firstName: string
    lastName: string
    email: string
    departament: string
}