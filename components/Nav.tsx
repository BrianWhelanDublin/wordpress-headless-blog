import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <div className="home-link">
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
