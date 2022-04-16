"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var stream_1 = require("stream");
var meta = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'meta.json'), 'utf-8'));
var ytdlp = {
    path: meta.path,
    version: meta.version,
    stream: undefined
};
ytdlp.stream = function (url, args) {
    args.splice(0, 0, url);
    args.push('-o -');
    args.push('--no-playlist');
    args.push('--quiet');
    var downloader = (0, child_process_1.spawn)(ytdlp.path, args);
    var output = new stream_1.PassThrough();
    downloader.stdout.pipe(output);
    return output;
};
exports.default = ytdlp;
module.exports = ytdlp;
