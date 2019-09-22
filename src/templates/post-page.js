import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

export default function Template({ data }) {
  const { markdownRemark: post } = data

  return (
    <>
      <Helmet>
        <title>{post.frontmatter.title}</title>
      </Helmet>
      <article>
        <header>
          <h1 className="font-bold text-3xl mb-2">{post.frontmatter.title}</h1>
          <p className="block mb-5">{post.frontmatter.date}</p>
        </header>
        <section
          className="markdown"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
