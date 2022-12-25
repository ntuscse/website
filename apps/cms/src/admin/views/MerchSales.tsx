import React from "react";
import { Button } from 'payload/components/elements';
import { AdminView } from 'payload/config';
import ViewTemplate from "./ViewTemplate";

const MerchSales: AdminView = ({ user, canAccessAdmin }) => {
  return (
  <ViewTemplate
    user={user}
    canAccessAdmin={canAccessAdmin}
    description=""
    keywords=""
    title="Merchandise Sales"
  >
    <p>Here is a custom route that was added in the Payload config. It uses the Default Template, so the sidebar is rendered.</p>
    <Button
      el="link"
      to={"/admin"}
      buttonStyle="primary"
    >
      Go to Main Admin View
    </Button>
  </ViewTemplate>
  );
};

export default MerchSales
