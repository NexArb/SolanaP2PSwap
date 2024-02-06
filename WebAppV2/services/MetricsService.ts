import ApiServiceV2 from './ApiService';

/** Facilitates requests to the fetcher */
class MetricsService extends ApiServiceV2 {
  constructor() {
    const host = process.env.NEXT_PUBLIC_METRICS_SERVER_HOST!;
    const ssl = process.env.NEXT_PUBLIC_METRICS_SERVER_SSL === 'true';
    const _port = process.env.NEXT_PUBLIC_METRICS_SERVER_PORT;
    const port = _port ? +_port : undefined;
    const ep = process.env.NEXT_PUBLIC_METRICS_SERVER_ENDPOINT;
    super({ host, ssl, port, ep });
  }

  /** Gets data from graph endpoints
   * @param endpoint Endpoint to fetch data from
   * @param params Params to request
   * @param dur Duration of data
   * @param group Grouping of data
   */
  public async getGraph<T = any>(endpoint: string, params: string[]) {
    const body: Record<string, string | string[]> = { params };
    const res = await this.post<T>(endpoint, body);
    return res;
  }
}

export default new MetricsService();
