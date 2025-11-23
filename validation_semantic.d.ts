/* tslint:disable */
/* eslint-disable */
export function configure(api_key: string): void;
export function init_panic_hook(): void;
export function validateInput(text: string, model_selector_int: number, input_type: string): Promise<any>;
export function getSupportedModels(): any;


// Setiap property: enum-name → integer selector
export interface SupportedModelMap {
  GeminiFlash: number;
  GeminiFlashLite: number;
  GeminiFlashLatest: number;
  Gemma: number;
}

// `keyof` otomatis memberi union string literal type:
// "GeminiFlash" | "GeminiFlashLite" | "GeminiFlashLatest" | "Gemma"
export type SupportedModel = keyof SupportedModelMap;

// Extend wasm module types (sesuaikan import path wasm kamu)
declare module "validation_semantic_bg.wasm" {
  export function getSupportedModels(): SupportedModelMap;
}
