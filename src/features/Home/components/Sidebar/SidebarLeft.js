/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import clsx from 'clsx'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useEffect } from 'react'

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
}

// const roman = {
//   1: 'I',
//   2: 'II',
//   3: 'III',
//   4: 'IV',
//   5: 'V',
//   6: 'VI',
//   7: 'VII',
//   8: 'VIII',
//   9: 'IX',
//   10: 'X',
//   20: 'XX',
//   30: 'XXX',
//   40: 'XL',
//   50: 'L',
//   60: 'LX',
//   70: 'LXX',
//   80: 'LXXX',
//   90: 'XC',
//   100: 'C',
//   200: 'CC',
//   300: 'CCC',
//   400: 'CD',
//   500: 'D',
//   600: 'DC',
//   700: 'DCC',
//   800: 'DCCC',
//   900: 'CM',
//   1000: 'M',
//   2000: 'MM',
//   3000: 'MMM'
// }
// const convertRoman = natural => {
//   let str = String(natural).split('')
//   let result = ''
//   for (let i = 0; i < str.length; i++) {
//     var lookup = str[i] * Math.pow(10, str.length - i - 1)
//     if (roman[lookup]) {
//       result += roman[lookup]
//     }
//   }
//   return result
// }

function NavItems({ cate, onChangeCate, CateActive, STT }) {
  const [active, setActive] = useState(false)
  const { cate: cates, faqid, cateid, slug } = useParams()

  useEffect(() => {
    if (faqid && Number(faqid) === Number(cate.id)) {
      setActive(true)
    } else {
      setActive(false)
    }

    if (!faqid) {
      if (Number(cate.id) === Number(cateid)) {
        setActive(true)
      } else {
        setActive(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cate, faqid])

  return (
    <li className={clsx(active && 'active-color', 'active')}>
      {/* onClick={() => onChangeActive(cate)} */}
      <NavLink
        to={
          STT > 0
            ? `${cates}-${cateid}/${cate.slug}-${cate.id}`
            : `${cate.slug}-${cate.id}`
        }
      >
        {/* <span className="svg-icon">
          <SVG
            src={AssetsHelpers.toAbsoluteUrl(
              '/media/svg/icons/Design/Layers.svg'
            )}
          />
        </span> */}

        <span className="text">
          {/* <span className="number font-lating">{convertRoman(STT + 1)}.</span> */}
          {cate.name}
        </span>
        {/* {cate.Items && cate.Items.length > 0 && <i className="menu-arrow"></i>} */}
      </NavLink>
      <ul>
        {cate.Items &&
          cate.Items.map((item, idx) => (
            <li key={idx}>
              <NavLink
                className={clsx(!slug && idx === 0 && 'active')}
                to={`${cates}-${cateid}/${item.slug}.html`}
              >
                {/* <i className="menu-bullet menu-bullet-dot">
                  <span></span>
                </i> */}
                <span
                  dangerouslySetInnerHTML={{
                    __html: item?.title.rendered
                  }}
                ></span>
              </NavLink>
            </li>
          ))}
      </ul>
    </li>
  )
}

function SidebarLeft(props) {
  const { PostsList, LoadingList } = useSelector(({ posts }) => ({
    PostsList: posts.PostsList,
    LoadingList: posts.LoadingList
  }))
  const [CateActive, setCateActive] = useState()
  const onChangeCate = patch => {
    setCateActive(prevState => (prevState === patch ? '' : patch))
  }

  return (
    <Fragment>
      <div className="top">
        <h4>Hướng dẫn sử dụng EZS.VN</h4>
      </div>
      <PerfectScrollbar
        options={perfectScrollbarOptions}
        className="scroll sidebar-navs"
        style={{ position: 'relative' }}
      >
        <ul>
          {LoadingList && (
            <SkeletonTheme baseColor="#fff" highlightColor="#1e1e2d">
              <li className="active">
                <a>
                  <Skeleton height={18} width={200} />
                </a>
                <ul>
                  {Array(3)
                    .fill()
                    .map((item, index) => (
                      <li key={index}>
                        <a>
                          <Skeleton height={13} width={200} />
                        </a>
                      </li>
                    ))}
                </ul>
              </li>
            </SkeletonTheme>
          )}

          {!LoadingList &&
            PostsList &&
            PostsList.map((cate, index) => (
              <NavItems
                STT={index}
                cate={cate}
                key={index}
                onChangeCate={onChangeCate}
                CateActive={CateActive}
              />
            ))}
        </ul>
      </PerfectScrollbar>
    </Fragment>
  )
}

export default SidebarLeft
