import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } from "graphql";

import { Book } from "./book.js";
import { Author } from "./author.js";
import { AuthorModel } from "../db/models/author.js";
import { BookModel } from "../db/models/book.js";
import { Mutation } from "../mutations/mutations.js";

const Root =  new GraphQLObjectType({
    name: 'Root',
    fields: {
        book: {
            type: Book,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parents, args) {
                return BookModel.findById(args.id);
            }
        },
        author: {
            type: Author,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parents, args) {
                return AuthorModel.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(Book),
            resolve(parents, args) {
                return BookModel.find({});
            }
        },
        authors: {
            type: new GraphQLList(Author),
            resolve(parents, args) {
                return AuthorModel.find({});
            }
        }
    }
});

const RootSchema = new GraphQLSchema({
    query: Root,
    mutation: Mutation
});

export { RootSchema };