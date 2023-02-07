import React, { Fragment, useRef, useState, useEffect } from 'react'
import postsApi from 'src/api/posts.api'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

function PostSearch(props) {
  const [val, setVal] = useState('')
  const [List, setList] = useState([])
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const typingTimeoutRef = useRef(null)

  const inputRef = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (!show) {
      setList([])
      setVal('')
    }
  }, [show])

  const handleOnChange = event => {
    setLoading(true)
    setVal(event.target.value)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(async () => {
      postsApi
        .getPostKey(event.target.value)
        .then(({ data }) => {
          let newData = []
          if (!event.target.value) {
          } else {
            newData = data
              ? data
                  .map(item => ({
                    ...item,
                    cate: item._embedded['wp:term']
                      ? item._embedded['wp:term'][0].sort(function (a, b) {
                          return a.id - b.id
                        })
                      : []
                  }))
                  .map(item => ({
                    ...item,
                    cate: item.cate
                      ? item.cate.slice(item.cate.length - 2, item.cate.length)
                      : []
                  }))
              : []
          }
          setList(newData)
          setLoading(false)
        })
        .catch(error => console.log(error))
    }, 500)
  }
  return (
    <Fragment>
      <div
        className="btn-search"
        onClick={() => {
          setShow(true)
        }}
      >
        <i className="fa-regular fa-magnifying-glass"></i>
      </div>
      <div className={clsx(show && 'active', 'box-filter')}>
        <div className="box-filter-content">
          <div className="form-filter">
            <i className="fa-regular fa-magnifying-glass"></i>
            <input
              type="text"
              value={val}
              onChange={handleOnChange}
              placeholder="Bạn muốn tìm kiếm gì ?"
              ref={inputRef}
            />
          </div>
          {loading && <div className="filter-loading">Đang tìm kiếm ...</div>}
          {!loading && List && List.length > 0 && (
            <div className="filter-list">
              <div className="sub">Kết quả</div>
              {List &&
                List.map((item, index) => (
                  <div className="filter-key" key={index}>
                    <div
                      onClick={() => {
                        navigate(
                          `/${item.cate[item.cate.length - 1].slug}-${
                            item.cate[item.cate.length - 1].id
                          }/${item.slug}.html`
                        )
                        setShow(false)
                        setList(false)
                        setVal('')
                      }}
                      dangerouslySetInnerHTML={{
                        __html: item?.title?.rendered
                      }}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="_bg" onClick={() => setShow(false)} />
      </div>
    </Fragment>
  )
}

export default PostSearch
