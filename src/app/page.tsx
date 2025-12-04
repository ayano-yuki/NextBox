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

      <h2>コンポーネント</h2>
      <ul>
        {LINK("/test", "テストページ")}
      </ul>

      <h2>関数</h2>
      <ul>
        {LINK("/browser-back", "ブラウザバック禁止ページ")}
      </ul>
    </>
  );
};

export default Home;
