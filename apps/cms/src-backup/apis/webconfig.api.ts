import { NavConfig, NavConfigApi } from "../@types/NavConfigApi";

class WebConfigApi{
  // eslint-disable-next-line @typescript-eslint/require-await
  async getOrders(): Promise<NavConfigApi[]> {
    const res: NavConfigApi[] = [];

    const navItem1 : NavConfig = {
      nav_title: "home",
      description: "home description",
      subnav: [
        {
          subnav_url: "./",
          subnav_title: "scse home",
        },
        {
          subnav_url: "./",
          subnav_title: "ntu home",
        },
        {
          subnav_url: "./",
          subnav_title: "home home",
        },
      ]
    }
    const navItem2 : NavConfig = {
      nav_title: "about",
      description: "about description",
      subnav: [
        {
          subnav_url: "./",
          subnav_title: "scse about ",
        },
        {
          subnav_url: "./",
          subnav_title: "ntu about ",
        },
        {
          subnav_url: "./",
          subnav_title: "home abou4",
        },
      ]
    }

    const item1: NavConfigApi= {
      logo_url: "/assets/scse-logo.png",
      navitem: [navItem1, navItem2],
    };
    res.push(item1);
    res.push(item1);

    return res;
  }
}

export default new WebConfigApi();
