import { buildConfig } from 'payload/config';
import path from 'path';

import Categories from './collections/Categories';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Users from './collections/Users';

import MerchSales from "./admin/views/MerchSales";
import AfterNavLinks from "./admin/components/AfterNavLinks";

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    components: {
      // graphics: {
      //   Logo: ScseIcon,
      //   Icon: ScseIcon
      // }
      routes: [
        { path: '/merch/sales',
          Component: MerchSales
        },
      ],
      afterNavLinks: AfterNavLinks
    },
    user: Users.slug,
  },
  collections: [
    Categories,
    Posts,
    Tags,
    Users,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
