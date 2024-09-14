import { AppBar } from "@mui/material";
import React from "react";
import App from "../App";

function NavBar() {
  console.log(window.location.pathname !=="/")
  return (
    <div>
      <ul>
        {window.location.pathname !=="/" && (
                  <li><a href="/">Homepage</a></li>
        )}
        <li><a href="/authors">Show Authors</a></li>
        <li><a href="/addAuthor">Add Author </a></li>
        <li><a href="/addBook">Add Book</a></li>
      </ul>
    </div>
  );
}

export default NavBar;
