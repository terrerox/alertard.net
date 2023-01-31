import { defineStore } from 'pinia'
import { request, assignArraySections } from '../helpers'

export const usePostStore = defineStore('posts', {
  state: () => ({ 
    isLoading: true,
    heroPosts: [] || JSON.parse(localStorage.getItem('posts')), 
    leftPosts: [] || JSON.parse(localStorage.getItem('posts')), 
    rightPosts: [] || JSON.parse(localStorage.getItem('posts')), 
    leftOver: [] || JSON.parse(localStorage.getItem('posts')),
    mainPost: {} || JSON.parse(localStorage.getItem('mainPost'))
  }),
  actions: {
    async getAll() {
        this.isLoading = true
        const posts = await request({
          query: `
          {
            allPosts {
              id
              title
              slug
              description
              preview
              mediaType
              mediaUrl {
                url
              }
              instagramMediaUrl
              instagramThumbnailUrl
              datetime
            }
          }
          `,
          variables: {},
          preview: false,
        });

        const {
          heroPosts, 
          leftPosts, 
          rightPosts, 
          leftOver,
          mainPost
        } = assignArraySections(posts.allPosts)

        this.isLoading = false
        this.heroPosts = heroPosts;
        this.leftPosts = leftPosts;
        this.rightPosts = rightPosts;
        this.leftOver = leftOver;
        this.mainPost = mainPost;
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