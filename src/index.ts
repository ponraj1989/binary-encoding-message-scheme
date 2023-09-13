import express from 'express';
import { Message } from './message';
import { BinaryMessageEncoder } from './binaryEncoder';
import { validateAccessToken } from './middlewares/validateAccessToken';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/encode', validateAccessToken, (req, res) => {
  try {
    const message = new Message();
    message.headers = new Map(Object.entries(req.headers));
    message.payload = Buffer.from(req.body.payload, 'ascii');
    const encoded = BinaryMessageEncoder.encode(message); 
    res.send({
      encoded: encoded 
    })
  } catch (error) {
    res.status(400).send({ error: 'Failed to encode message' });
  }
});

app.post('/decode', validateAccessToken, (req, res) => {
  try {
    const messageBuffer = Buffer.from(req.body, 'binary');
    const decoded = BinaryMessageEncoder.decode(messageBuffer);
    res.send({
      headers: Object.fromEntries(decoded.headers),
      payload: decoded.payload.toString()
    });
  } catch (error) {
    res.status(400).send({ error: 'Failed to decode message' });
  }
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
