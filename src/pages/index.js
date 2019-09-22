import React from 'react'
import { Link, graphql } from 'gatsby'

const IndexPage = ({ data }) => (
  <div className="product-list">
    {data.allMarkdownRemark.edges.map(
      ({
        node: {
          fields: { slug },
          frontmatter: { name, image, price },
        },
      }) => (
        <Link
          key={slug}
          className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl"
          to={slug}
        >
          <div className="relative pb-full">
            <img
              src={image}
              className="absolute h-full w-full object-cover"
              alt={name}
            />
          </div>
          <div className="bg-white p-4">
            <div className="font-bold text-2xl">{name}</div>
            <div>€{price}</div>
          </div>
        </Link>
      ),
    )}
  </div>
)

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "product-page" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            image
            price
            name
          }
        }
      }
    }
  }
`

export default IndexPage
