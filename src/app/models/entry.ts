export interface Entry {
  id?: number,
  categoryId: number,
  value: number,
  note: string,
  date: string,
  recurring: boolean,
  interval?: string
}