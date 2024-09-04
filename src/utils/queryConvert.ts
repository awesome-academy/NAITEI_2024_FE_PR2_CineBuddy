type QueryParams = {
    [key: string]: string | number | undefined;
  };
  
  export const convertParamsToQueryString = (params: QueryParams): string => {
    const queryString = Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number)}`)
      .join('&');
  
    return queryString;
  };
