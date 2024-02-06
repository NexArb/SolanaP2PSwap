import { AxiosError } from 'axios';
import { DependencyList, useEffect, useState } from 'react';
import { Serializable } from 'child_process';
import MetricsService from '@/services/MetricsService';

/** Processes metrics request to the given endpoint
 * @param endpoint Endpoint to send the request to
 * @param deps Dependencies for refreshing the data
 * @param isPost Sends a post request if true
 * @param body Body of the request, only for post requests
 */
export const useMetricsApi = <ResponseBody = any>(
  endpoint: string,
  deps: DependencyList = [],
  isPost = false,
  body?: Serializable,
  onDataChange?: (data: ResponseBody) => void,
) => {
  const [data, setData] = useState<ResponseBody>();
  const [metadata, setMetadata] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError>();

  const refresh = () => {
    callApi();
  };

  const callApi = () => {
    const method = isPost
      ? MetricsService.post<ResponseBody>(endpoint, body)
      : MetricsService.get<ResponseBody>(endpoint);
    setLoading(true);
    setError(undefined);
    method
      .then((res:any) => {
        setData(res.data.data);
        onDataChange && onDataChange(res.data.data);
        setMetadata(res.data.metadata);
        setError(undefined);
      })
      .catch((e) => {
        setError(e);
        setMetadata(undefined);
        setData(undefined);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    callApi();
  }, [endpoint, isPost, ...deps]);

  return { loading, data, metadata, error, refresh };
};
