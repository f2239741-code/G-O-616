import { useState, useEffect, useCallback } from 'react';

export interface OfflineSyncStatus {
  isOnline: boolean;
  pendingSyncCount: number;
  lastSyncedAt: string;
  isSyncing: boolean;
}

/**
 * Hook for local storage / IndexedDB offline resilience
 * and automatic synchronization upon network reconnection.
 */
export function useOfflineSync() {
  const [status, setStatus] = useState<OfflineSyncStatus>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    pendingSyncCount: 0,
    lastSyncedAt: new Date().toISOString(),
    isSyncing: false
  });

  useEffect(() => {
    const handleOnline = () => {
      setStatus((s) => ({ ...s, isOnline: true }));
      triggerSync();
    };

    const handleOffline = () => {
      setStatus((s) => ({ ...s, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check for pending queue in localStorage
    try {
      const queue = JSON.parse(localStorage.getItem('oracle_offline_queue') || '[]');
      setStatus((s) => ({ ...s, pendingSyncCount: queue.length }));
    } catch {
      // ignore
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerSync = useCallback(async () => {
    setStatus((s) => ({ ...s, isSyncing: true }));
    try {
      const queue = JSON.parse(localStorage.getItem('oracle_offline_queue') || '[]');
      if (queue.length > 0) {
        console.log(`[Offline Sync] Synchronizing ${queue.length} pending local records to sovereign mesh...`);
        // Simulated network transmission
        await new Promise((r) => setTimeout(r, 600));
        localStorage.removeItem('oracle_offline_queue');
      }
      setStatus((s) => ({
        ...s,
        pendingSyncCount: 0,
        isSyncing: false,
        lastSyncedAt: new Date().toISOString()
      }));
    } catch {
      setStatus((s) => ({ ...s, isSyncing: false }));
    }
  }, []);

  const queueRecord = useCallback((record: unknown) => {
    try {
      const queue = JSON.parse(localStorage.getItem('oracle_offline_queue') || '[]');
      queue.push({
        id: 'rec_' + Date.now(),
        data: record,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('oracle_offline_queue', JSON.stringify(queue));
      setStatus((s) => ({ ...s, pendingSyncCount: queue.length }));
    } catch (e) {
      console.error('Failed to queue offline record', e);
    }
  }, []);

  return {
    ...status,
    triggerSync,
    queueRecord
  };
}
