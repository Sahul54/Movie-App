const amqp = require('amqplib');
const Movie = require('../models/Movie');

const QUEUE = 'movieQueue';
let channel;

// ✅ CloudAMQP URL from environment variables
const RABBITMQ_URL = process.env.CLOUDAMQP_URL || 'amqps://maonvmfq:sHhbWh42m5rmPPWoc6Byfq5BObzIIpRw@puffin.rmq2.cloudamqp.com/maonvmfq';

// RabbitMQ connection setup
const initQueue = async () => {
  try {
    console.log(`Connecting to RabbitMQ at ${RABBITMQ_URL}...`);
    
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    
    await channel.assertQueue(QUEUE, { durable: true });
    console.log(`Queue '${QUEUE}' initialized successfully`);

    // ✅ Queue initialize hone ke baad processing start karein
    processQueue();
  } catch (err) {
    console.error('Queue initialization error:', err);
  }
};

// Function to add movie data to the queue
const addToQueue = async (movieData) => {
  if (!channel) {
    console.error('Error: Queue not initialized');
    throw new Error('Queue not initialized');
  }
  console.log(`Adding movie to queue: ${JSON.stringify(movieData)}`);
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(movieData)), { persistent: true });
};

// Function to process messages from the queue
const processQueue = async () => {
  if (!channel) {
    console.error('Error: Queue not initialized, retrying in 5 seconds...');
    setTimeout(processQueue, 5000);
    return;
  }

  console.log('Processing messages from queue...');
  channel.consume(QUEUE, async (msg) => {
    if (msg !== null) {
      const movieData = JSON.parse(msg.content.toString());
      try {
        const movie = new Movie(movieData);
        await movie.save();
        console.log(`Movie saved: ${movie.title}`);
        channel.ack(msg);
      } catch (err) {
        console.error('Error processing message:', err);
      }
    }
  });
};

// Initialize Queue
initQueue();

module.exports = { addToQueue };
