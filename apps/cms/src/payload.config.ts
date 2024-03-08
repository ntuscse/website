import { buildConfig } from "payload/config";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter as createS3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import path from "path";

import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";

import AfterNavLinks from "./admin/components/AfterNavLinks";

import MerchSales from "./admin/views/MerchSales";
import MerchOverview from "./admin/views/MerchOverview";
import MerchProducts from "./admin/views/MerchProducts";
import MerchPromotion from "./admin/views/MerchPromotion";
import { SCSEIcon, SCSELogo } from "./admin/graphics/Logos";
import BeforeNavLinks from "./admin/components/BeforeNavLinks";
import Order from "./collections/Orders";
import { isUsingCloudStore } from "./utilities/cloud";

const adapter = createS3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
  },
  bucket: process.env.S3_BUCKET,
});

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    components: {
      graphics: {
        Logo: SCSELogo,
        Icon: SCSEIcon,
      },
      routes: [
        {
          path: "/merch/overview",
          Component: MerchOverview,
        },
        {
          path: "/merch/sales",
          Component: MerchSales,
        },
        {
          path: "/merch/products",
          Component: MerchProducts,
        },
        {
          path: "/merch/promotions",
          Component: MerchPromotion,
        },
      ],
      beforeNavLinks: BeforeNavLinks,
      afterNavLinks: AfterNavLinks,
    },
    user: Users.slug,
    css: path.resolve(__dirname, "admin", "styles.scss"),
  },
  collections: [Categories, Posts, Tags, Users, Media, Order],
  csrf: [
    // whitelist of domains to allow cookie auth from
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
  ],
  typescript: {
    // outputFile: path.resolve(__dirname, "payload-types.ts"),
    outputFile: path.resolve(
      __dirname,
      "../../../packages/types/src/lib/cms.ts"
    ), // overridden by PAYLOAD_TS_OUTPUT_PATH env var
  },
  graphQL: {
    schemaOutputFile: path.resolve(
      __dirname,
      "../../../packages/schemas/lib/cms.graphql"
    ),
  },
  plugins: isUsingCloudStore()
    ? [
        cloudStorage({
          collections: {
            media: {
              adapter: adapter,
            },
          },
        }),
      ]
    : [],
});
