import {DEFAULT_MAGIC, Type} from './type';


export class DecodeError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}


export class EOFError extends DecodeError {
    constructor() {
        super("End of file");
    }
}


export type Feeder = () => Promise<{done: boolean, value?: Uint8Array | undefined}>


export class Reader {
    #count: number = 0;
    #flags: number = 0;
    #allowedMagic: Array<number>;
    #chunk: Uint8Array | undefined = undefined;
    #offset: number = 0;
    private readonly feeder: Feeder;

    constructor(feeder: Feeder, allowedMagic: number | Array<number> = DEFAULT_MAGIC) {
        if (typeof allowedMagic === "number")
            allowedMagic = [allowedMagic];
        this.#allowedMagic = allowedMagic;
        this.feeder = feeder;
    }

    async readHeader() {
        const data = await this.#read(8);

        if (data.getUint16(0) !== 0x6D62)
            throw new DecodeError("Invalid magic bytes");

        if (!this.#allowedMagic.includes(data.getUint16(2)))
            throw new DecodeError("Invalid application magic bytes");

        if (data.getUint8(4) !== 0)
            throw new DecodeError("Unsupported version");


        this.#flags = data.getUint8(5);
        this.#count = data.getUint16(6);
    }

    get count() {
        return this.#count;
    }

    get flags() {
        return this.#flags;
    }

    async #read(n: number | bigint): Promise<DataView> {
        if (typeof n != "number")
            throw new DecodeError("64-bit offsets not supported");

        while (this.#chunk === undefined || this.#offset + n > this.#chunk.byteLength) {
            const { done, value } = await this.feeder();
            if (done)
                throw new EOFError();

            if (value === undefined)
                continue;

            if (this.#chunk === undefined) {
                this.#chunk = value;
                this.#offset = 0;
                continue;
            }

            const l = this.#chunk.byteLength - this.#offset;
            const chunk = new Uint8Array(l + value.byteLength);
            chunk.set(this.#chunk.slice(this.#offset));
            chunk.set(value, l);
            this.#chunk = chunk;
            this.#offset = 0;
        }

        const offset = this.#offset;
        this.#offset += n;
        return new DataView(this.#chunk.buffer, this.#chunk.byteOffset + offset, n);
    }

    async #readObjectHeader(globl: boolean): Promise<{type: number, value: number | bigint}> {
        if (globl) {
            if (!this.#count)
                throw new EOFError();
            this.#count--;
        }

        let t = (await this.#read(1)).getUint8(0);
        let tag = t >> 5;
        t &= 0b11111;

        let i = 0;
        while (i != 5 && t & (1 << (4 - i))) {
            i++;
        }

        t &= (1 << (5 - i)) - 1;
        if (i == 5) i = 8;

        let data = await this.#read(i);

        if (i == 8) {
            return {
                type: tag,
                value: (BigInt(t) << BigInt(i * 8)) | data.getBigUint64(0)
            }
        }

        t <<= i * 8;

        switch (i) {
            case 0: break;
            case 1: t |= data.getUint8(0); break;
            case 2: t |= data.getUint16(0); break;
            case 3: t |= (data.getUint8(0) << 16) | data.getUint16(1); break;
            case 4: t |= data.getUint32(0); break;
        }

        if (tag === Type.SPECIAL) {
            tag = (1 << 4) | t;
            t = 0;
        }

        return {
            type: tag,
            value: t
        };
    }

    async read(_globl = true): Promise<any> {
        const {type, value} = await this.#readObjectHeader(_globl);
        switch (type) {
            case Type.NONE: return null;
            case Type.FALSE: return false;
            case Type.TRUE: return true;

            case Type.FLOAT16:
                return (await this.#read(2)).getFloat32(0);
            case Type.FLOAT32:
                return (await this.#read(4)).getFloat32(0);
            case Type.FLOAT64:
                return (await this.#read(8)).getFloat64(0);

            case Type.RATIONAL:
                throw new Error("Not implemented!");

            case Type.INT: return value;
            case Type.NINT: return -value;

            case Type.STRING: {
                const data = await this.#read(value);
                const decoder = new TextDecoder("utf-8");
                return decoder.decode(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
            }
            case Type.BYTES: {
                const data = await this.#read(value);
                return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
            }

            case Type.LIST: {
                const res = [];
                for (let i = 0; i < value; i++) {
                    res.push(await this.read(false));
                }
                return res;
            }
            case Type.MAP: {
                const res = Object.create(null);
                for (let i = 0; i < value; i++) {
                    const k = await this.read(false);
                    res[k] = await this.read(false);
                }
                return res;
            }

            default:
                throw new Error("Internal error! Please, report a bug.");
        }
    }
}


export async function ArrayBufferReader(data: ArrayBuffer,
                                        allowedMagic: number | Array<number> = DEFAULT_MAGIC): Promise<Reader> {
    let done = false;
    const reader = new Reader(async () => {
        if (done) return { done, value: undefined };
        done = true;
        return { done: false, value: new Uint8Array(data) };
    }, allowedMagic);
    await reader.readHeader();
    return reader;
}


export async function ReadableStreamReader(fp: ReadableStream<Uint8Array>,
                                           allowedMagic: number | Array<number> = DEFAULT_MAGIC): Promise<Reader> {
    const streamReader = fp.getReader();
    const reader = new Reader(() => streamReader.read(), allowedMagic);
    await reader.readHeader();
    return reader;
}
