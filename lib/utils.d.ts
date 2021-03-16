import { Selection } from "d3-selection";
import { Schema, Node, Target, Position, Source, Blocks, GetInputs, GetOutputs, ReadonlyCanvasRef } from "./interfaces.js";
export declare const blockWidth = 156;
export declare const blockHeaderHeight = 24;
export declare const portRadius = 12;
export declare const portMargin = 12;
export declare const portHeight: number;
export declare const SVG_STYLE: string;
export declare function makeClipPath(inputCount: number, [width, height]: [number, number]): string;
export declare const getKey: ({ id }: {
    id: string;
}) => string;
export declare const toTranslate: (x: number, y: number) => string;
export declare const getSourceIndex: <S extends Schema>(ref: ReadonlyCanvasRef<S>, source: Source<S, keyof S>) => number;
export declare const getTargetIndex: <S extends Schema>(ref: ReadonlyCanvasRef<S>, target: Target<S, keyof S>) => number;
export declare function getSourcePosition<S extends Schema>(ref: ReadonlyCanvasRef<S>, source: Source<S, keyof S>): [number, number];
export declare function getTargetPosition<S extends Schema>(ref: ReadonlyCanvasRef<S>, target: Target<S, keyof S>): [number, number];
export declare const getPortOffsetY: (index: number) => number;
export declare function forInputs<S extends Schema, K extends keyof S>(blocks: Blocks<S>, kind: keyof S): Generator<[number, GetInputs<S, K>]>;
export declare function forOutputs<S extends Schema, K extends keyof S>(blocks: Blocks<S>, kind: keyof S): Generator<[number, GetOutputs<S, K>]>;
export declare const snap: <S extends Schema>(ref: ReadonlyCanvasRef<S>, [x, y]: [number, number]) => Position;
export declare const defaultCanvasUnit = 52;
export declare const defaultCanvasHeight = 12;
export declare type AttachPorts<S extends Schema> = (ports: Selection<SVGGElement, Node<S, keyof S>, SVGGElement | null, unknown>) => void;
