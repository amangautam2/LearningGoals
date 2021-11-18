import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from "graphql";

import { Book } from "./book.js";
import { BookModel } from "../db/models/book.js";

const Author = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(Book),
            resolve(parents, args) {
                return BookModel.find({
                    authorId: parents.id
                });
            }
        }
    })
});

export { Author };