/// <reference types="node" />
import { PassThrough } from 'stream';
declare class Downloader {
    private downloader_;
    private output_;
    get stream(): PassThrough;
    constructor(url: string, args: Array<string>);
    Abort(): void;
}
declare const ytdlp: {
    path: string;
    version: string;
    downloader: (url: string, args: string[]) => Downloader;
    stream: (url: string, args: string[]) => PassThrough;
};
export default ytdlp;
