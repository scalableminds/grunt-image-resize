/// <reference types="node" />

import { GravityDirection, FilterType } from "gm";

declare namespace imageResize {
    type SamplingFactor = [number, number]

    interface Options {
        width?: number,
        height?: number,
        upscale?: boolean,
        crop?: boolean,
        gravity?: GravityDirection,
        quality?: number,
        format?: string,
        filter?: FilterType,
        sharpen?: boolean | string,
        samplingFactor?: SamplingFactor,
        noProfile?: boolean,
        interlace?: boolean,
        imageMagick?: boolean,
        background?: string,
        flatten?: boolean,
        percentage?: number,
        cover?: boolean
    }
}

declare function imageResize(options?: imageResize.Options): NodeJS.ReadWriteStream;

export = imageResize;