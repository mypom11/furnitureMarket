import React from "react";

const Layout = ({ children }: defaultProps) => {
  return (
    <main className="m-auto min-h-screen max-w-[1920px] bg-light pb-32 dark:bg-dark">
      {children}
    </main>
  );
};

export default Layout;
