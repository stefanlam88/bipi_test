## TEST
# use tech stack
# NodeJS
# GraphQL
# Knex
# Postgres
# Fastify

## GRAPHQL
type Merchant {
  id: Int
  merchant_name: String
  phone_number: String
  latitude: Float
  longitude: Float
  is_active: Boolean
  recorded_date: String
}

input Sort {
  field: String
  order: String
}

type Query {
  getMerchant(id: Int): Merchant!
  getMerchantList(limit: Int!, offset: Int!, sort: Sort!): [Merchant!]!
}

input MerchantInput {
  merchant_name: String!
  phone_number: String!
  latitude: Float!
  longitude: Float!
}

type Mutation {
  addMerchant(input: MerchantInput): Merchant!
  updateMerchant(id: ID, input: MerchantInput): Merchant!
  updateBulkIsActive(id: [ID], is_active: Boolean!):Boolean!
}

## npm run start
http://localhost:3000/graphiql
