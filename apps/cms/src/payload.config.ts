import { buildConfig } from 'payload/config';
import { oAuthPlugin } from 'payload-plugin-oauth';
import axios from 'axios';
import path from 'path';

import Categories from './collections/Categories';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Users from './collections/Users';

import AfterNavLinks from "./admin/components/AfterNavLinks";

import MerchSales from "./admin/views/MerchSales";
import MerchOverview from "./admin/views/MerchOverview";
import MerchProducts from "./admin/views/MerchProducts";
import { SCSEIcon, SCSELogo } from "./admin/graphics/Logos";
import BeforeNavLinks from "./admin/components/BeforeNavLinks";

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
          path: '/merch/overview',
          Component: MerchOverview
        },{
          path: '/merch/sales',
          Component: MerchSales
        },{
          path: '/merch/products',
          Component: MerchProducts
        },
      ],
      beforeNavLinks: BeforeNavLinks,
      afterNavLinks: AfterNavLinks
    },
    user: Users.slug,
    css: path.resolve(__dirname, 'admin', 'styles.scss'),
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
  plugins: [
    oAuthPlugin({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorizationURL: process.env.OAUTH_SERVER + '/oauth2/v2.0/authorize',
      tokenURL: process.env.OAUTH_SERVER + '/oauth/token',
      callbackURL: process.env.PAYLOAD_PUBLIC_SERVER_URL + '/oauth2/callback',
      scope: 'basic',
      async userinfo(accessToken) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data: user } = await axios.get(process.env.OAUTH_SERVER + '/oauth/me', {
          params: { access_token: accessToken },
        })
        return {
          sub: user.ID,

          // Custom fields to fill in if user is created
          name: user.display_name || user.user_nicename || 'Naamloos',
          email: user.user_email,
          role: user.capabilities?.administrator ? 'admin' : 'user',
        }
      },
    }),
  ],

});
