
export interface Category{
    id?: number,
    title: string,
    note?: string,
    type: "expense" | "income",
    icon: string | null,
    color: string | null,
    background: string | null,
    radius?: number 

}