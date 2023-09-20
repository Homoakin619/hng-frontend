"use client";
import { signOut, useSession } from "next-auth/react";

export default function Navigation({handler}: any) {
  const { data: session, status } = useSession();

  return (
    <nav className="navbar custom-nav navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand brand" href="#">
          IMAGE GALLERY
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="ms-auto navbar-nav pe-4">
            {session ? (
              <>
                <form className="d-flex me-3 form" role="search" >
                  <input
                    id="search"
                    onKeyUp={handler}
                    className="form-control me-2"
                    type="search"
                    placeholder="Search images by Category"
                    aria-label="Search"
                  />
                </form>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    {session.user?.email}
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-danger"
                    aria-current="page"
                    onClick={() => {
                      signOut({ callbackUrl: "/auth/login" });
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                {/* <button className="nav-link btn btn-danger" aria-current="page" onClick={()=> {signOut({callbackUrl:"/auth/login"})}}>Login</button> */}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
