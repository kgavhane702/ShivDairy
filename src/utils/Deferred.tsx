import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

type LoaderResult<T> = { default: React.ComponentType<T> };

export default function Deferred<T extends object>({
  loader,
  placeholder = null,
  delay = 120,
  props,
}: {
  loader: () => Promise<LoaderResult<T>>;
  placeholder?: React.ReactNode;
  delay?: number;
  props?: T;
}) {
  const [Comp, setComp] = useState<React.ComponentType<T> | null>(null);

  useEffect(() => {
    let mounted = true;
    const handle = requestAnimationFrame(() => {
      const t = setTimeout(() => {
        loader().then((m) => {
          if (!mounted) return;
          setComp(() => m.default);
        });
      }, delay);

      return () => clearTimeout(t);
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(handle);
    };
  }, [loader, delay]);

  if (Comp) return React.createElement(Comp, props as T);
  return <View>{placeholder}</View>;
}
