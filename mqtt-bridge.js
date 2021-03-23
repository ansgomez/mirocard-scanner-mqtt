const BeaconScanner = require('@ansgomez/node-beacon-scanner');
const scanner = new BeaconScanner();

var mqtt = require('mqtt');
var client = mqtt.connect("mqtt://test.mosquitto.org", { clientId: "mirocard_client" });

client.on("connect", function () {
    console.log("connected");
});
client.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1)
});

// Set an Event handler for becons
scanner.onadvertisement = (ad) => {
    // Print full payload
    // console.log(JSON.stringify(ad, null, '  '));
    // console.log(ad.mirocard.ad.manufacturerData);

    // Print MiroCard Sensor Data
    console.log("MAC: " + ad.address);
    console.log("Temperature: " + ad.mirocard.temp);
    console.log("Humidity: " + ad.mirocard.rh);

    if (client.connected == true) {
        client.publish("mirocard", ad.address+","+ad.mirocard.temp+","+ad.mirocard.rh)
        console.log("Sent to MQTT broker!")
    }

    console.log();
};

// Start scanning
scanner.startScan().then(() => {
    console.log('Started to scan.');
}).catch((error) => {
    console.error(error);
});