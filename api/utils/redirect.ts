export const redirect = (path: string) => {
  return {
    statusCode: 302,
    headers: {
      location: path,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
