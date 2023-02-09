import React, { Fragment, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink, useParams } from 'react-router-dom'
import postsApi from 'src/api/posts.api'

function FAQCate(props) {
  const [ListPost, setListPost] = useState([])
  const [CurrentCate, setCurrentCate] = useState(null)
  const [loading, setLoading] = useState(false)
  const { faqid } = useParams()

  useEffect(() => {
    getListFAQ()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqid])

  const getListFAQ = async () => {
    setLoading(true)
    const { data: CurrentCate } = await postsApi.getCateID(faqid)
    const { data: ListPosts } = await postsApi.getListPostsID(faqid)
    setListPost(ListPosts)
    setCurrentCate(CurrentCate)
    setLoading(false)
  }

  return (
    <Fragment>
      <Helmet>
        <title>{loading ? 'Đang tải ...' : CurrentCate?.name}</title>
      </Helmet>
      <div className="scroll view-content w-100">
        <div className="container">
          <h1
            dangerouslySetInnerHTML={{
              __html: CurrentCate?.name
            }}
          ></h1>
          <div className="row">
            {ListPost &&
              ListPost.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div className="cate-item">
                    <NavLink to={`${item.slug}.html`}>
                      {item?.title?.rendered}
                    </NavLink>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default FAQCate
