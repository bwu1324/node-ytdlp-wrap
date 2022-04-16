"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
var follow_redirects_1 = require("follow-redirects");
var child_process_1 = require("child_process");
var fs_1 = __importDefault(require("fs"));
var platform = os_1.default.platform();
console.log("OS Platform: ".concat(platform));
var downloadURL;
if (platform === 'win32') {
    downloadURL = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe';
}
else if (platform === 'darwin') {
    downloadURL = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos';
}
else {
    downloadURL = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp';
}
console.log("Downloading yt-dlp from: ".concat(downloadURL));
var tempPath = path_1.default.join(__dirname, platform === 'win32' ? 'yt-dlp-temp.exe' : 'yt-dlp-temp');
console.log("Saving yt-dlp to: ".concat(tempPath));
var writer = fs_1.default.createWriteStream(tempPath);
follow_redirects_1.https.get(downloadURL, function (response) {
    response.pipe(writer);
    writer.on('close', function () {
        console.log('Finished downloading yt-dlp');
        console.log('Getting version of yt-dlp');
        var getVer = (0, child_process_1.spawn)(tempPath, [
            '--version'
        ]);
        getVer.stdout.on('data', function (data) {
            var version = data.toString().replace('\r', '').replace('\n', '');
            console.log("YT-DLP version: ".concat(version));
            var binaryName = platform === 'win32' ? "yt-dlp-".concat(version, ".exe") : "yt-dlp-".concat(version);
            var ytdlpPath = path_1.default.join(__dirname, binaryName);
            console.log("Saving YT-DLP to: ".concat(ytdlpPath));
            var copy = fs_1.default.createWriteStream(ytdlpPath);
            fs_1.default.createReadStream(tempPath).pipe(copy);
            copy.on('close', function () {
                console.log('Writing metedata');
                fs_1.default.writeFileSync(path_1.default.join(__dirname, 'meta.json'), JSON.stringify({
                    path: ytdlpPath,
                    version: version
                }), 'utf-8');
                console.log('YT-DLP Installed!');
                fs_1.default.unlink(tempPath, function (error) {
                    if (error) {
                        console.log('Error while removing temp files');
                        console.log(error);
                    }
                });
            });
        });
    });
});
