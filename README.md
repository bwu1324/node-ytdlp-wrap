# node-yt-dlp
A basic yt-dlp wrapper written in Typescript for Node projects. 

Installs the correct binary of yt-dlp for the current platform. Supports Linux, Windows, and MacOS/X.

# Installation
Install with [npm](https://www.npmjs.com/):
```
$ npm --save i node-ytdlp-wrap
```

# Usage Example

## Stream

### Typescript
Downloads a video from youtube and saves it as 'example.mp4'
```
import ytdlp from 'node-ytdlp-wrap';
import fs from 'fs';

const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const stream = ytdlp.stream(link, ['-f', 'bestvideo']);
stream.pipe(fs.createWriteStream('example.mp4'));
```
### ES6
Downloads a video from youtube and saves it as 'example.mp4'
```
const ytdlp = require('node-ytdlp-wrap');
const fs = require('fs');

const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const stream = ytdlp.stream(link, ['-f', 'bestvideo']);
stream.pipe(fs.createWriteStream('example.mp4'));
```

## Downloader
### Typescript

Downloads a video from youtube and saves it as 'example.mp4' but aborts partway
```
import ytdlp from 'node-ytdlp-wrap';
import fs from 'fs';


const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const downloader = ytdlp.downloader(link, ['-f', 'bestvideo']);
downloader.stream.pipe(fs.createWriteStream('example.mp4'));

// Abort the download after 2 seconds
setTimeout(() => {
  downloader.Abort();
}, 2000);
```
### ES6

Downloads a video from youtube and saves it as 'example.mp4' but aborts partway
```
const ytdlp = require('node-ytdlp-wrap');
const fs = require('fs');

const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const downloader = ytdlp.downloader(link, ['-f', 'bestvideo']);
downloader.stream.pipe(fs.createWriteStream('example.mp4'));

// Abort the download after 2 seconds
setTimeout(() => {
  downloader.Abort();
}, 2000);
```
# Documentation

## ytdlp Methods
### ytdlp.downloader(link, [optional args]) 
Spawns YT-DLP to download the given link using the args given and returns [YtdlpDownloader](#YtdlpDownloader-Methods).
For a list of avaliable arguments, see [YT-DLP Options](https://github.com/yt-dlp/yt-dlp/blob/master/README.md#usage-and-options)


### ytdlp.stream(link, [optional args])
Spawns YT-DLP to download the given link using the args given and returns passthrough stream.
For a list of avaliable arguments, see [YT-DLP Options](https://github.com/yt-dlp/yt-dlp/blob/master/README.md#usage-and-options)

## ytdlp Properties

### ytdlp.path
Path of YT-DLP binary

### ytdlp.version
Version of YT-DLP used

## YtdlpDownloader Methods

### YtdlpDownloader.Abort()
Aborts download and ends output stream (only aborts once, repeat calls do nothing)

## YtdlpDownloader Properties
### YtdlpDownloader.stream
Passthrough stream of video download
