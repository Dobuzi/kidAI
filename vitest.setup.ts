import "@testing-library/jest-dom/vitest";

type StorageValueMap = Map<string, string>;

function createStorageMock() {
  let storage = new Map<string, string>() as StorageValueMap;

  return {
    get length() {
      return storage.size;
    },
    clear() {
      storage = new Map<string, string>();
    },
    getItem(key: string) {
      return storage.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(storage.keys())[index] ?? null;
    },
    removeItem(key: string) {
      storage.delete(key);
    },
    setItem(key: string, value: string) {
      storage.set(key, String(value));
    }
  } satisfies Storage;
}

const needsStorageMock =
  typeof window !== "undefined" &&
  (typeof window.localStorage === "undefined" || typeof window.localStorage.clear !== "function");

if (needsStorageMock) {
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: createStorageMock()
  });
}
