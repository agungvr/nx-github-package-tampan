import axios, { AxiosRequestConfig, Method } from 'axios'

import UrlPattern from 'url-pattern'

interface ServiceConfigInstanceRequestInterface
  extends Pick<AxiosRequestConfig, 'data' | 'params'> {
  url: Exclude<AxiosRequestConfig['url'], undefined>
  urlParams?: Record<string, unknown>
  version?: 'v1' | 'v2'
  contentType?: 'application/json' | 'multipart/form-data'
  config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'data' | 'method'>
}

export const createAxiosInstance = (baseURL: string) => {
  const axiosInstance = axios.create({ baseURL })

  const urlAndParamsGenerator = (
    url: ServiceConfigInstanceRequestInterface['url'],
    urlParams: ServiceConfigInstanceRequestInterface['urlParams'] = {},
    version: ServiceConfigInstanceRequestInterface['version'],
  ) => new UrlPattern(url).stringify({ ...urlParams, version })

  const services = <ArgsType extends ServiceConfigInstanceRequestInterface, Response>(
    args: ArgsType,
    type: Extract<Method, 'PUT' | 'PATCH' | 'GET' | 'POST' | 'DELETE'>,
  ) => {
    const { url, version, data, params, urlParams, contentType = 'application/json', config } = args

    const headers: AxiosRequestConfig['headers'] = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': contentType,
    }

    const configCall = {
      params,
      headers,
      ...config,
    }

    const serviceMethod = {
      GET: () =>
        axiosInstance.get<Response>(urlAndParamsGenerator(url, urlParams, version), configCall),
      POST: () =>
        axiosInstance.post<Response>(
          urlAndParamsGenerator(url, urlParams, version),
          data,
          configCall,
        ),
      PUT: () =>
        axiosInstance.put<Response>(
          urlAndParamsGenerator(url, urlParams, version),
          data,
          configCall,
        ),
      PATCH: () =>
        axiosInstance.patch<Response>(
          urlAndParamsGenerator(url, urlParams, version),
          data,
          configCall,
        ),
      DELETE: () =>
        axiosInstance.delete<Response>(urlAndParamsGenerator(url, urlParams, version), configCall),
    }

    return serviceMethod[type]()
  }

  const Get = <Response>(
    args: Omit<ServiceConfigInstanceRequestInterface, 'data' | 'contentType'>,
  ) => services<typeof args, Response>(args, 'GET')

  const Post = <Response>(args: ServiceConfigInstanceRequestInterface) =>
    services<typeof args, Response>(args, 'POST')

  const Patch = <Response>(args: ServiceConfigInstanceRequestInterface) =>
    services<typeof args, Response>(args, 'PATCH')

  const Put = <Response>(args: ServiceConfigInstanceRequestInterface) =>
    services<typeof args, Response>(args, 'PUT')

  const Delete = <Response>(
    args: Omit<ServiceConfigInstanceRequestInterface, 'data' | 'contentType'>,
  ) => services<typeof args, Response>(args, 'DELETE')

  return {
    axiosInstance,
    Get,
    Post,
    Patch,
    Put,
    Delete,
  }
}
