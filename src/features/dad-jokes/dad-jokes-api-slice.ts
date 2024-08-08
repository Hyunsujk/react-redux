import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Joke {
  id: string
  joke: string
}

interface JokesSearchApiResponse {
  current_page: number
  limit: number
  next_page: number
  previous_page: number
  results: Joke[]
  search_term: string
  status: number
  total_jokes: number
  total_pages: number
}

export const jokesApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://icanhazdadjoke.com",
    prepareHeaders: headers => headers.set("Accept", "application/json"),
  }),
  reducerPath: "jokesApi",
  tagTypes: ["Jokes"],
  endpoints: build => ({
    searchJokes: build.query<JokesSearchApiResponse, string>({
      query: searchTerm => `/search?term=${searchTerm}`,
      providesTags: (result, error, id) => [{ type: "Jokes", id }], // need to check what this does
    }),
  }),
})

export const { useSearchJokesQuery } = jokesApiSlice
