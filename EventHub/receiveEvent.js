const { EventHubClient, delay } = require("@azure/event-hubs");

// Connection string - primary key of the Event Hubs namespace. 
// For example: Endpoint=sb://myeventhubns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
const connectionString = "Endpoint=sb://bech-use-ers-nurehman-evnethub.servicebus.windows.net/;SharedAccessKeyName=bech-ers-use-nurehman-topic;SharedAccessKey=O/GSAPSLgvJpWyLSzB7p5N4vbBFu0bGBcGdVIsYMH3A=;EntityPath=bech-use-ers-eh";

// Name of the event hub. For example: myeventhub
const eventHubsName = "bech-use-ers-eh";

async function main() {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);
  const allPartitionIds = await client.getPartitionIds();
  const firstPartitionId = allPartitionIds[0];

  const receiveHandler = client.receive(firstPartitionId, eventData => {
    console.log(`Received message: ${eventData.body} from partition ${firstPartitionId}`);
  }, error => {
    console.log('Error when receiving message: ', error)
  });

  // Sleep for a while before stopping the receive operation.
  await delay(15000);
  await receiveHandler.stop();

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});