import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  //<a href="./demo.html">
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <h1 className="navbar-brand mb-0 h1">Star Wars</h1>
        </Link>
        <div>
          <div className="nav-item dropdown">
            <button
              className=" btn btn-primary dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favoritos
            </button>
            <ul
              className="dropdown-menu list-unstyled"
              aria-labelledby="navbar Dropdown"
            >
              {store.favoritos && store.favoritos.length > 0 ? (
                <>
                  {store.favoritos.map((item, index) => {
                    return (
                      <li>
                        {" "}
                        <Link class="dropdown-item" key={index} to={item.link}>
                          {item.name}
                        </Link>
                        <button className="btn d-flex" onClick={""}>X</button>
                      </li>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

/*

[{},{},{
	label:"",
	done:false
} ] 

[{},{},{
	name:"",
	uid:1,
	categoy:"people"
} ] 

*/
