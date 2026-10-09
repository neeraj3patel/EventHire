'use client';

import { useEffect, useState } from 'react';
import { useWizardStore } from '@/store/wizard.store';

/** True once the persisted wizard state has been restored on the client (avoids SSR mismatch). */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useWizardStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useWizardStore.persist.hasHydrated());
    return unsubscribe;
  }, []);

  return hydrated;
}
