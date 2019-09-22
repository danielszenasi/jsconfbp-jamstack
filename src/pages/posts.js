import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

const PostsPage = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "post-page" } } }
        ) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={data => {
      const posts = data.allMarkdownRemark.edges
      return posts.map(({ node }) => {
        return (
          <article className="mb-8" key={node.fields.slug}>
            <header>
              <h3 className="font-bold text-3xl mb-1">
                <Link
                  className="text-red-600 shadow-none no-underline"
                  to={node.fields.slug}
                >
                  {node.frontmatter.title}
                </Link>
              </h3>
              <small className="uppercase font-semibold text-gray-600">
                {node.frontmatter.date}
              </small>
            </header>
            <section>
              <p
                className="mt-2 text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })
    }}
  ></StaticQuery>
)

export default PostsPage
