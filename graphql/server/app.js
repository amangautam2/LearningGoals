import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";

import { RootSchema } from "./schema/root.js";

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://amangautam:password@cluster0.khytq.mongodb.net/testGrapql?retryWrites=true&w=majority');
mongoose.connection.once('open', () => { 
    console.log("Connected to database")
});

app.use('/graphql', graphqlHTTP({
    schema: RootSchema,
    graphiql: true
}));

app.listen(8080, console.log('Server is listening at port 8080'));