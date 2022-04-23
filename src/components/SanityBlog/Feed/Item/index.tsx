import React, { useEffect, useRef } from 'react'
import { useRafState, useWindowSize } from 'react-use'
import { graphql } from 'gatsby'
import Link from 'gatsby-theme-iterative-docs/src/components/Link'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import cn from 'classnames'
import { ISocialIcon } from 'gatsby-theme-iterative-docs/src/components/SocialIcon'

import FeedMeta from '../../FeedMeta'

import * as styles from './styles.module.css'

import { ReactComponent as Placeholder } from './placeholder.svg'

export interface IBlogPostData {
  id: string
  bodyMarkdown: {
    childMarkdownRemark: {
      timeToRead: string
    }
  }
  slug: {
    current: string
  }
  title: string
  date: string
  description: string
  descriptionLong: string
  picture?: {
    asset: {
      big: IGatsbyImageData
    }
  }
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

interface IBlogFeedItemProps {
  big?: boolean
  feedPost: IBlogPostData
}

const Item: React.FC<IBlogFeedItemProps> = ({
  big,
  feedPost: {
    title,
    description,
    date,
    picture,
    author,
    slug,
    bodyMarkdown: {
      childMarkdownRemark: { timeToRead }
    }
  }
}) => {
  const { avatar, name, links } = author
  const bodyRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const [isOverflown, setIsOverflown] = useRafState(true)

  useEffect(() => {
    if (bodyRef.current) {
      const { scrollHeight, clientHeight } = bodyRef.current

      setIsOverflown(scrollHeight <= clientHeight)
    }
  }, [width])

  const image = picture?.asset?.big

  return (
    <div
      className={cn(
        styles.wrapper,
        big && styles.big,
        !picture && styles.placeholder
      )}
    >
      <Link href={slug.current} className={styles.pictureLink}>
        {image ? (
          <GatsbyImage alt="" image={image} className={styles.picture} />
        ) : (
          <Placeholder className={styles.picture} />
        )}
      </Link>
      <div
        className={cn(styles.body, !isOverflown && styles.overflown)}
        ref={bodyRef}
      >
        <Link href={slug.current} className={styles.title}>
          {title}
        </Link>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.meta}>
        <FeedMeta
          name={name}
          avatar={avatar.asset}
          date={date}
          links={links}
          timeToRead={timeToRead}
        />
      </div>
    </div>
  )
}

export const query = graphql`
  fragment SanityFeedPost on SanityBlog {
    bodyMarkdown {
      childMarkdownRemark {
        timeToRead
      }
    }
    id
    slug {
      current
    }
    date(formatString: "MMM DD, YYYY")
    title
    description
    descriptionLong
    picture {
      asset {
        big: gatsbyImageData(width: 650, height: 450)
      }
    }
    author {
      name
      links {
        url
        site
      }
      avatar {
        asset {
          gatsbyImageData(width: 40, height: 40, layout: FIXED)
        }
      }
    }
  }
`

export default Item
