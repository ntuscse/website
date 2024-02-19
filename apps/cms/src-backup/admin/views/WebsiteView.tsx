
import React, { useEffect, useState } from "react";
import { Button } from "payload/components/elements";
import { AdminView } from "payload/config";
import ViewTemplate from "./ViewTemplate";
import { Column } from "payload/dist/admin/components/elements/Table/types";
import { Order } from "../../@types/Order";
import OrdersApi from "../../apis/orders.api";
import { IOrder } from "../../@types/IOrder";
import { RenderCellFactory } from "../utils/RenderCellFactory";
import SortedColumn from "../utils/SortedColumn";
import { Table } from "payload/dist/admin/components/elements/Table";

const WebsiteView : AdminView = ({ user, canAccessAdmin }) => {
  // Get data from API
  const [data, setData] = useState<IOrder[]>(null);

  // Output human-readable table headers based on the attribute names from the API
  if (data == null) {
    return <div> Loading... </div>;
  }
  console.log("not showing")

  return (
    <ViewTemplate
      user={user}
      canAccessAdmin={canAccessAdmin}
      description="world"
      keywords="hello"
      title="Merchandise Sales"
    >
      <Button el="link" to={"/admin"} buttonStyle="primary">
        Go to Main Admin View
      </Button>

    </ViewTemplate>
  );
};

export default WebsiteView;
