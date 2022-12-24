import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useConfig } from "payload/dist/admin/components/utilities/Config";

import { DefaultTemplate } from 'payload/components/templates';
import { Button, Eyebrow } from 'payload/components/elements';
import { AdminView } from 'payload/config';
import { useStepNav } from 'payload/components/hooks';
import { Meta } from 'payload/components/utilities';

const viewLabel = "Merchandise"

const MerchSales: AdminView = ({ user, canAccessAdmin }) => {
  const { routes: { admin: adminRoute } } = useConfig();
  const { setStepNav } = useStepNav();

  // This effect will only run one time and will allow us
  // to set the step nav to display our custom route name

  useEffect(() => {
    setStepNav([
      {
        label: viewLabel,
      },
    ]);
  }, [setStepNav]);

  // If an unauthorized user tries to navigate straight to this page,
  // Boot 'em out
  if (!user || (user && !canAccessAdmin)) {
    return (
      <Redirect to={`${adminRoute}/unauthorized`} />
    );
  }

  return (
    <DefaultTemplate>
      <Meta
        title={viewLabel}
        description="Merchandise Sales Dashboard and Panel"
        keywords="Payload, CMS, Merchandise"
      />
      <Eyebrow />
      <div className="gutter--left gutter--right">
        <h1>Merchandise Sales</h1>
        <p>Here is a custom route that was added in the Payload config. It uses the Default Template, so the sidebar is rendered.</p>
        <Button
          el="link"
          to={`${adminRoute}`}
          buttonStyle="secondary"
        >
          Go to Main Admin View
        </Button>
      </div>
    </DefaultTemplate>
  );
};

export default MerchSales
