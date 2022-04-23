import { graphql } from 'gatsby'
import React from 'react'

import {
  IPaginatorLocationContextValue,
  PaginatorLocationContext
} from '../components/Paginator/LocationContext'
import BlogHome from '../components/SanityBlog/Home'
import { IPaginatorPageInfo } from '../components/Paginator'
import { IBlogFeedPostList } from '../components/SanityBlog/Feed'

interface IBlogHomePageProps {
  data: { posts: IBlogFeedPostList }
  location: IPaginatorLocationContextValue
  pageContext: {
    pageInfo: IPaginatorPageInfo
  }
}

const BlogHomePage: React.FC<IBlogHomePageProps> = ({
  data,
  location,
  pageContext
}) => {
  return (
    <PaginatorLocationContext.Provider value={location}>
      <BlogHome posts={data.posts} pageInfo={pageContext.pageInfo} />
    </PaginatorLocationContext.Provider>
  )
}

export default BlogHomePage

export const pageQuery = graphql`
  query ($skip: Int, $limit: Int) {
    posts: allSanityBlog(
      sort: { fields: [date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      ...SanityFeedPostList
    }
  }
`
