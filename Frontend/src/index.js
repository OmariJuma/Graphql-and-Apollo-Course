import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AddAuthor from "./components/AddAuthor";
import NavBar from "./components/NavBar";
import ShowSingleBook from "./components/ShowSingleBook";
import ShowSingleAuthor from "./components/ShowSingleAuthor";
import ShowAuthors from "./components/ShowAuthors";
import AddBook from "./components/AddBook";



const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URI}/graphql`,
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
        <NavBar/>
      <Router>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/authors" element={<ShowAuthors/>}/>
          <Route path="/author/:id" element={<ShowSingleAuthor/>}/>
          <Route path="/book/:id" element={<ShowSingleBook/>}/>
          <Route path="/addAuthor" element={<AddAuthor/>}/>
          <Route path="/addBook" element={<AddBook/>}/>

        </Routes>
      </Router>
    </React.StrictMode>
  </ApolloProvider>
);
