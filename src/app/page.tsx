import Link from "next/link";

const LINK = (path: string, name: string) => {
  return (
    <li>
      <Link href={path}>{name}</Link>
    </li>
  );
};

const Home = () => {
  return (
    <>
      <h1>ページ一覧</h1>

      <ul>
        {LINK("/test", "テストページ")}
      </ul>
    </>
  );
};

export default Home;
