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
        return fetch(`https://graph.facebook.com/v14.0/17841413817530260?fields=media%7Btimestamp%2C%20caption%2C%20id%2C%20%20thumbnail_url%7D&access_token=${import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN}`)
        .then(res => {
            return res.json();
        })
        .then(json => {
            const posts = json.media.data.map(post => {
              const { id, caption, thumbnail_url,  timestamp } = post
              const data = extractDataOfCaption(caption)
              return {
                id,
                image_url: thumbnail_url,
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
        return fetch(`https://graph.facebook.com/v14.0/${id}?fields=caption%2Cthumbnail_url%2Ctimestamp&access_token=${import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN}`)
        .then(res => {
            return res.json();
        })
        .then(json => {
            const data = extractDataOfCaption(json.caption)
            const res = {
              date: convertTimestampToDate(json.timestamp),
              image_url: json.thumbnail_url,
              ...data
            };
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