---
# 🤖 `validation_semantic` Library with Gemini API

![GitHub last commit](https://img.shields.io/github/last-commit/herros27/validation_semantic)
![GitHub stars](https://img.shields.io/github/stars/herros27/validation_semantic?style=social)
![TestPyPI](https://img.shields.io/badge/TestPyPI-validation--semantic-blue?logo=pypi)
![Rust Build Status](https://github.com/herros27/validation_semantic/actions/workflows/release.yml/badge.svg)

---

---
## 🧠 Overview

`validation_semantic` is a fast, secure, and intelligent **semantic validation library** — built entirely in **Rust** and powered by **Gemini models from Google AI Studio**.

This library not only checks data validity **syntactically** (e.g., email or phone number formats), but also performs **semantic analysis** to understand the _meaning and context_ of user input.
With **Gemini API integration**, the validation process becomes more **contextual, accurate, and adaptive** across multiple data types and languages.

Unlike conventional validators, `validation_semantic` focuses on **understanding meaning and intent**, not just pattern matching.
For instance, it can distinguish whether an input is a company name, an institution, a description, or narrative text — providing much more precise and meaningful validation.

---

---
##  🧠 **Research Notice:**  
> This library was developed as part of an academic research project.  
> Developers are encouraged to try it out and share feedback about its performance and usability.  
> For more details, see the [Research Participation & Feedback](#-research-participation--feedback-request) section below.
---

## 🌍 Multiplatform Support

The library is designed with modular architecture and can be integrated across multiple environments through **bindings**:

| Platform                           | Description                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------- |
| 🧩 **WebAssembly (WASM)**          | High-performance browser integration via frameworks like React or Vue.      |
| 🐍 **Python (via PyO3 / Maturin)** | Ideal for backend validation services or data preprocessing pipelines.      |
| 🔧 **(Coming Soon)**               | Additional bindings like Kotlin and Node Native support are in development. |

Combining **Rust’s performance** with **Gemini’s intelligence**, this library provides a validation system that is **contextual, efficient, and simple to integrate** into any stack.

---

## 🌟 Key Features

- ⚡ **Core Logic in Rust:** Fast, memory-safe, and efficient validation engine.
- 🧠 **Semantic Validation:** Understands meaning, not just format.
- 🧩 **Rule-Based Configuration:** Define and extend semantic validation rules.
- 🧾 **Detailed Reports:** Provides informative and structured validation outputs.
- 🌐 **Cross-Platform Ready:** Works seamlessly across browsers, servers, and data pipelines.
- 🤝 **Gemini-Powered Intelligence:** Uses Gemini AI models from Google AI Studio for contextual validation.

---

## ⚛️ Using the Library in React (Vite)

This library supports integration in **React (Vite)** projects via **WebAssembly (WASM)**.
Below are the setup and usage steps.

---

### 🧩 Step 1: Install the Library and Required Plugins

```bash
# Install the main library
npm install validation_semantic

# Install required Vite plugins for WASM
npm install vite-plugin-wasm vite-plugin-top-level-await
```

> These plugins ensure that `.wasm` files can be loaded correctly and enable top-level `await` in modules.

---

### ⚙️ Step 2: Configure Vite

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    react(),
    wasm(), // Enable WebAssembly support
    topLevelAwait(), // Allow top-level "await"
    tailwindcss(),
  ],
});
```

**Make sure the entire app is wrapped by WasmProvider in your main.tsx or app.tsx**

```ts
import { WasmProvider } from "validation_semantic";

export default function App() {
  return (
    // Makesure
    <WasmProvider>
      <Router>{/* All Your tag */}</Router>
    </WasmProvider>
  );
}
```

---

### 🚀 Step 3: Use the WASM Module in React

```tsx
import { useWasm } from "validation_semantic";

export default function Example() {
  const { wasmReady, wasmModule, error } = useWasm();

  async function runValidation() {
    if (!wasmReady || !wasmModule) {
      console.warn("WASM not ready");
      return;
    }

    const models = wasmModule.getSupportedModelSelectors();
    const model = models["GEMINI_FLASH"]; //GEMINI_FLASH_LITE, GEMINI_FLASH_LATEST, GEMMA

    const result = await wasmModule.validateInput(
      "PT Sinar Mentari",
      model,
      "company name",
      your_gemini_api_key
    );

    console.log(result);
  }

  if (error) console.error(error);
  else runValidation();
}
```

---

### 📋 Example Output (Console)

```json
{
  "valid": true,
  "message": "Input 'PT Sinar Mentari' is a valid and common company name in Indonesia."
}
```

---

## 🧠 Batch Validation (Multiple Inputs)

You can perform **batch validation** (multiple inputs simultaneously) using the same `validateInput()` function.
Each validation runs **asynchronously and in parallel** for efficiency.

```tsx
import React, { useState } from "react";
import { useWasm } from "validation_semantic";

type InputType =
  | "email"
  | "institution name"
  | "company name"
  | "product name"
  | "location name"
  | "full name"
  | "title"
  | "occupation"
  | "tag"
  | "address"
  | "text area";

export default function BatchValidationExample() {
  const { wasmReady, wasmModule, error: wasmError } = useWasm();
  const modelToUseKey = "GEMINI_FLASH"; //GEMINI_FLASH_LITE, GEMINI_FLASH_LATEST, GEMMA

  const [formData, setFormData] = useState<Record<InputType, string>>({
    email: "",
    "full name": "",
    address: "",
    "product name": "",
    "institution name": "",
    "company name": "",
    "location name": "",
    title: "",
    occupation: "",
    tag: "",
    "text area": "",
  });

  const [results, setResults] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  // Handler perubahan input
  const handleChange = (key: InputType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  async function validateBatchInputs() {
    if (!wasmReady || !wasmModule) {
      alert("WASM module is not ready.");
      return;
    }

    const supportedModels = wasmModule.getSupportedModelSelectors();
    const modelSelectorInt = supportedModels[modelToUseKey];

    if (typeof modelSelectorInt === "undefined") {
      alert(`Model ${modelToUseKey} not found.`);
      return;
    }

    setLoading(true);
    try {
      const validationPromises = Object.entries(formData)
        .filter(([_, value]) => value.trim() !== "") // hanya input yang diisi
        .map(async ([inputType, inputValue]) => {
          try {
            const result = await wasmModule.validateInput(
              inputValue,
              modelSelectorInt,
              inputType as InputType
            );
            return { inputType, inputValue, result, error: null };
          } catch (err: any) {
            return {
              inputType,
              inputValue,
              result: null,
              error: err?.message ?? "Validation error occurred.",
            };
          }
        });

      const results = await Promise.all(validationPromises);
      const batchResults = Object.fromEntries(
        results.map((r) => [
          r.inputType,
          { input: r.inputValue, result: r.result, error: r.error },
        ])
      );

      setResults(batchResults);
      console.log("Batch Validation Results:", batchResults);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='max-w-xl mx-auto p-4 space-y-6'>
      <h1 className='text-xl font-bold text-center'>Batch Validation Form</h1>

      {/* Form Input */}
      <div className='space-y-4'>
        {Object.keys(formData).map((key) => (
          <div key={key} className='flex flex-col'>
            <label className='font-semibold capitalize'>{key}</label>
            <input
              type='text'
              className='border border-gray-300 rounded-md p-2'
              value={formData[key as InputType]}
              onChange={(e) => handleChange(key as InputType, e.target.value)}
              placeholder={`Masukkan ${key}`}
            />
          </div>
        ))}
      </div>

      {/* Tombol Validasi */}
      <button
        onClick={validateBatchInputs}
        disabled={loading || !wasmReady}
        className='bg-blue-600 text-white px-4 py-2 rounded-md w-full disabled:opacity-50'>
        {loading ? "Validating..." : "Validate All Inputs"}
      </button>

      {/* Hasil */}
      {results && (
        <div className='mt-6 bg-gray-100 p-4 rounded-md'>
          <h2 className='font-semibold mb-2'>Validation Results:</h2>
          <pre className='text-sm bg-white p-2 rounded-md overflow-x-auto'>
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}

      {wasmError && (
        <p className='text-red-500 text-sm text-center mt-4'>
          Error loading WASM: {wasmError}
        </p>
      )}
    </div>
  );
}
```
---

### 📋 Example Output (Console)

```json
{
  "email": {
    "input": "john@example.com",
    "result": {
      "valid": false,
      "message": "The domain 'example.com' is a reserved test domain and not valid for real-world use."
    },
    "error": null
  },
  "full name": {
    "input": "John Doe",
    "result": {
      "valid": true,
      "message": "Valid name."
    },
    "error": null
  },
  "address": {
    "input": "Jl. Mawar No. 123",
    "result": {
      "valid": true,
      "message": "Valid address."
    },
    "error": null
  }
}
```

---

## 🧩 Supported Input Types

| Input Type         | Aliases                                                          |
| ------------------ | ---------------------------------------------------------------- |
| `email`            | `alamat email`                                                   |
| `institution name` | `nama institusi`, `nama lembaga`, `institusi`, `lembaga`         |
| `company name`     | `nama perusahaan`                                                |
| `product name`     | `nama produk`                                                    |
| `location name`    | `nama lokasi`, `lokasi`, `tempat`                                |
| `full name`        | `nama lengkap`, `nama`                                           |
| `title`            | `judul`                                                          |
| `occupation`       | `pekerjaan`                                                      |
| `tag`              | `tag`                                                            |
| `address`          | `alamat`                                                         |
| `text area`        | `teks area`, `konten`, `deskripsi`, `blog`, `cerita`, `komentar` |

---

## 📘 Function Summary

| Function                                                | Description                                        |
| ------------------------------------------------------- | -------------------------------------------------- |
| `useWasm()`                                             | React Hook to load and initialize the WASM module. |
| `wasmModule.getSupportedModelSelectors()`               | Retrieves the list of supported Gemini models.     |
| `validateInput(text, model, type, your_gemini_api_key)` | Runs semantic validation on the given text.        |

---

## 📊 Research Participation & Feedback Request

This library, **`validation_semantic`**, was developed as part of an **academic research project** focused on evaluating the performance and usability of semantic validation systems powered by AI.

If you are a **developer** using this library, your feedback is highly valuable to the research.  
Please try using the library with various types of inputs such as **names**, **addresses**, **titles**, **descriptions**, or **text areas**, and share your experience.

You may include:
- Your thoughts on the **ease of use** and **developer experience**
- The **performance** or **accuracy** of the validation
- Any **issues or improvements** you would suggest
- (Optional) **Proof or example** of how you integrated this library in your project

Your contribution will directly support the evaluation and improvement of this research project.

📩 You can contact me directly at: **[khairusnyah8935@gmail.com](mailto:khairusnyah8935@gmail.com)**  

Thank you very much for taking the time to participate and contribute to this study. 🙏


## 🪶 License

This project is distributed under the **MIT License**.
Feel free to use, modify, and distribute it with attribution.

---
