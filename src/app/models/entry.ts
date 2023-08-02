export interface Entry {
  id?: number,
  categoryId: number,
  parentId?: number | null //used for repeating logic
  value: number,
  note: string,
  date: number,
  interval: string | null
  type: "expense" | "income"
}