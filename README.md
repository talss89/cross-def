# `cross-def`

A utility to generate cross-language definitions from a JSON manifest. Built for [CANtastic](https://github.com/talss89/CANtastic), but useful elsewhere too.

This was built to solve the problem of maintaining values for symbols between embedded web apps and firmware. Define symbols once, and `cross-def` will maintain your language definitions for you.

Simply pass in a JSON 'manifest', to define your symbols and how you'd like them represented for each language. Then specify output formats, and `cross-def` will generate your definition sources.

Currently, two output formats are supported:

- `c` (`typedef enum`, `static const char*` label map)
- `json` (object:value map, object map with labels)

## Install and get started

With NPM:

`npm i -g cross-def`

Then on your command line: `cross-def build manifest.json -o c:my_header.h json:my_json.json`

## What is this, and why?

Sometimes, when we build an embedded system, we design an application to go alongside it. Whether that be a mobile app, CLI, or web app. More often than not, these complimentary apps are written in a different language to the firmware, and so symbols that are shared between them need to be defined in multiple places.

An example of this could be a smart switch. Suppose the the firmware for the switch has three outputs, identified by `0xA`, `0xB`, `0xC`. We want our mobile application to understand these switch IDs too, so when making a HTTP request to toggle a switch, the mobile app knows that Switch 1 is `0xA`, and can pass that value to the device firmware.

With `cross-def`, we can define a manifest listing all the switches, and their IDs, and generate both a C header file (containing a `typedef enum` for each switch), and a JSON file (containing integers for each switch). The app and firmware now reference the same symbol values.

Adding / readdressing / removing switches (or symbols) can be done easily, and when both apps are built, they remain in sync.

This is particularly useful when writing embedded web-apps that run on tiny devices, like the ESP32.

In addition to symbols, `cross-def` can define labels - human readable strings - corresponding to symbols.

## Manifest format

An example manifest is available in `./examples/manifest.json`. Run `cross-def build manifest.json -o c:my_header.h json:my_json.json` and have a look at the resulting C (`my_header.h`) and JSON output.

