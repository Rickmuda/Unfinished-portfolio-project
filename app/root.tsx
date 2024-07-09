import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";

export const links = () => {
  return [{ rel: "stylesheet", href: "../public/assets/style/root.css" }];
};

const ExclusionContext = createContext({
  exclude: false,
  setExclude: (exclude: boolean) => {}
});

const useExclusion = () => {
  return useContext(ExclusionContext);
};

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const BackButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={handleClick}>
      Back
    </button>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { exclude } = useExclusion();
  return (
    <>
      {!exclude && <BackButton />}
      {children}
    </>
  );
};

export default function App() {
  const [exclude, setExclude] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const excludedPaths = ['/', '/mainscreen'];
    if (excludedPaths.includes(location.pathname)) {
      setExclude(true);
    } else {
      setExclude(false);
    }
  }, [location]);

  return (
    <ExclusionContext.Provider value={{ exclude, setExclude }}>
      <RootDocument>
        <Layout>
          <Outlet />
        </Layout>
      </RootDocument>
    </ExclusionContext.Provider>
  );
}
