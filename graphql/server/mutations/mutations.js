import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

import { Author } from "../schema/author.js";
import { AuthorModel } from "../db/models/author.js";
import { Book } from "../schema/book.js";
import { BookModel } from "../db/models/book.js";

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: Author,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parents, args) {
                let author = new AuthorModel({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: Book,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parents, args) {
                let book = new BookModel({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

export { Mutation }