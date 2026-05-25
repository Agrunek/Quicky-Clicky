import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';

import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import CrossIcon from '@/components/atoms/icons/CrossIcon';
import ErrorIcon from '@/components/atoms/icons/ErrorIcon';
import InfoIcon from '@/components/atoms/icons/InfoIcon';
import SuccessIcon from '@/components/atoms/icons/SuccessIcon';
import WarningIcon from '@/components/atoms/icons/WarningIcon';
import { tw } from '@/utils/string';

interface Noti {
  dismissing?: boolean;
  duration?: number;
  id: string;
  message: string;
  variant?: NotiVariant;
}

interface NotiStack {
  dismiss: (id: string) => void;
  dismissAll: () => void;
  enqueue: (message: string, options?: { duration?: number; variant?: NotiVariant }) => string;
}

type NotiVariant = 'error' | 'info' | 'success' | 'warning';

const NotiStackContext = createContext<NotiStack | null>(null);

const baseClassName = tw`max-w-100 min-w-70 overflow-hidden rounded-xl border-2 border-white shadow-md shadow-zinc-200/10`;

const variantConfigs = {
  error: { className: tw`bg-red-600`, Icon: <ErrorIcon className="size-7!" /> },
  info: { className: tw`bg-cyan-600`, Icon: <InfoIcon className="size-7!" /> },
  success: { className: tw`bg-green-700`, Icon: <SuccessIcon className="size-7!" /> },
  warning: { className: tw`bg-yellow-600`, Icon: <WarningIcon className="size-7!" /> },
} satisfies Record<NotiVariant, { className: string; Icon: React.ReactNode }>;

const animateInClassName = tw`animate-noti-in`;
const animateOutClassName = tw`animate-noti-out`;

const Snackbar = ({
  noti: { dismissing, duration = 0, id, message, variant = 'info' },
  onDismiss,
}: {
  noti: Noti;
  onDismiss: (id: string) => void;
}) => {
  const [progress, setProgress] = useState(100);

  const config = variantConfigs[variant];
  const style = clsx(baseClassName, config.className, dismissing ? animateOutClassName : animateInClassName);

  useEffect(() => {
    if (!duration) return;

    const start = performance.now();
    let requestId: number;

    const tick = () => {
      const left = Math.max(0, 100 - ((performance.now() - start) / duration) * 100);
      setProgress(left);
      if (left > 0) requestId = requestAnimationFrame(tick);
    };

    requestId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestId);
  }, [duration]);

  return (
    <div role="alert" className={style}>
      <div className="flex items-center gap-4 px-4 py-2">
        {config.Icon}
        <Text className="flex-1">{message}</Text>
        <Button onClick={() => onDismiss(id)} variant="headless">
          <CrossIcon className="size-7!" />
        </Button>
      </div>
      {duration > 0 && (
        <div className="h-1 bg-white/10">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-white/50 transition-[width] duration-50 ease-linear"
          />
        </div>
      )}
    </div>
  );
};

export const NotiStackProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Noti[]>([]);

  const dismiss: NotiStack['dismiss'] = useCallback((id) => {
    setNotifications((prev) => prev.map((noti) => (noti.id === id ? { ...noti, dismissing: true } : noti)));
    setTimeout(() => setNotifications((prev) => prev.filter((noti) => noti.id !== id)), 420);
  }, []);

  const dismissAll: NotiStack['dismissAll'] = useCallback(() => {
    setNotifications((prev) => prev.map((noti) => ({ ...noti, dismissing: true })));
    setTimeout(() => setNotifications([]), 420);
  }, []);

  const enqueue: NotiStack['enqueue'] = useCallback(
    (message, options = {}) => {
      const id = crypto.randomUUID();
      setNotifications((prev) => [...prev, { dismissing: false, id, message, ...options }]);
      if (options.duration && options.duration > 0) setTimeout(() => dismiss(id), options.duration);
      return id;
    },
    [dismiss],
  );

  return (
    <NotiStackContext value={{ dismiss, dismissAll, enqueue }}>
      {children}
      <div aria-live="polite" className="fixed right-4 bottom-4 z-100 flex flex-col items-end gap-2">
        {notifications.map((noti) => (
          <Snackbar key={noti.id} noti={noti} onDismiss={dismiss} />
        ))}
      </div>
    </NotiStackContext>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useNotiStack = () => {
  const context = useContext(NotiStackContext);
  if (!context) throw new Error('useNotiStack must be used within NotiStackProvider!');
  return context;
};
