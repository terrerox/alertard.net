import { defineStore } from 'pinia'
import { request, assignArraySections, assignImagesToSections, assignImagesToPosts, mapPosts } from '../helpers'

export const usePostStore = defineStore('posts', {
  state: () => ({ 
    isLoading: true,
    heroPosts: [] || JSON.parse(localStorage.getItem('heroPosts')), 
    leftPosts: [] || JSON.parse(localStorage.getItem('leftPosts')), 
    rightPosts: [] || JSON.parse(localStorage.getItem('rightPosts')), 
    leftOver: [] || JSON.parse(localStorage.getItem('leftOver')),
    mainPost: {} || JSON.parse(localStorage.getItem('mainPost')),

    post: {} || JSON.parse(localStorage.getItem('post')),

    postsByCategories: [],
    category: '',

    banner: {},
    sidePromotion: {},
    advertisement: {},
    general: {}
  }),
  actions: {
    async getImages() {
      const images = await request({
        query: `
        {
          mediaItems {
            nodes {
              altText
              sourceUrl
            }
          }
        }
        `,
        variables: {},
        preview: false,
      })
      const {
        banner,
        side,
        advertisement,
        general
      } = assignImagesToSections(images.mediaItems.nodes)
      console.log({
        banner,
        side,
        advertisement,
      })

      this.banner = banner;
      this.sidePromotion = side;
      this.advertisement = advertisement;
      this.general = general;
    },
    async getAll() {
        this.isLoading = true
        const postsRequest = await request({
          query: `
          {
            posts {
              nodes {
                id
                title
                date
                content
                categories {
                  edges {
                    node {
                      id
                    }
                  }
                }
                slug
              }
            }
          }
          `,
          variables: {},
          preview: false,
        });
        const [posts] = await Promise.all([postsRequest, this.getImages()])
        const allPosts = assignImagesToPosts(posts.posts.nodes, this.general)
        const {
          heroPosts, 
          leftPosts, 
          rightPosts, 
          leftOver,
          mainPost
        } = assignArraySections(allPosts)

        this.heroPosts = heroPosts;
        this.leftPosts = leftPosts;
        this.rightPosts = rightPosts;
        this.leftOver = leftOver;
        this.mainPost = mainPost;

        this.isLoading = false
    },
    async getOne(id) {
        this.isLoading = true
        const postRequest = request({
          query: `
          query post($id: ID!) {
            post (id: $id) {
              id
              title
              date
              content
              categories {
                edges {
                  node {
                    id
                  }
                }
              }
              slug
            }
          }
          `,
          variables: { id },
          preview: false,
        });
        const [post] = await Promise.all([postRequest, this.getImages()])
        const currentPost = assignImagesToPosts([post.post], this.general)
        localStorage.setItem('post',  JSON.stringify(currentPost[0]))
        this.post = currentPost[0];
        this.isLoading = false
    },
    async getByCategory(category) {
      this.isLoading = true
      const postsByCategoryRequest = request({
        query: `
        query getPostByCategory($category: String) {
          posts (filter: { category: { eq: $category }}) {
            id
            title
            slug
            description
            preview
            mediaType
            mediaUrl
            thumbnailUrl
            datetime
            category
          }
        }
        `,
        variables: { category },
        preview: false,
      });
      const [posts] = await Promise.all([postsByCategoryRequest, this.getPromotions()])
      this.postsByCategories = mapPosts(posts.allPosts);
      this.category = category;
      this.isLoading = false
  },
  },
})