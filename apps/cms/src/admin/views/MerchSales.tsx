import React, { useEffect, useState } from "react";
import { Button } from 'payload/components/elements';
import { AdminView } from 'payload/config';
import ViewTemplate from "./ViewTemplate";
import Table from "payload/dist/admin/components/elements/Table";
import { Column } from "payload/dist/admin/components/elements/Table/types";
import { Order } from "../../@types/Order";
import OrdersApi from "../../apis/orders.api";
import { IOrder } from "../../@types/IOrder";
import { RenderCellFactory } from "../utils/RenderCellFactory";
import SortedColumn from "../utils/SortedColumn";

const MerchSales: AdminView = ({ user, canAccessAdmin }) => {

  // Get data from API
  const [data, setData] = useState<IOrder[]>(null);
  useEffect(() => {
    OrdersApi.getOrders()
      .then(
        (res: IOrder[]) => setData(res)
      )
      .catch((error) => console.log(error));
  }, []);

  // Output human-readable table headers based on the attribute names from the API
  function prettifyKey(str: string): string {
    let res = "";
    for (const i of str.split('_')) {
      res += i.charAt(0).toUpperCase() + i.slice(1) + " "
    }
    return res;
  }

  // Do not load table until we receive the data
  if (data==null) {
    return <div> Loading... </div>
  }

  const tableCols = new Array<Column>();
  for (const key of Object.keys(new Order())) {
    const renderCell: React.FC<{children?: React.ReactNode}> = RenderCellFactory.get(data[0], key);

    const col: Column = {
      accessor: key,
      components: {
        Heading: (
          <SortedColumn
            label={prettifyKey(key)}
            name={key}
            data={data as never[]}/>
        ),
        renderCell: renderCell
      },
      label: "",
      name: "",
      active: false
    }
    tableCols.push(col);
  }

  return (
  <ViewTemplate
    user={user}
    canAccessAdmin={canAccessAdmin}
    description=""
    keywords=""
    title="Merchandise Sales"
  >
    <Button
      el="link"
      to={"/admin"}
      buttonStyle="primary"
    >
      Go to Main Admin View
    </Button>

    <Table columns={tableCols} data={data}/>

  </ViewTemplate>
  );
};

export default MerchSales
