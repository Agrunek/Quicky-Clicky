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

const baseClassName = tw`w-full overflow-hidden rounded-3xl border shadow-app-card backdrop-blur-xl`;

const variantConfigs = {
  error: {
    className: tw`border-noti-error-border bg-noti-error-surface`,
    Icon: <ErrorIcon className="size-6! text-noti-error-ink!" />,
    progressClassName: tw`bg-noti-error-ink`,
  },
  info: {
    className: tw`border-noti-info-border bg-noti-info-surface`,
    Icon: <InfoIcon className="size-6! text-noti-info-ink!" />,
    progressClassName: tw`bg-noti-info-ink`,
  },
  success: {
    className: tw`border-noti-success-border bg-noti-success-surface`,
    Icon: <SuccessIcon className="size-6! text-noti-success-ink!" />,
    progressClassName: tw`bg-noti-success-ink`,
  },
  warning: {
    className: tw`border-noti-warning-border bg-noti-warning-surface`,
    Icon: <WarningIcon className="size-6! text-noti-warning-ink!" />,
    progressClassName: tw`bg-noti-warning-ink`,
  },
} satisfies Record<NotiVariant, { className: string; Icon: React.ReactNode; progressClassName: string }>;

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
      <div className="flex items-center gap-3 px-4 py-3">
        {config.Icon}
        <Text className="flex-1">{message}</Text>
        <Button
          onClick={() => onDismiss(id)}
          variant="headless"
          className="shrink-0 rounded-full p-1.5 text-app-icon transition hover:bg-app-hover"
        >
          <CrossIcon className="size-5! text-app-icon!" />
        </Button>
      </div>
      {duration > 0 && (
        <div className="h-1 bg-app-progress-track">
          <div
            style={{ width: `${progress}%` }}
            className={clsx('h-full transition-[width] duration-50 ease-linear', config.progressClassName)}
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
      <div
        aria-live="polite"
        className="fixed right-3 bottom-3 z-100 flex w-[calc(100vw-1.5rem)] max-w-104 flex-col items-end gap-2 sm:right-4 sm:bottom-4"
      >
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
