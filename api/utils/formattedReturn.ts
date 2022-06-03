export const formattedReturn = (
  statusCode: number,
  body: any,
  header: AnyObject = {}
) => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      ...header,
    },
  };
};

type AnyObject = {
  [key: string]: any;
};
