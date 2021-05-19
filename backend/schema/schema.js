const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql; 
const { getUserByCreds, createUser } = require('../controller/userController');

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        user_id: { type: GraphQLID },
        name: { type: GraphQLString},
        phone_number: { type: GraphQLString },
        photo_URL: { type: GraphQLString },
        default_currency: { type: GraphQLString },
        language: { type: GraphQLString },
        email: { type: GraphQLString },
        timezone: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        user: {
            type: UserType,
            args: { 
                // name: { type: GraphQLString }, 
                email: { type: GraphQLString }, 
                // password: { type: GraphQLString } 
            },
            async resolve(parent, args) {
                console.log("resolving");
                let userRes = await getUserByCreds(args.email);
                console.log(userRes);
                return userRes.body;
                },
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString }, 
                email: { type: GraphQLString }, 
                password: { type: GraphQLString } 
            },
            async resolve(parent, args) {
                console.log("resolving");
                const { email, name, password } = args;
                let createRes = await createUser(name, email, password);
                console.log(createRes);
                // const { body } = crea
                return createRes.body;
                },
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;