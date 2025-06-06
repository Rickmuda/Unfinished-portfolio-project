import { Links, useNavigate, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";
import React, { createContext, useContext, useEffect, useState } from "react";

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: "/assets/styles/responsive.css",
      media: "(max-width: 768px)"
    },
    { rel: "stylesheet", href: "/assets/styles/root.css" },

  ];
};

const ExclusionContext = createContext<{
  exclude: boolean;
  setExclude: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  exclude: false,
  setExclude: () => {}
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
    console.log("Back button clicked"); // Debugging
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
  console.log("Exclude state in Layout:", exclude); // Debugging
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
    console.log("Current location:", location.pathname); // Debugging
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
