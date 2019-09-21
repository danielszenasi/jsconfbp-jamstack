import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

const IndexPage = () => (
  <div className="p-24 flex flex-wrap items-center justify-center">
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "post-page" } } }) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  date
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
              frontmatter: { title, date }
            }
          }) => (
            <Link to={slug}>
              <div className="w-56 rounded overflow-hidden shadow-lg m-6 bg-orange-500 text-white">
                <div className="px-6 py-10">
                  <div className="font-bold text-xl mb-2">{title}</div>
                  <div>{new Intl.DateTimeFormat('en-US').format(new Date(date))}</div>
                </div>
              </div>
            </Link>
          )
        );
      }}
    ></StaticQuery>
  </div>
);

export default IndexPage;
