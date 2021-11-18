import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

import { Author } from "./author.js";
import { AuthorModel } from "../db/models/author.js";

const Book = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: Author,
            resolve(parents, args) {
                return Author.findById(parents.authorId);    
            }
        }
    })
});

export { Book };