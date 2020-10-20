import gql from "graphql-tag";

export const GET_INGREDIENT_BY_ID = gql`
        query GetIngredientById($id: Int!) {
          ingredient(id: $id) {
            id
            name
            description
          }
        }
      `;

export const SEARCH_BOOK = gql`
            query SearchKnowledge($string: String!, $limit: Int!, $lookaround: Int!) {
              searchKnowledge(string: $string, limit: $limit, lookaround: $lookaround) {
                id name content
              }
            }`;

export const GET_ALL_PRODUCTS = gql`
        { allProducts {id name description tags} }
      `;

export const GET_PRODUCT_DETAILS = gql`
      query GetProductDetails($id: Int!) {
        product(id: $id) {
          id name description
        }
      }
      `;

export const CREATE_ORDER_REQUEST = gql`
        mutation CreateOrder($orderedBy: String!, $product: Int!, $count: Int!) {
          createOrder(orderedBy: $orderedBy, product: $product, count: $count) {
            id
          }
        }
      `;

export const GET_ALL_INGREDIENTS = gql`{
          allIngredients {
            id
            name
          }
        }`;
