import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import postsApi from 'src/api/posts.api'
import Skeleton from 'react-loading-skeleton'
import { PostsContext } from '../../Home'
import { Helmet } from 'react-helmet'
import Navbar from '../../components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getListPostsID } from '../../HomeSlice'
import PostSearch from '../../components/PostSearch/PostSearch'

function DetailPost(props) {
  const { PostsList } = useSelector(({ posts }) => ({
    PostsList: posts.PostsList
  }))
  const [Post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { onOpen } = useContext(PostsContext)
  const navigate = useNavigate()
  const { slug, cateid, cate } = useParams()

  useEffect(() => {
    if (cateid) {
      dispatch(getListPostsID(cateid))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cateid, dispatch])

  useEffect(() => {
    if (!slug && PostsList && PostsList.length > 0) {
      navigate(
        `/${cate}-${cateid}/${PostsList[0].slug}/${PostsList[0].Items[0].slug}.html`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, PostsList])

  useEffect(() => {
    getDetailPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const getDetailPost = () => {
    setLoading(true)
    postsApi
      .getPostSlug(slug)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setPost(data[0])
          setLoading(false)
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="h-100 bg-white">
      <Helmet>
        <title>{loading ? 'Đang tải ...' : Post?.yoast_head_json.title}</title>
      </Helmet>
      {
        <Fragment>
          <div className="title-top justify-content-between">
            <div className="h-100 d-flex">
              <Navbar />
            </div>
            <div className="d-flex">
              <PostSearch />
              <div className="btn-menu" onClick={onOpen}>
                <i className="fa-solid fa-bars"></i>
              </div>
            </div>
          </div>
          <div className="scroll view-content w-100">
            <div className="container">
              {loading && (
                <Fragment>
                  <h1>
                    <Skeleton count={1} />
                  </h1>
                  <Skeleton count={5} />
                  <Skeleton className="mb-20px" count={1} width={200} />
                  <Skeleton count={5} />
                  <Skeleton className="mb-20px" count={1} width={200} />
                  <Skeleton count={5} />
                </Fragment>
              )}
              {!loading && (
                <div>
                  <h1
                    dangerouslySetInnerHTML={{
                      __html: Post?.title.rendered
                    }}
                  ></h1>
                  {!loading && Post?.acf?.video_youtube && (
                    <div className="mb-10px videos-ytb">
                      <iframe
                        className="w-100"
                        src={`https://www.youtube.com/embed/${Post?.acf?.video_youtube}`}
                        title="Video"
                        wmode="opaque"
                        salign="tl"
                        allowscriptaccess="never"
                        allowFullScreen={true}
                        scale="scale"
                        quality="high"
                      ></iframe>
                    </div>
                  )}
                  <div
                    className="post"
                    dangerouslySetInnerHTML={{ __html: Post?.content.rendered }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      }
    </div>
  )
}

export default DetailPost
