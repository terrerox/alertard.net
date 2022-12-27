import { defineStore } from 'pinia'
import { convertTimestampToDate, extractDataOfCaption } from '../helpers'

export const usePostStore = defineStore('posts', {
  state: () => ({ 
    isLoading: true,
    posts: [] || JSON.parse(localStorage.getItem('posts')),
    post: {},
    next: {},
    previous: {}
  }),
  actions: {
    getAll() {
        this.isLoading = true
        return fetch(`https://graph.facebook.com/v14.0/17841413817530260?fields=media%7Bcaption%2Cmedia_type%2Cmedia_url%2Ctimestamp%2C%20thumbnail_url%7D&access_token=${import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN}`)
        .then(res => {
            return res.json();
        })
        .then(json => {
            const posts = json.media.data.map(post => {
              const { 
                id, 
                caption, 
                thumbnail_url,  
                timestamp,
                media_type,
                media_url
              } = post
              const data = extractDataOfCaption(caption)
              return {
                id,
                media_url: thumbnail_url || media_url,
                media_type,
                ...data,
                date: convertTimestampToDate(timestamp)
              }
            })
            // set the response data
            this.isLoading = false
            const postArray = JSON.stringify(posts);
            localStorage.setItem('posts',  postArray);
            this.posts = posts;
            return posts
          })
    },
    getOne(id) {
        this.isLoading = true
        return fetch(`https://graph.facebook.com/v14.0/${id}?fields=caption%2Cthumbnail_url%2Ctimestamp%2Cmedia_type%2Cmedia_url&access_token=${import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN}`)
        .then(res => {
            return res.json();
        })
        .then(json => {
            const { 
              id, 
              caption, 
              thumbnail_url,  
              timestamp,
              media_type,
              media_url
            } = json
            const data = extractDataOfCaption(caption)
            const res = {
              date: convertTimestampToDate(timestamp),
              media_url,
              media_type,
              ...data
            };
            console.log(res)
            this.calculateNextAndPreviousPost(id)
            this.post = res;
            this.isLoading = false
          })
    },
    calculateNextAndPreviousPost(id) {
        const index = this.posts.findIndex(post => post.id === id)
        const previousPost = index === 0 ? null : this.posts[index - 1]
        const nextPost = index === this.posts.length - 1 ? null : this.posts[index + 1]
        this.previous = previousPost
        this.next = nextPost
    }
  },
})