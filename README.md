mirocard-scanner-mqtt
===============

This repository contains simple Node.js scripts to forward MiroCard beacons to an MQTT broker.

## Dependencies

* [Node.js](https://nodejs.org/en/) 6 +
* [@abandonware/noble](https://github.com/abandonware/noble)
* [@ansgomez/node-beacon-scanner](https://github.com/ansgomez/node-beacon-scanner)
* [MQTT.js](https://github.com/mqttjs/MQTT.js)
* Any MQTT broker/client

To install, run the following commands:

```
$ git clone https://github.com/ansgomez/mirocard-scanner-mqtt.git
$ cd mirocard-scanner-mqtt
$ npm install @abandonware/noble
$ npm install @ansgomez/node-beacon-scanner
$ npm install mqtt --save 
```
---------------------------------------
## Quick Start

The script `mqtt-bridge.js` starts scanning and publishes each parsed packet as
`<MAC>,<temperature>,<humidity>` to the topic `mirocard` on the public broker
`test.mosquitto.org` (edit the script to use your own broker).

```
$ sudo node mqtt-bridge.js
```

The script will output the result as follows:

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

## MiroCard project

The MiroCard is a batteryless, light-powered BLE smart card, designed by Andres Gomez
(Miromico AG) and inspired by the
[Transient BLE Node](https://gitlab.ethz.ch/tec/public/employees/sigristl/transient_ble_node)
project developed at ETH Zurich. It was presented in:

> Andres Gomez. 2020. *Demo Abstract: On-Demand Communication with the Batteryless MiroCard.*
> In The 18th ACM Conference on Embedded Networked Sensor Systems (SenSys '20).
> [doi:10.1145/3384419.3430440](https://doi.org/10.1145/3384419.3430440)

Related repositories:

| Repository | Contents |
| --- | --- |
| [mirocard-hardware](https://github.com/ansgomez/mirocard-hardware) | Hardware: datasheet, schematics and Altium PCB project (MiroCard V2.0) |
| [mirocard-contiki-ng](https://github.com/ansgomez/mirocard-contiki-ng) | Firmware: Contiki-NG fork with the MiroCard platform and example applications |
| [miroreader-app](https://github.com/ansgomez/miroreader-app) | Android app to receive and display MiroCard beacons |
| [mirocard-scanner-python](https://github.com/ansgomez/mirocard-scanner-python) | Python scripts to scan for and decode MiroCard beacons (bluepy) and discover devices (gattlib) |
| **mirocard-scanner-mqtt** (this repository) | Node.js bridge forwarding MiroCard beacons to an MQTT broker |
| [mirocard-scanner-influx](https://github.com/ansgomez/mirocard-scanner-influx) | Node.js bridge storing MiroCard beacons in InfluxDB |
| [mirocard-webid](https://github.com/ansgomez/mirocard-webid) | Web Bluetooth demo page for identification and sensor readout |
| [mirocard-postprocessing](https://github.com/ansgomez/mirocard-postprocessing) | Jupyter notebook to post-process RocketLogger power measurements |
| [mirocard-plotly](https://github.com/ansgomez/mirocard-plotly) | Plotly Dash web app visualizing a RocketLogger measurement |

## License

BSD-3-Clause. Copyright (c) 2021, Andres Gomez. See [LICENSE](LICENSE).
