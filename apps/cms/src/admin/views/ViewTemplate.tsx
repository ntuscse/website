import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useConfig } from "payload/dist/admin/components/utilities/Config";

import { DefaultTemplate } from "payload/components/templates";
import { Eyebrow } from "payload/components/elements";
import { AdminViewComponent } from "payload/config";
import { useStepNav } from "payload/components/hooks";
import { Meta } from "payload/components/utilities";

type ViewTemplateProps = React.ComponentProps<AdminViewComponent> & {
  description: string;
  keywords: string;
  /** Page Title */
  title: string;
  children: React.ReactNode;
};

const ViewTemplate = ({
  user,
  canAccessAdmin,
  description,
  keywords,
  title,
  children,
}: ViewTemplateProps) => {
  const {
    routes: { admin: adminRoute },
  } = useConfig();
  const { setStepNav } = useStepNav();

  // This effect will only run one time and will allow us
  // to set the step nav to display our custom route name

  useEffect(() => {
    setStepNav([
      {
        label: title,
      },
    ]);
  }, [setStepNav, title]);

  // If an unauthorized user tries to navigate straight to this page,
  // Boot 'em out
  if (!user || (user && !canAccessAdmin)) {
    return <Redirect to={`${adminRoute}/unauthorized`} />;
  }

  return (
    <DefaultTemplate>
      <Meta title={title} description={description} keywords={keywords} />
      <Eyebrow />
      <div className="gutter--left gutter--right">
        <h1>{title}</h1>
        {children}
      </div>
    </DefaultTemplate>
  );
};

export default ViewTemplate;
