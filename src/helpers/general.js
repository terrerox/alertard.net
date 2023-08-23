export function goToPost(post, router) { 
    router.push({ path: post.slug, query: { id: post.id } })
}