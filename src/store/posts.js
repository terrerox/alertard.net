import { defineStore } from 'pinia'
import { request, assignArraySections, assignPromotionSections, mapPosts } from '../helpers'

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
    advertisment: {}
  }),
  actions: {
    async getPromotions() {
      const promotions = await request({
        query: `
        {
          allPromotions{
            spot
            image {
              url
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
        advertisment
      } = assignPromotionSections(promotions.allPromotions)

      this.banner = banner;
      this.sidePromotion = side;
      this.advertisment = advertisment;
    },
    async getAll() {
        this.isLoading = true
        const postsRequest = await request({
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
              category
            }
          }
          `,
          variables: {},
          preview: false,
        });
        const [posts] = await Promise.all([postsRequest, this.getPromotions()])
        const {
          heroPosts, 
          leftPosts, 
          rightPosts, 
          leftOver,
          mainPost
        } = assignArraySections(posts.allPosts)

        this.heroPosts = heroPosts;
        this.leftPosts = leftPosts;
        this.rightPosts = rightPosts;
        this.leftOver = leftOver;
        this.mainPost = mainPost;

        this.isLoading = false
    },
    async getOne(slug) {
        this.isLoading = true
        const postRequest = request({
          query: `
          query getPost($slug: String) {
            post (filter: { slug: { eq: $slug }}) {
              title
              description
              datetime
              mediaType
              instagramMediaUrl
            }
          }
          `,
          variables: { slug },
          preview: false,
        });
        const [post] = await Promise.all([postRequest, this.getPromotions()])
        localStorage.setItem('post',  JSON.stringify(post.post))
        this.post = post.post;
        this.isLoading = false
    },
    async getByCategory(category) {
      this.isLoading = true
      const postsByCategoryRequest = request({
        query: `
        query getPostByCategory($category: String) {
          allPosts (filter: { category: { eq: $category }}) {
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