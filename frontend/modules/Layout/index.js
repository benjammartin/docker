import React from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const Layout = ({children}) => (
  <Query
    query={gql `
    query {
      session {
      maxAge
      revalidateAge
      user {
      id
    }
  }
}
`}
  >
    {({ loading, error, data }) => {
      console.log(data)
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
        return <div>{children}</div>
    }}
  </Query>
);

Layout.displayName = "Layout";

export default Layout;
