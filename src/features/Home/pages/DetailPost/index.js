import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import postsApi from 'src/api/posts.api'
import Skeleton from 'react-loading-skeleton'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

function DetailPost(props) {
  const { PostsList, LoadingList } = useSelector(({ posts }) => ({
    PostsList: posts.PostsList,
    LoadingList: posts.LoadingList
  }))
  const [Post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { slug, cateid, cate } = useParams()

  useEffect(() => {
    LoadingList && setLoading(true)
  }, [LoadingList])

  useEffect(() => {
    if (
      !slug &&
      PostsList &&
      PostsList.length > 0 &&
      PostsList[0].Items.length > 0
    ) {
      navigate(`/${cate}-${cateid}/${PostsList[0].Items[0].slug}.html`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PostsList])

  useEffect(() => {
    if (slug) {
      getDetailPost()
    }
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
    <Fragment>
      <Helmet>
        <title>{loading ? 'Đang tải ...' : Post?.yoast_head_json.title}</title>
      </Helmet>
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
  )
}

export default DetailPost
