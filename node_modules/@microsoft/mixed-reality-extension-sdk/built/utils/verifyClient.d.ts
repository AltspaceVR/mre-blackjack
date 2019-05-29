/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 * 'ws' middleware to validate the client protocol version when processing a connection upgrade request.
 * @param info 'ws' request information
 * @param cb 'ws' verification callback
 */
export default function verifyClient(info: any, cb: (verified: boolean, code?: number, message?: string) => any): any;
//# sourceMappingURL=verifyClient.d.ts.map