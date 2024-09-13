const graphql = require("graphql");
const { Author, Book } = require("../models/models");
const { GraphQLSchema } = graphql;

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } =
graphql;

const books = [
    { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
    { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
    { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
    { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "3" },
    { name: "The Colour of Magic", genre: "Comedy", id: "5", authorId: "1" },
    //get other genres other than fantasy and sci-fi from https://www.goodreads.com/genres/list
    { name: "The Light Fantastic", genre: "Romance", id: "6", authorId: "3" },
];
const authors = [
    { name: "Patrick Rothfuss", age: 44, id: "1" },
    { name: "Brandon Sanderson", age: 42, id: "2" },
    { name: "Terry Pratchett", age: 66, id: "3" },
];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                const author = Author.findById(parent.authorId)
                return author;
            },
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: graphql.GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                const book = Book.findById({ authorId: parent.id })
                return book;
            },
        },
    }),
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        AddAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age,
                });
                return author.save();
            },
        },
        AddBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            },
        },
    },
});
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to do something in the db goes here
                let book = Book.findById(args.id)
                return book;
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                let author = Author.findById(args.id)
                return author;
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                const authors = Author.find({});
                return authors;
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                let books = Book.find({})
                return books;
            },
        },
    }),
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});