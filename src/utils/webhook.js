import axios from "axios";

const WEBHOOK_URL = process.env.WEBHOOK_URL;

export const sendWebhook = async (data, retries = 3) => {
  try {
    await axios.post(WEBHOOK_URL, data);
    console.log("Webhook sent");
  } catch (err) {
    if (retries > 0) {
      console.log("Retrying webhook...");
      setTimeout(
        () => {
          sendWebhook(data, retries - 1);
        },
        1000 * (4 - retries),
      ); // exponential
    } else {
      console.log("Webhook failed");
    }
  }
};
