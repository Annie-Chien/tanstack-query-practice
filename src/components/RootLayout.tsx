import React from "react";
import { Link, Outlet } from "react-router-dom";
import S from "./RootLayout.module.scss";

const RootLayout = () => {
  return (
    <div className={S.layout}>
      <header>
        <nav className={S.navbar}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/friends">Friends</Link>
            </li>
            <li>
              <Link to="/rq-friends">RQ Friends</Link>
            </li>
            <li>
              <Link to="/rq-parallel">Parallel</Link>
            </li>
            <li>
              <Link to="/rq-dependent">Dependent</Link>
            </li>
            <li>
              <Link to="/rq-paginated">Paginated</Link>
            </li>
            <li>
              <Link to="/rq-infinite">Infinite</Link>
            </li>
            <li>
              <Link to="/rq-mutation">Mutation</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={S.contents}>
        <Outlet />
      </main>
      <footer className={S.footer}>© 2023 Annie's Practice</footer>
    </div>
  );
};

export default RootLayout;
