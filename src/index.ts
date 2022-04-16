import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { PassThrough } from 'stream';

const meta = JSON.parse(fs.readFileSync(path.join(__dirname, 'meta.json'), 'utf-8'));

const ytdlp: { path: string, version: string, stream: (url: string, args: string[]) => PassThrough } = {
	path: meta.path,
	version: meta.version,
	stream: undefined as any
};
ytdlp.stream = (url, args) => {
	args.splice(0, 0, url);
	args.push('-o -');
	args.push('--no-playlist');
	args.push('--quiet',);
	const downloader = spawn(ytdlp.path, args);

	const output = new PassThrough();
	downloader.stdout.pipe(output);
	return output;
};

export default ytdlp;
module.exports = ytdlp;