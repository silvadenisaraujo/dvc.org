import { graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import SEO from 'gatsby-theme-iterative-docs/src/components/SEO'
import Post from '../components/SanityBlog/Post'

import { ISocialIcon } from 'gatsby-theme-iterative-docs/src/components/SocialIcon'
import { isProduction } from '../server/utils'

export interface IBlogPostHeroPic {
  picture?: IGatsbyImageData
  pictureComment?: string
}
export interface IBlogPostData {
  id: string
  htmlAst: Node
  timeToRead: string
  slug: string
  title: string
  date: string
  description: string
  descriptionLong?: string
  commentsUrl?: string
  tags?: string[]
  picture?: {
    gatsbyImageData?: IGatsbyImageData
    fields: { sourcePath: string }
  }
  pictureComment?: string
  author: {
    name: string
    avatar: {
      gatsbyImageData: IGatsbyImageData
    }
    links: Array<ISocialIcon>
  }
}

export interface ISanityBlogData {
  id: string
  bodyMarkdown: {
    childMarkdownRemark: {
      htmlAst: Node
      timeToRead: string
    }
  }
  slug: {
    current: string
  }
  title: string
  date: string
  description: string
  descriptionLong?: string
  commentsUrl?: string
  tags?: [
    {
      slug: {
        current: string
      }
    }
  ]
  picture?: {
    asset: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  pictureComment?: string
  author: {
    name: string
    avatar: {
      asset: {
        gatsbyImageData: IGatsbyImageData
      }
    }
    links: Array<ISocialIcon>
  }
}

interface IBlogPostPageProps {
  data: {
    sanityBlog: ISanityBlogData
  }
}

const BlogPostPage: React.FC<IBlogPostPageProps> = ({ data }) => {
  const post: IBlogPostData = {
    ...data.sanityBlog,
    slug: data.sanityBlog.slug.current,
    htmlAst: data.sanityBlog.bodyMarkdown.childMarkdownRemark.htmlAst,
    timeToRead: data.sanityBlog.bodyMarkdown.childMarkdownRemark.timeToRead,
    picture: {
      gatsbyImageData: data.sanityBlog.picture?.asset.gatsbyImageData,
      fields: {
        sourcePath: ''
      }
    },
    author: {
      ...data.sanityBlog.author,
      avatar: data.sanityBlog.author.avatar.asset
    },
    tags: data.sanityBlog.tags?.map(tag => tag.slug.current)
  }
  const {
    title,
    description,
    picture,
    author: { name },
    date
  } = post
  return (
    <>
      <SEO
        title={title}
        description={description}
        image={
          picture &&
          (isProduction
            ? `/blog/${picture.fields.sourcePath}`
            : picture.gatsbyImageData)
        }
        imageHeight={picture?.gatsbyImageData?.height}
        imageWidth={picture?.gatsbyImageData?.width}
        meta={[
          {
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            name: 'og:type',
            content: 'article'
          },
          {
            name: 'article:author',
            content: name
          },
          {
            name: 'article:published_time',
            content: new Date(date).toISOString().slice(0, 10)
          }
        ]}
      />
      <Post {...post} />
    </>
  )
}

export default BlogPostPage

export const pageQuery = graphql`
  query SanityBlogPage($id: String!) {
    sanityBlog(id: { eq: $id }) {
      id
      slug {
        current
      }
      title
      date(formatString: "MMMM DD, YYYY")
      description
      descriptionLong
      tags {
        slug {
          current
        }
      }
      commentsUrl
      author {
        name
        links {
          site
          url
        }
        avatar {
          asset {
            gatsbyImageData(width: 40, height: 40, layout: FIXED)
          }
        }
      }
      picture {
        asset {
          gatsbyImageData(width: 850)
        }
      }
      bodyMarkdown {
        childMarkdownRemark {
          htmlAst
          timeToRead
        }
      }
    }
  }
`
