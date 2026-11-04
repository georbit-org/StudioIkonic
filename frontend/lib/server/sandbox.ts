import { SandboxStore } from './types';
import { createInitialSeed } from './seed';

interface SandboxEntry {
  store: SandboxStore;
  lastAccessed: number;
}

// Global in-memory map persisted across Next.js dev reloads
const globalForSandbox = globalThis as unknown as {
  __IKONIC_SANDBOX_REGISTRY__?: Map<string, SandboxEntry>;
};

const registry = globalForSandbox.__IKONIC_SANDBOX_REGISTRY__ || new Map<string, SandboxEntry>();
if (process.env.NODE_ENV !== 'production') {
  globalForSandbox.__IKONIC_SANDBOX_REGISTRY__ = registry;
}

const MAX_SANDBOXES = 300;
const TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

function pruneOldSandboxes() {
  const now = Date.now();
  for (const [id, entry] of registry.entries()) {
    if (now - entry.lastAccessed > TTL_MS) {
      registry.delete(id);
    }
  }

  if (registry.size > MAX_SANDBOXES) {
    // Evict least recently accessed
    const entries = Array.from(registry.entries()).sort(
      (a, b) => a[1].lastAccessed - b[1].lastAccessed
    );
    const toRemove = entries.slice(0, registry.size - MAX_SANDBOXES);
    for (const [id] of toRemove) {
      registry.delete(id);
    }
  }
}

export function getSandbox(sandboxId: string): SandboxStore {
  pruneOldSandboxes();

  let entry = registry.get(sandboxId);
  if (!entry) {
    entry = {
      store: createInitialSeed(),
      lastAccessed: Date.now(),
    };
    registry.set(sandboxId, entry);
  } else {
    entry.lastAccessed = Date.now();
  }

  return entry.store;
}

export function resetSandbox(sandboxId: string): SandboxStore {
  const fresh = createInitialSeed();
  registry.set(sandboxId, {
    store: fresh,
    lastAccessed: Date.now(),
  });
  return fresh;
}

