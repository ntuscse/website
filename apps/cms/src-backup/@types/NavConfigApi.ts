export class NavConfigApi{
  constructor(
    public logo_url = '',
    public navitem = new Array<NavConfig>,
  ) { }
}

export class NavConfig {
  constructor (
    public nav_title = "",
    public description = "",
    public subnav = new Array<SubnavConfig>,
  ) {}
}

export class SubnavConfig {
  constructor(
    public subnav_title = "",
    public subnav_url = "",
  ) { }
}
