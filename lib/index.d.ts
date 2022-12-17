/// <reference types="node" />
import { PassThrough } from 'stream';
export declare class YtdlpDownloader {
    private downloader_;
    private output_;
    private aborted_;
    get stream(): PassThrough;
    constructor(url: string, args: Array<string>);
    Abort(): void;
}
declare const ytdlp: {
    path: string;
    version: string;
    downloader: (url: string, args: string[]) => YtdlpDownloader;
    stream: (url: string, args: string[]) => PassThrough;
};
export default ytdlp;
