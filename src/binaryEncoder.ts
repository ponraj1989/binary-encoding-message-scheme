import { Message } from './message';

export class BinaryMessageEncoder {
    static encode(message: Message): Uint8Array {
        try {
            const headerArray: Uint8Array[] = [];
            message.headers.forEach((value, key) => {
                const keyBuffer = Buffer.from(key, 'ascii');
                const valueBuffer = Buffer.from(value, 'ascii');

                if (keyBuffer.length > 1023 || valueBuffer.length > 1023) {
                    throw new Error("Header key or value too long.");
                }

                const keyLength = new Uint8Array([(keyBuffer.length >> 8) & 0xFF, keyBuffer.length & 0xFF]);
                const valueLength = new Uint8Array([(valueBuffer.length >> 8) & 0xFF, valueBuffer.length & 0xFF]);

                headerArray.push(keyLength, keyBuffer, valueLength, valueBuffer);
            });

            const headersBuffer = Buffer.concat(headerArray);
            const headersCount = new Uint8Array([message.headers.size]); 
            return Buffer.concat([headersCount, headersBuffer, message.payload]);
        } catch (error) {
            console.error('Error during encoding:', error);
            throw error;   
        }
    }

    static decode(data: Uint8Array): Message {
        try {
            let offset = 0;
            const message = new Message();

            const headersCount = data[offset++];
            for (let i = 0; i < headersCount; i++) {
                const keyLength = (data[offset] << 8) | data[offset + 1];
                offset += 2;

                const key = data.slice(offset, offset + keyLength).toString();
                offset += keyLength;

                const valueLength = (data[offset] << 8) | data[offset + 1];
                offset += 2;

                const value = data.slice(offset, offset + valueLength).toString();
                offset += valueLength;

                message.headers.set(key, value);
            }

            message.payload = data.slice(offset);
            return message;
        } catch (error) {
            console.error('Error during decoding:', error);
            throw error;   
        }
    }
}
