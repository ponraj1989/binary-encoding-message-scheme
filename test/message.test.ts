import { Messages } from '../src/message';
import { BinaryMessageEncoder } from '../src/binaryEncoder';

describe('Binary Encoder', () => {
    it('should encode and then decode to the original message', () => {
        const headers = new Map<string, string>();
        headers.set("Content-Type", "application/json");
        headers.set("apikey", "12345");
        const payload = Buffer.from("sinch test", 'utf-8');
        const message = new Messages(headers, payload);

        const encodedData = BinaryMessageEncoder.encode(message);
        const decodedMessage = BinaryMessageEncoder.decode(encodedData);

        expect(decodedMessage.headers).toEqual(headers);
        expect(decodedMessage.payload.toString()).toBe(payload.toString());
    });
});
