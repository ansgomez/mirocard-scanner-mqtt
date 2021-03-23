mirocard-scanner-mqtt
===============

This repository contains simple Node.js scripts to forward MiroCard beacons to an MQTT broker.

## Dependencies

* [Node.js](https://nodejs.org/en/) 6 +
* [@abandonware/noble](https://github.com/abandonware/noble)
* [@ansgomez/node-beacon-scanner](https://github.com/ansgomez/node-beacon-scanner)
* Any MQTT broker/client

To install, run the following commands:

```
$ git clone https://github.com/ansgomez/mirocard-scanner-mqtt.git
$ cd mirocard-scanner-mqtt
$ npm install @abandonware/noble
$ npm install @ansgomez/node-beacon-scanner
```
---------------------------------------
## Quick Start

Create a new file inside the `mirocard-scanner` folder and paste the following code.
This sample code shows how to start scanning and how to get parsed packets.

```
$ sudo node mqtt-bridge.js
```

The sample code above will output the result as follows:

```
Started to scan.
MAC: 60:77:71:57:17:83
Temperature: 24.03
Humidity: 22.50
Sent to MQTT broker!
...
```

Use a second client to subscribe to your topic:

```
$ mosquitto_sub -h test.mosquitto.org -t "mirocard" -v
```

Once your MiroCard is sending beacons, you will receive the following MQTT messages:

```
mirocard 60:77:71:57:17:83,24.03,22.50
mirocard 60:77:71:57:16:61,23.91,23.80
```