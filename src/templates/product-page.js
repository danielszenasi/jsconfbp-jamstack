import React from 'react'
import { Link, graphql } from 'gatsby'
import { useStore } from '../store/StoreContext'
import { types } from '../store/types'

export default function Template({
  data: {
    markdownRemark: { frontmatter, html, fields },
  },
}) {
  const [, dispatch] = useStore()

  return (
    <div className="flex md:-mx-4">
      <img src={frontmatter.image} className="md:w-1/3 md:px-4" />
      <div className="md:w-2/3 md:px-4">
        <Link className="text-gray-700" to="/">
          ← Back to product list
        </Link>
        <h1 className="font-bold text-4xl">{frontmatter.name}</h1>
        <span className="block text-lg">€{frontmatter.price}</span>
        <button
          className="btn btn-red mt-4"
          onClick={() =>
            dispatch({
              type: types.INCREMENT_QUANTITY,
              payload: {
                slug: fields.slug,
                name: frontmatter.name,
                price: frontmatter.price,
              },
            })
          }
        >
          Add to cart
        </button>
        <div
          className="markdown mt-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
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
`
