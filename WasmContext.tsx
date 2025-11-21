// src/WasmContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as wasm from "./validation_semantic";

interface WasmContextType {
  wasmReady: boolean;
  wasmModule: typeof wasm | null;
  error: string | null;
}

const WasmContext = createContext<WasmContextType>({
  wasmReady: false,
  wasmModule: null,
  error: null,
});

export const WasmProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wasmReady, setWasmReady] = useState(false);
  const [wasmModule, setWasmModule] = useState<typeof wasm | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <WasmContext.Provider value={{ wasmReady, wasmModule, error }}>
      {children}
    </WasmContext.Provider>
  );
};

// Custom hook supaya gampang dipakai
export const useWasm = () => useContext(WasmContext);
