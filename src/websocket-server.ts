import { WebSocketServer } from 'ws';

const PORT_WS = 8080;
const wss = new WebSocketServer({ port: PORT_WS });

console.log(`WebSocket server is running on ws://localhost:${PORT_WS}`);

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
        try {
            const messageStr = message.toString();
            console.log(`Message string: ${messageStr}`);
            const sensorData = JSON.parse(messageStr);

            console.log('Sensor data:', sensorData);

            const validatedData = {
                temperature: sensorData.temperature || 0,
                humidity: sensorData.humidity || 0,
                distance: sensorData.distance || 0,
            };

            console.log('Sending data:', validatedData);

            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(validatedData));
                console.log('Data sent to client:', validatedData);
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

export { wss };
