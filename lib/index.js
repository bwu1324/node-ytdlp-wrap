"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YtdlpDownloader = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var stream_1 = require("stream");
var YtdlpDownloader = /** @class */ (function () {
    function YtdlpDownloader(url, args) {
        this.aborted_ = false;
        args.splice(0, 0, url);
        args.push.apply(args, ['-o', '-']);
        args.push('--no-part');
        args.push('--no-playlist');
        args.push('--quiet');
        this.downloader_ = (0, child_process_1.spawn)(ytdlp.path, args);
        this.output_ = new stream_1.PassThrough();
        this.downloader_.stdout.pipe(this.output_);
    }
    Object.defineProperty(YtdlpDownloader.prototype, "stream", {
        get: function () { return this.output_; },
        enumerable: false,
        configurable: true
    });
    YtdlpDownloader.prototype.Abort = function () {
        if (this.aborted_)
            return;
        this.aborted_ = true;
        this.downloader_.stdin.destroy();
        this.downloader_.stdout.destroy();
        this.downloader_.kill('SIGINT');
    };
    return YtdlpDownloader;
}());
exports.YtdlpDownloader = YtdlpDownloader;
var meta = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'meta.json'), 'utf-8'));
var ytdlp = {
    path: meta.path,
    version: meta.version,
    downloader: function (url, args) {
        return new YtdlpDownloader(url, args);
    },
    stream: function (url, args) {
        args.splice(0, 0, url);
        args.push.apply(args, ['-o', '-']);
        args.push('--no-part');
        args.push('--no-playlist');
        args.push('--quiet');
        var downloader = (0, child_process_1.spawn)(ytdlp.path, args);
        var output = new stream_1.PassThrough();
        downloader.stdout.pipe(output);
        return output;
    }
};
exports.default = ytdlp;
module.exports = ytdlp;
