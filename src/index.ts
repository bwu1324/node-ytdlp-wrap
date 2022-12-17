import fs from 'fs';
import path from 'path';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { PassThrough } from 'stream';

export class YtdlpDownloader {
	private downloader_: ChildProcessWithoutNullStreams;
	private output_: PassThrough;
	private aborted_ = false;

	get stream() { return this.output_; }

	constructor(url: string, args: Array<string>) {
		args.splice(0, 0, url);
		args.push(...['-o', '-']);
		args.push('--no-part');
		args.push('--no-playlist');
		args.push('--quiet',);
		this.downloader_ = spawn(ytdlp.path, args);

		this.output_ = new PassThrough();
		this.downloader_.stdout.pipe(this.output_);
	}

	Abort() {
		if (this.aborted_) return;
		this.aborted_ = true;
		this.downloader_.stdin.destroy();
		this.downloader_.stdout.destroy();
		this.downloader_.kill('SIGINT');
	}
}

const meta = JSON.parse(fs.readFileSync(path.join(__dirname, 'meta.json'), 'utf-8'));

const ytdlp: {
	path: string,
	version: string,
	downloader: (url: string, args: string[]) => YtdlpDownloader,
	stream: (url: string, args: string[]) => PassThrough
} = {
	path: meta.path,
	version: meta.version,
	downloader: (url, args) => {
		return new YtdlpDownloader(url, args);
	},
	stream: (url, args) => {
		args.splice(0, 0, url);
		args.push(...['-o', '-']);
		args.push('--no-part');
		args.push('--no-playlist');
		args.push('--quiet',);
		const downloader = spawn(ytdlp.path, args);

		const output = new PassThrough();
		downloader.stdout.pipe(output);
		return output;
	}
};

export default ytdlp;
module.exports = ytdlp;