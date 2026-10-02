export const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Perfume {
        id: ID!
        name: String!
        brand: String!
        description: String!
        price: Float!
        volume: Int!
        owner: User!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        users: [User!]!
        me: User
        perfumes: [Perfume!]!
    }

    type Mutation {
        register(name: String!, email: String!, password: String!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
        createPerfume(
            name: String!
            brand: String!
            description: String!
            price: Float!
            volume: Int!
        ): Perfume!
        deletePerfume(id: ID!): Boolean!
    }
`;