import axios from 'axios'

export async function request({ query, variables }) {
  const endpoint = import.meta.env.VITE_BASE_URL

  const { data } = await axios.post(
    endpoint,
    {
      query,
      variables
    },
  )

  if (data.errors) {
    throw JSON.stringify(data.errors);
  }

  return data.data;
}