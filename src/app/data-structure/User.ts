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
    apple_token: null,
    apple_user: null,
    created_at: string,
    device_id: null,
    email: string,
    id: number | undefined,
    image: null,
    is_premium: string,
    language: string | null,
    level_topik: null,
    name: string,
    premium_expired: string,
    provider: null,
    provider_id: null,
    remember_token: string | null,
    status: number | null,
    updated_at: string | null

}