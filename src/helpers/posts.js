export function assignImagesToPosts(posts, images) {
    const allPosts = []
    posts.forEach(post => {
      const photo = images.find(img => img.altText === post.slug)
      if(photo) {
        allPosts.push({
          ...post,
          mediaUrl: photo.sourceUrl
        })
      }
    })
    return allPosts
  }
  
  export function assignImagesToSections(images) {
    const sections = {
      BANNER: 'BANNER',
      SIDE: 'SIDE',
      ADVERTISEMENT: 'ADVERTISEMENT',
    }
    let banner = {}, side = {}, advertisement = {}, general = {}
    banner = images.find(img => img.altText === sections.BANNER)
    side = images.find(img => img.altText === sections.SIDE)
    advertisement = images.find(img => img.altText === sections.ADVERTISEMENT)
    general = images.filter(img => !sections[img.altText])
    return {
      banner,
      side,
      advertisement,
      general
    }
  }
  export function assignArraySections(rawPosts) {
    const posts = mapPosts(rawPosts)
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
  
  export const categoryTitles = {
    alertard: "Nacionales",
    alertardnet: "Nacionales",
    alertainternacional: "Extranjeras",
    alertadeportiva: "Deportes",
    alertacuriosa: "Curiosas",
    alertasexual: "Educación Sexual",
  }
  
  export function mapPosts(posts) {
    return posts.map(post => {
      const {
        content,
        id,
        date,
        slug,
        title,
        mediaUrl,
      } = post
      return {
        datetime: date, 
        description: content, 
        id,
        thumbnailUrl: 'klk', 
        mediaType: 'klk', 
        mediaUrl,
        preview: 'klk', 
        categoty: 'klk', 
        slug, 
        title,
      }
    })
  }
    