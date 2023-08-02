
export interface Category{
    id: number,
    title: string,
    note?: string,
    type: "expense" | "income"
}