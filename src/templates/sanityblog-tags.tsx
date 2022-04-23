// Components
import { graphql } from 'gatsby'
import React from 'react'

import {
  IPaginatorLocationContextValue,
  PaginatorLocationContext
} from '../components/Paginator/LocationContext'
import SEO from 'gatsby-theme-iterative-docs/src/components/SEO'
import { IPaginatorPageInfo } from '../components/Paginator'
import BlogTags from '../components/SanityBlog/Tags'
import { IBlogFeedPostList } from '../components/SanityBlog/Feed'

interface IBlogTagsPageData {
  data: { posts: IBlogFeedPostList }
  location: IPaginatorLocationContextValue
  pageContext: {
    tag: string
    pageInfo: IPaginatorPageInfo
  }
}

const BlogTagsPage: React.FC<IBlogTagsPageData> = ({
  data,
  pageContext,
  location
}) => {
  const title = `Posts tagged with "${pageContext.tag}"`

  return (
    <PaginatorLocationContext.Provider value={location}>
      <SEO
        title={title}
        defaultMetaTitle={true}
        pageInfo={pageContext.pageInfo}
      />
      <BlogTags
        pageInfo={pageContext.pageInfo}
        posts={data.posts}
        header={title}
      />
    </PaginatorLocationContext.Provider>
  )
}

export default BlogTagsPage

export const pageQuery = graphql`
  query ($tag: String, $skip: Int, $limit: Int) {
    posts: allSanityBlog(
      sort: { fields: [date], order: DESC }
      filter: { tags: { elemMatch: { slug: { current: { in: [$tag] } } } } }
      skip: $skip
      limit: $limit
    ) {
      ...SanityFeedPostList
    }
  }
`
