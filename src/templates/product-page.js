import React from 'react';
import { graphql } from 'gatsby';

export default function Template({ data }) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <div className="product-post">
      <img src={frontmatter.image}></img>
      <h1>{frontmatter.name}</h1>
      <h2>{frontmatter.price}</h2>
      <div className="product-content" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        image
        price
        name
      }
    }
  }
`;
