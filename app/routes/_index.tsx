import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

 
export const meta: MetaFunction = () => {
  return [
    { title: "Title Screen" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Sup cock fuckers</h1>
      <Link to="saves">Biggiedaggoe</Link>
    </div>
  );
}
