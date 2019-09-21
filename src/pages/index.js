import React from 'react';
import { StaticQuery, Link } from 'gatsby';

const backgroundColors = ['purple', 'orange', 'teal'];

const IndexPage = () => (
  <div className="p-24 flex flex-wrap items-center justify-center">
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "product-page" } } }) {
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
      `}
      render={data => {
        return data.allMarkdownRemark.edges.map(
          ({
            node: {
              fields: { slug },
              frontmatter: { name, image, price }
            }
          }) => {
            const color = backgroundColors[Math.floor(Math.random() * 3)];
            return (
              <Link className="flex-1" to={slug}>
                <div
                  className={`m-6 relative overflow-hidden bg-${color}-500 rounded-lg max-w-xs shadow-lg`}
                >
                  <svg
                    className="absolute bottom-0 left-0 mb-8"
                    viewBox="0 0 375 283"
                    fill="none"
                    style={{ transform: 'scale(1.5)', opacity: '0.1' }}
                  >
                    <rect
                      x="159.52"
                      y="175"
                      width="152"
                      height="152"
                      rx="8"
                      transform="rotate(-45 159.52 175)"
                      fill="white"
                    />
                    <rect
                      y="107.48"
                      width="152"
                      height="152"
                      rx="8"
                      transform="rotate(-45 0 107.48)"
                      fill="white"
                    />
                  </svg>
                  <div className="relative pt-10 px-10 flex items-center justify-center">
                    <div
                      className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                      style={{
                        background: 'radial-gradient(black, transparent 60%)',
                        transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
                        opacity: '0.2'
                      }}
                    ></div>
                    <img className="relative w-40" src={image} alt=""></img>
                  </div>
                  <div className="relative text-white px-6 pb-6 mt-6">
                    <div className="flex justify-between">
                      <span className="block font-semibold text-xl">{name}</span>
                      <span
                        className={`block bg-white rounded-full text-${color}-500 text-xs font-bold px-3 py-2 leading-none flex items-center`}
                      >
                        ${price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          }
        );
      }}
    ></StaticQuery>
  </div>
);
export default IndexPage;
