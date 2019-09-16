import React from 'react';
import { StaticQuery, Link } from 'gatsby';
import Layout from '../components/layout';

const ProductsPage = () => (
  <Layout>
    <div id="app" class="antialiased text-gray-900">
      <div class="bg-gray-200 min-h-screen p-8 flex flex-col justify-center">
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
              }) => (
                <div>
                  <div className="relative pb-5/6">
                    <img
                      className="absolute h-full w-full object-cover rounded-lg shadow-md"
                      src={image}
                      alt="imageAlt"
                    ></img>
                  </div>
                  <div className="relative px-4 -mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h4 className="mt-1 font-semibold text-lg leading-tight truncate">
                        <Link to={slug}>{name}</Link>
                      </h4>
                      <div className="mt-1">${price}</div>
                    </div>
                  </div>
                </div>
              )
            );
          }}
        ></StaticQuery>
      </div>
    </div>
  </Layout>
);
export default ProductsPage;
