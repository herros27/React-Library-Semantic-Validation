import { jsx as _jsx } from "react/jsx-runtime";
// src/WasmContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import * as wasm from "../validation_semantic";
const WasmContext = createContext({
  wasmReady: false,
  wasmModule: null,
  error: null,
});
export const WasmProvider = ({ children }) => {
  const [wasmReady, setWasmReady] = useState(false);
  const [wasmModule, setWasmModule] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function initWasm() {
      try {
        wasm.init_panic_hook();
        console.log("✅ WASM initialized globally");
        setWasmModule(wasm);
        setWasmReady(true);
      } catch (err) {
        console.error("❌ Failed to initialize WASM:", err);
        setError("Gagal memuat modul Wasm.");
      }
    }
    initWasm();
  }, []);
  return _jsx(WasmContext.Provider, {
    value: { wasmReady, wasmModule, error },
    children: children,
  });
};
// Custom hook supaya gampang dipakai
export const useWasm = () => useContext(WasmContext);
