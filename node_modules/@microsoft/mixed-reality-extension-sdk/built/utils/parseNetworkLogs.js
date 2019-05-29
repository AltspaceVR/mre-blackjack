"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const util_1 = require("util");
const readFile = util_1.promisify(fs_1.readFile);
const safeAccessPath_1 = __importDefault(require("./safeAccessPath"));
async function main(filename) {
    const events = await parseFile(filename);
    for (const evt of events.filter(e => !/heartbeat/.test(safeAccessPath_1.default(e, 'networkContents', 'payload', 'type')))) {
        console.log(formatEvent(evt));
    }
}
async function parseFile(filename) {
    const fileContents = await readFile(path_1.resolve(process.cwd(), filename), { encoding: 'utf8' });
    const lines = fileContents.split('\n');
    const events = [];
    for (let i = 0; i < lines.length; i++) {
        if (!/\bnetwork-content\b/.test(lines[i])) {
            continue;
        }
        const e = parseEvent(lines[i - 1], lines[i]);
        if (e !== null) {
            events.push(e);
        }
    }
    return events;
}
function parseEvent(network, contents) {
    const e = {
        input: network + '\n' + contents,
        timestamp: new Date(network.split(' ', 2)[0]),
        client: '',
        networkContents: JSON.parse(contents.slice(contents.indexOf('{')))
    };
    const matches = /\bclient ([0-9a-f]{8})\b/.exec(network);
    if (matches !== null) {
        e.client = matches[1];
    }
    else if (/\bSession/.test(network)) {
        e.client = 'session';
    }
    else {
        return null;
    }
    if (/\brecv\b/.test(network)) {
        e.direction = 'from';
    }
    else if (/\bsend\b/.test(network)) {
        e.direction = 'to';
    }
    return e;
}
const columns = ['session'];
const colWidth = 30;
function formatEvent(event) {
    if (!columns.includes(event.client)) {
        columns.push(event.client);
    }
    const props = {
        time: event.timestamp.toLocaleTimeString('en-US', { hour12: false }),
        messageId: (safeAccessPath_1.default(event, 'networkContents', 'id') || '').slice(0, 6),
        replyToId: (safeAccessPath_1.default(event, 'networkContents', 'replyToId') || '').slice(0, 6),
        payloadType: safeAccessPath_1.default(event, 'networkContents', 'payload', 'type'),
        name: safeAccessPath_1.default(event, 'networkContents', 'payload', 'definition', 'name')
            || safeAccessPath_1.default(event, 'networkContents', 'payload', 'actor', 'name')
            || ''
    };
    if (event.client === 'session') {
        const dir = event.direction === 'to' ? '<=' : '=>';
        return `${props.time} (${props.messageId}) ${props.payloadType} ${props.name}${dir} ${props.replyToId}`;
    }
    else {
        const replyTo = props.replyToId ? `(${props.replyToId}) ` : '';
        const indentation = ' '.repeat(-replyTo.length + colWidth * columns.indexOf(event.client));
        const dir = event.direction === 'from' ? '<=' : '=>';
        return `${props.time} ${indentation}${replyTo}${dir} (${props.messageId}) ${props.payloadType} ${props.name}`;
    }
}
main(process.argv[2] || null).catch(e => console.error(e));
//# sourceMappingURL=parseNetworkLogs.js.map