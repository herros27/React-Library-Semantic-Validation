import React from "react";
import * as wasm from "../validation_semantic";
interface WasmContextType {
    wasmReady: boolean;
    wasmModule: typeof wasm | null;
    error: string | null;
}
export declare const WasmProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useWasm: () => WasmContextType;
export {};
