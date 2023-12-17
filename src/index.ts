import {DEFAULT_MAGIC} from "./type";
import {ArrayBufferReader, DecodeError, ReadableStreamReader} from "./reader";

export * from './type';
export * from './reader';
export * from './writer';

export async function loads(data: ArrayBuffer, allowedMagic: number | Array<number> = DEFAULT_MAGIC): Promise<any> {
    const reader = await ArrayBufferReader(data, allowedMagic);
    if (reader.count !== 1) throw new DecodeError("File contains more than one global object");
    return await reader.read();
}
export async function* loadsIter(data: ArrayBuffer, allowedMagic: number | Array<number> = DEFAULT_MAGIC): AsyncGenerator<any> {
    const reader = await ArrayBufferReader(data, allowedMagic);

    for (let i = 0; i < reader.count; i++) {
        yield await reader.read();
    }
}

export async function loadsAll(data: ArrayBuffer, allowedMagic: number | Array<number> = DEFAULT_MAGIC): Promise<Array<any>> {
    const arr=[];
    for await(const i of loadsIter(data, allowedMagic)) arr.push(i);
    return arr;
}

export async function load(fp: ReadableStream<Uint8Array>, allowedMagic: number | Array<number> = DEFAULT_MAGIC): Promise<any> {
    const reader = await ReadableStreamReader(fp, allowedMagic);
    if (reader.count !== 1) throw new DecodeError("File contains more than one global object");
    return await reader.read();
}
export async function* loadIter(fp: ReadableStream<Uint8Array>, allowedMagic: number | Array<number> = DEFAULT_MAGIC): AsyncGenerator<any> {
    const reader = await ReadableStreamReader(fp, allowedMagic);

    for (let i = 0; i < reader.count; i++) {
        yield await reader.read();
    }
}

export async function loadAll(fp: ReadableStream<Uint8Array>, allowedMagic: number | Array<number> = DEFAULT_MAGIC): Promise<Array<any>> {
    const arr=[];
    for await(const i of loadIter(fp, allowedMagic)) arr.push(i);
    return arr;
}
