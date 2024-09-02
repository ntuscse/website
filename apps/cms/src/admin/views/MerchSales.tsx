import React, { useEffect, useState } from "react";
import { Button } from "payload/components/elements";
import { AdminViewComponent } from "payload/config";
import ViewTemplate from "./ViewTemplate";
import { Column } from "payload/dist/admin/components/elements/Table/types";
import { Order } from "../../@types/Order";
import OrdersApi from "../../apis/orders.api";
import { RenderCellFactory } from "../utils/RenderCellFactory";
import SortedColumn from "../utils/SortedColumn";
import { Table } from "payload/dist/admin/components/elements/Table";
import { useHistory } from 'react-router-dom';


const MerchSales: AdminViewComponent = ({ user, canAccessAdmin }) => {
    // Get data from API
  const [data, setData] = useState<Order[]>(null);
  const history = useHistory();
  useEffect(() => {
    const fetchOrders = async () => { 
      try {
        const orders: Order[] = await OrdersApi.getOrders();
        setData(orders);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchOrders();
    }, []);

  // Output human-readable table headers based on the attribute names from the API
  function prettifyKey(str: string): string {
    let res = "";
    for (const i of str.split("_")) {
      res += i.charAt(0).toUpperCase() + i.slice(1) + " ";
    }
    return res;
  }

  // Do not load table until we receive the data
  if (data == null) {
    return <div>Loading...</div>;
  }

  const tableCols = new Array<Column>();
  for (const key of Object.keys(new Order())) {
    const renderCellComponent = RenderCellFactory.get(data[0], key);
    const renderCell: React.FC<{ children?: React.ReactNode }> =
      renderCellComponent instanceof Promise
        ? renderCellComponent
        : renderCellComponent;

    const col: Column = {
      accessor: key,
      components: {
        Heading: (
          <SortedColumn
            label={prettifyKey(key)}
            name={key}
            data={data as never[]}
          />
        ),
        renderCell: renderCell,
      },
      label: "",
      name: "",
      active: true,
    };
    tableCols.push(col);
  }

  const editColumn: Column = {
    accessor: "edit",
    components: {
      Heading: <div>Edit</div>,
      renderCell: (data: Order) => (
        <Button onClick={() => handleEdit(data)}>Edit</Button>
      ),
    },
    label: "Edit",
    name: "edit",
    active: true,
  };

  tableCols.push(editColumn);

  const handleEdit = (data: Order) => {
    const orderId = data.id;
    // Navigate to edit
    history.push(`/admin/collections/orders/${orderId}`)
  };

  return (
    <ViewTemplate
      user={user}
      canAccessAdmin={canAccessAdmin}
      description=""
      keywords=""
      title="Merchandise Sales"
    >
      <Button el="link" to={"/admin"} buttonStyle="primary">
        Go to Main Admin View
      </Button>

      <Table data={data} columns={tableCols} />
    </ViewTemplate>
  );
};

export default MerchSales;
