const graphql = require('graphql');
const bcrypt = require('bcrypt');
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
const { createGroup } = require('../controller/groupController');
const { createActivity, getActivities } = require('../controller/recentActivityController');
const { createExpense, getExpenses } = require('../controller/expenseController');
const { getTransactionsArray } = require('../services/bulkTxCreater');
const { createTransactionsForExpense } = require('../controller/transactionController');
const { getMyGroups } = require('../controller/groupUserController');

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

const groupType = new GraphQLObjectType({
    name: 'group',
    fields: () => ({
        group_id: { type: GraphQLID },
        created_by: { type: GraphQLString},
        group_name: { type: GraphQLString },
        photo_URL: { type: GraphQLString },
    })
}); 

const expenseType = new GraphQLObjectType({
    name: 'expense',
    fields: () => ({
        expense_id: { type: GraphQLID },
        date: { type: GraphQLString},
        description: { type: GraphQLString },
        paid_by: { type: GraphQLString },
        amount: { type: GraphQLString },
        expense_added_by: { type: GraphQLString },
        group_name: { type: GraphQLString },
    })
});

const activityType = new GraphQLObjectType({
    name: 'activity',
    fields: () => ({
        activity_id: { type: GraphQLID },
        operation_type: { type: GraphQLString},
        email: { type: GraphQLString },
        group_name: { type: GraphQLString }
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
                password: { type: GraphQLString } 
            },
            async resolve(parent, args) {
                console.log("resolving");
                let userRes = await getUserByCreds(args.email);
                    userRes.body;
                    const match = await bcrypt.compare(args.password, userRes.body.password);
                    console.log(match);
                    if(match){
                        return userRes.body;
                    } else{
                        return 'Wrong password';
                    }
            },
        },
        activity: {
            type: activityType,
            args: {
                userID: { type: GraphQLString }
            },
            async resolve(parent, args){
                const activitiesRes = await getActivities(args.userID);
                return activitiesRes.body;
            }
        },
        expenses: {
            type: expenseType,
            args: {
                group_name: { type: GraphQLString },
            },
            async resolve(parent, args){
                const expRes = await getExpenses(args.group_name);
                return expRes.body;
            }
        },
        myGroups: {
            type: UserType,
            args: {
                user_id: { type: GraphQLID }
            },
            async resolve(parent, args){
                const invitationListRes = await getMyGroups(args.user_id);
                return invitationListRes.body;
            }
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
        },
        addGroup: {
            type: groupType,
            args: {
                name: { type: GraphQLString }, 
                email: { type: GraphQLString }, 
                userID: { type: GraphQLString } 
            }, 
            async resolve(parent, args) {
                console.log("resolving");
                const { name, email, userID } = args;
                const createRes = await createGroup(name, email, userID);
                if(createRes.statusCode === 201){
                    const activityObject = await createActivity({
                        operation_type: 'CREATE GROUP',
                        email,
                        group_name: createRes.body.dataValues.group_name
                    });
                }
                return createRes.body;


            }
        },
        addExpense: {
            type: expenseType,
            args: {
                paid_by: { type: GraphQLString },
                amount: { type: GraphQLString },
                group_name: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log("resolving");
                const { paid_by, amount, group_name } = args;
                const createRes = await createExpense(args);
                if(createRes.statusCode === 201){
                    const txArray = await getTransactionsArray(group_name, paid_by, amount, createRes.body.dataValues.expense_id);
                    const createTxObject = await createTransactionsForExpense(txArray);
                    const activityObject = await createActivity({
                        operation_type: 'ADD EXPENSE',
                        email: paid_by,
                        group_name,
                    });
                }
                return createRes.body;
            }
        }

    }
});



const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;