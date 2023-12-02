import { NextRequest } from 'next/server';

export const enhanceHeaders = (request: NextRequest) => {
  const headers = request.headers;
  headers.append('x-url', request.nextUrl.toString());
  return request;
};
