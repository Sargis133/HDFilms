export interface I_NavItems {
    name: string,
    value: string,
    children: I_NavItemChildren[]
}
export interface I_NavItemChildren {
    name: string,
    value: string,
    selected?: boolean,
}
export interface I_ItemSearchResult {
    id: number,
    nameEn: string,
    nameRu: string,
    imgSm: string,
    year: number,
    type: string,
}