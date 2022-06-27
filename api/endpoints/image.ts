/* Does not work on the edge */

/* eslint-disable no-unexpected-multiline */
import { Handler } from '@netlify/functions';
import { Response } from '@netlify/functions/dist/function/response';
import { Event } from '@netlify/functions/dist/function/event';
import { formattedReturn } from '../utils';
import fetch from 'cross-fetch';
import sharp from 'sharp';

export const handler: Handler | MockedHandler = async (
  req: Event
): Promise<Response> => {
  const { url, w } = req.queryStringParameters as { url: string; w: string };
  const webp = req.headers.accept?.includes('webp');
  try {
    if (!url || !w) throw 'Missing url or w parameter';
    const response = await fetch(url);
    if (!response.ok) throw 'Error fetching image';
    const image = await response.blob();
    const buffer = Buffer.from(await image.arrayBuffer());
    const result = await sharp(buffer)
      .resize(parseInt(w, 10))
      [webp ? 'webp' : 'jpeg']()
      .toBuffer();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/webp',
      },
      body: result.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return formattedReturn(418, { error });
  }
};

type HandlerRequest = {
  body: string;
};

type MockedHandler = (req: HandlerRequest) => Promise<{
  statusCode: number;
  body: string;
}>;
