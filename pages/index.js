import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/component/Layout";
import AppContext from "@/context/appContext";

const Home = ({ users }) => {
  const [myUsers, setMyUsers] = useState(users);

  return (
    <>
      <Head>
        <title>NextJS MySQL CRUD tutorial</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="Description" content="NextJS MySQL CRUD tutorial" />
        <meta name="author" content="anand346@BePractical" />
        <meta name="og:url" content="https://www.linkedin.com/in/anand346" />
      </Head>
      <main>
        <AppContext.Provider value={{ users: myUsers, setUsers: setMyUsers }}>
          <Layout />
        </AppContext.Provider>
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user`);
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
};

export default Home;
