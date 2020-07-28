import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Moment from "react-moment"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import styled from "@emotion/styled"
import colors from "styles/colors"
import Layout from "components/Layout"
import { Disqus } from 'gatsby-plugin-disqus'

const PostHeroContainer = styled("div")`
    max-height: 600px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 3em;

    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 60%;
    }
`

const PostHeroAnnotation = styled("div")`
    padding-top: 0.25em;
    width: 70%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    h6 {
        text-align: center;
        color: ${colors.grey700};
        font-weight: 400;
        font-size: 0.9rem;
    }

    a {
        color: currentColor;
    }
`

const PostCategory = styled("div")`
    max-width: 650px;
    margin: 0 auto;
    text-align: center;
    font-weight: 600;
    color: ${colors.grey700};

    h5 {
        margin-top: 0;
        margin-bottom: 1em;
    }
`

const PostTitle = styled("div")`
    max-width: 650px;
    margin: 0 auto;
    text-align: center;

    h1 {
        margin-top: 0;
    }
`

const PostBody = styled("div")`
    max-width: 650px;
    margin: 0 auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const PostMetas = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-bottom: 2em;
    justify-content: space-between;
    font-size: 1em;
    color: ${colors.grey700};
`

const PostAuthor = styled("div")`
    margin: 0;
`

const PostDate = styled("div")`
    margin: 0;
`

const Post = ({ post, meta }) => {
  let disqusConfig = {
    url: `${meta.siteUrl + window.location.pathname}`,
    identifier: post._meta.id,
    title: post.title,
  }
  return (
    <>
      <Helmet
        title={`${post.post_title[0].text}`}
        titleTemplate={`%s | Blog | Faiz Surani`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${post.post_title[0].text} | Prist, Gatsby & Prismic Starter`,
          },
          {
            property: `og:description`,
            content: meta.description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: meta.author,
          },
          {
            name: `twitter:title`,
            content: meta.title,
          },
          {
            name: `twitter:description`,
            content: meta.description,
          },
        ].concat(meta)}
      />
      <Layout>
        <PostCategory>
          {RichText.render(post.post_category)}
        </PostCategory>
        <PostTitle>
          {RichText.render(post.post_title)}
        </PostTitle>
        <PostMetas>
          <PostAuthor>
            {post.post_author}
          </PostAuthor>
          <PostDate>
            <Moment format="MMMM D, YYYY">{post.post_date}</Moment>
          </PostDate>
        </PostMetas>
        {post.post_hero_image && (
          <PostHeroContainer>
            <img src={post.post_hero_image.url} alt="bees"/>
            <PostHeroAnnotation>
              {RichText.render(post.post_hero_annotation)}
            </PostHeroAnnotation>
          </PostHeroContainer>
        )}
        <PostBody>
          {RichText.render(post.post_body)}
        </PostBody>
        <Disqus config={disqusConfig} />
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const postContent = data.prismic.allPosts.edges[0].node
  const meta = data.site.siteMetadata
  return (
    <Post post={postContent} meta={meta}/>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
    query PostQuery($uid: String) {
        prismic {
            allPosts(uid: $uid) {
                edges {
                    node {
                        post_title
                        post_hero_image
                        post_hero_annotation
                        post_date
                        post_category
                        post_body
                        post_author
                        post_preview_description
                        _meta {
                            uid
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`
