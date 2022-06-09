export const formattedReturn = (
  statusCode: number,
  body: any,
  header: AnyObject = {}
): FormattedReturn => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      ...header,
    } as DefaultHeaders & AnyObject,
  };
};

type AnyObject = {
  [key: string]: any;
};

type DefaultHeaders = {
  'Access-Control-Allow-Origin': '*';
  'Access-Control-Allow-Credentials': true;
};

export type FormattedReturn = {
  statusCode: number;
  body: string;
  headers: DefaultHeaders & AnyObject;
};
