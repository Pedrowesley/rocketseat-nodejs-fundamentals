import { Readable, Transform, Writable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const index = this.index++;

    setTimeout(() => {
      if (index > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(index));
        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, enconded, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

class MultipleByTenStream extends Writable {
  _write(chunk, enconded, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultipleByTenStream());
