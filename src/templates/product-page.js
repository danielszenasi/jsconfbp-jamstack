import React from 'react';
import { graphql } from 'gatsby';
import { useStore } from '../store/StoreContext';
import { types } from '../store/types';

export default function Template({ data }) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html, fields } = markdownRemark;
  const [state, dispatch] = useStore();
  return (
    <div className="product-post">
      <img src={frontmatter.image}></img>
      <h1>{frontmatter.name}</h1>
      <h2>{frontmatter.price}</h2>
      <div className="product-content" dangerouslySetInnerHTML={{ __html: html }} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          dispatch({
            type: types.INCREMENT_QUANTITY,
            payload: { slug: fields.slug, name: frontmatter.name, price: frontmatter.price }
          })
        }
      >
        Add
      </button>
    </div>
  );
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
`;
