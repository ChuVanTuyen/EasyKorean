export interface DataRegister {
    email: string,
    password: string,
    language: string
}

export interface DataLogin {
    email: string,
    password: string,
    device_id: string
}

export interface DataLogout {
    device_id?: string,
    type?: string
}

export interface User {
    id: number,
    name: string,
    email: string,
    image: string | null,
    device_id: string,
    remember_token: string
}