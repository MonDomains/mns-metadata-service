import { Express } from 'express';

import { metadata } from './controller/metadata';
import { image } from './controller/image';
import { preview } from './controller/preview';
import { card } from './controller/card';

export default function (app: Express) {
 
  app.get('/', (_req, res) => {
    res.send('Well done mate To see more go to "/docs"!');
  });

  app.get('/:networkName/:contractAddress(0x[a-fA-F0-9]{40})/:tokenId', metadata);

  app.get('/:networkName/:contractAddress(0x[a-fA-F0-9]{40})/:tokenId/image', image);

  app.get('/preview/:name', preview);

  app.get('/card/:name', card);
}