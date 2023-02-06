import http from './configs/http'

const postsApi = {
  getListPostsID: id => {
    return http.get(`/wp-json/wp/v2/posts?categories=${id}&per_page=100`)
  },
  getPostID: id => {
    return http.get(`/wp-json/wp/v2/posts/${id}`)
  },
  getPostSlug: slug => {
    return http.get(`/wp-json/wp/v2/posts?slug=${slug}`)
  },
  getListParentCate: id => {
    return http.get(`/wp-json/wp/v2/categories?parent=${id}&per_page=100`)
  },
  getCateID: id => {
    return http.get(`/wp-json/wp/v2/categories/${id}`)
  },
  getPostKey: key => {
    return http.get(
      `/wp-json/wp/v2/posts/?search=${key}&categories=21&_embed=wp:term`
    )
  }
}
export default postsApi
