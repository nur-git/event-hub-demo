const { EventHubClient } = require("@azure/event-hubs");

// Connection string - primary key of the Event Hubs namespace. 
// For example: Endpoint=sb://myeventhubns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// const connectionString = "Endpoint=sb://<bech-ers-use-nurehman-topic>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<SHARED ACCESS KEY>";
// const connectionString = "Endpoint=sb://bech-use-ers-nurehman-evnethub.servicebus.windows.net/;SharedAccessKeyName=bech-ers-use-nurehman-topic;SharedAccessKey=O/GSAPSLgvJpWyLSzB7p5N4vbBFu0bGBcGdVIsYMH3A=;EntityPath=bech-use-ers-eh"
const connectionString = "Endpoint=sb://bech-use-ers-nurehman-evnethub.servicebus.windows.net/;SharedAccessKeyName=bech-ers-use-nurehman-topic;SharedAccessKey=O/GSAPSLgvJpWyLSzB7p5N4vbBFu0bGBcGdVIsYMH3A=;EntityPath=bech-use-ers-eh"
// Name of the event hub. For example: myeventhub
const eventHubsName = "bech-use-ers-eh";

async function main() {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);

  for (let i = 0; i < 100; i++) {
    const eventData = {body: `Event ${i}`};
    console.log(`Sending message: ${eventData.body}`);
    await client.send(eventData);
  }

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});