import axios from 'axios'

export async function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`

  const { data } = await axios.post(
    endpoint,
    {
      query,
      variables
    },
    {
      headers: {
        Authorization:
          `Bearer ${import.meta.env.VITE_DATOCMS_API_TOKEN}`
      }
    }
  )

  if (data.errors) {
    throw JSON.stringify(data.errors);
  }

  return data.data;
}

export function assignPromotionSections(promotion) {
  let banner = {}, side = {}, advertisment = {}
  banner = promotion.find(promotion => promotion.spot === 'BANNER')
  side = promotion.find(promotion => promotion.spot === 'SIDE')
  advertisment = promotion.find(promotion => promotion.spot === 'ADVERTISMENT')

  return {
    banner,
    side,
    advertisment
  }
}
export function assignArraySections(posts) {
  const heroPosts = [], 
        leftPosts = [], 
        rightPosts = [], 
        leftOver = []

  let mainPost = {}

  for (const [index, post] of posts.entries()) {
    if (index < 4) {
      heroPosts.push(post)
      continue
    }

    if (index < 7) {
      rightPosts.push(post)
      continue
    }

    if (index < 9) {
      leftPosts.push(post)
      continue
    }

    if (index < 10) {
      mainPost = post
      continue
    }

    leftOver.push(post)
  }

  localStorage.setItem('heroPosts',  JSON.stringify(heroPosts))
  localStorage.setItem('leftPosts',  JSON.stringify(leftPosts))
  localStorage.setItem('rightPosts',  JSON.stringify(rightPosts))
  localStorage.setItem('leftOver',  JSON.stringify(leftOver))
  localStorage.setItem('mainPost',  JSON.stringify(mainPost))

  return {
    heroPosts, 
    leftPosts, 
    rightPosts, 
    leftOver,
    mainPost
  }
}
  