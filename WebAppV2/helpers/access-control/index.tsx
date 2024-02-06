const allowedProjects = [
  'aave',
  'uniswap',
  'compound',
  'curve',
  'fraxfinance',
  'balancer',
  'pancakeswap',
  'radiantcapital',
  'swaap',
];

export default class ProjectAccessControl {
  isAllowed: boolean;

  constructor(projectSlug: string) {
    /**Allowed Projects */
    this.isAllowed = allowedProjects.includes(projectSlug);
  }
}
