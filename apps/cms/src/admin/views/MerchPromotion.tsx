import React, { useEffect, useState } from "react";
import { Button } from "payload/components/elements";
import { AdminViewComponent } from "payload/config";
import ViewTemplate from "./ViewTemplate";
import { Column } from "payload/dist/admin/components/elements/Table/types";
import { RenderCellFactory } from "../utils/RenderCellFactory";
import SortedColumn from "../utils/SortedColumn";
import { Table } from "payload/dist/admin/components/elements/Table";
import { Promotion } from "types";
import PromotionsApi from "../../apis/promotions.api";
import './MerchPromotion.scss';
import { prettifyKey } from "../../utilities/prettifyKey";

const MerchPromotion: AdminViewComponent = ({ user, canAccessAdmin }) => {
  // Get data from API
  const [data, setData] = useState<Promotion[]>(null);
  useEffect(() => {
    PromotionsApi.getPromotions()
      .then((res: Promotion[]) => setData(res))
      .catch((error) => console.log(error));
  }, []);

  // Do not load table until we receive the data
  if (data == null) {
    return <div> Loading... </div>;
  }

  const tableCols = new Array<Column>();
  if (data && data.length > 0) {
    const sampleProduct = data[0];
    const keys = Object.keys(sampleProduct);
    for (const key of keys) {
      const renderCell: React.FC<{ children?: React.ReactNode }> =
        RenderCellFactory.get(sampleProduct, key);
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
  }

  const editColumn: Column = {
    accessor: "edit",
    components: {
      Heading: <div>Edit</div>,
      renderCell: ({ children }) => (
        <Button onClick={() => handleEdit(children as string)}>Edit</Button>
      ),
    },
    label: "Edit",
    name: "edit",
    active: true,
  };

  tableCols.push(editColumn);

  const deleteColumn: Column = {
    accessor: "delete",
    components: {
      Heading: <div>Delete</div>,
      renderCell: ({ children }) => (
        <Button onClick={() => handleDelete(children as string)}>Delete</Button>
      ),
    },
    label: "Delete",
    name: "delete",
    active: true,
  };

  tableCols.push(deleteColumn);

  const handleEdit = (promotionID: string) => {
    console.log(`Dummy. Promotion ID: ${promotionID}`);
  };

  const handleDelete = (promotionID: string) => {
    console.log(`Dummy. Promotion ID: ${promotionID}`);
  };

  const handleCreatePromotion = () => {
    console.log("Creating a new promotion...");
  };

  console.log(tableCols);

  return (
    <ViewTemplate
      user={user}
      canAccessAdmin={canAccessAdmin}
      description=""
      keywords=""
      title="Merchandise Promotion"
    >

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button el="link" to={"/admin"} buttonStyle="primary">
          Go to Main Admin View
        </Button>
        <Button onClick={handleCreatePromotion} buttonStyle="primary">
          Create Promotion
        </Button>
      </div>

      <div className="table">
        <Table data={data} columns={tableCols}/>
      </div>

    </ViewTemplate>
  );
};

export default MerchPromotion;
