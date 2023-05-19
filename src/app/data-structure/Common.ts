export interface Language {
    id: number,
    name: string,
    img: string,
    code: string
}

export interface DataSearch {
    dict: string,
    limit: 20,
    page: number,
    text: string,
    type: string
}

export const schemeDomain = 'http://localhost:4200/';