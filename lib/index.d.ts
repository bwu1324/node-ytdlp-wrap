/// <reference types="node" />
import { PassThrough } from 'stream';
declare const ytdlp: {
    path: string;
    version: string;
    stream: (url: string, args: string[]) => PassThrough;
};
export default ytdlp;
