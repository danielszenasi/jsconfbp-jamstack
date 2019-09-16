import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
    render={data => {
      return data.allMarkdownRemark.edges.map(
        ({
          node: {
            fields: { slug },
            frontmatter: { title }
          }
        }) => (
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">
                <Link to={slug}>{title}</Link>
              </div>
            </div>
          </div>
        )
      );
    }}
  ></StaticQuery>
);

export default IndexPage;
