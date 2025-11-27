export type Pokemon = {
  id: number,
  name: string,
  types: Array<{
    type: {
      name: string,
      url: string
    }
  }>,
  images: Record<string, string | null>
}

export type ApiResponse<T> = {
  data: T,
  status: number
}

export type FetchResults = {
  apiLink: string,
  parameter: string
}
