import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <div className="title">
        <h1>NEXT APP</h1>
      </div>
      <nav >
        <ul className="nav-bar">
          <li className="nav-links">
            <Link href="/">HOME</Link>
          </li>
          <li className="nav-links">
            <Link href="/about">ABOUT</Link>
          </li>
          <li className="nav-links">
            <Link href="/users">USERS</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
