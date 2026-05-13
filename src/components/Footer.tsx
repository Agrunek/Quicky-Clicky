import { APP_VERSION, SOURCE_URL } from '@/constants/constants';

const Footer = () => {
  return (
    <div className="fixed bottom-0 flex h-24 w-full items-end gap-8 px-8 pb-4">
      <p className="flex-1 text-black/50 dark:text-white/50">App Version: {APP_VERSION}</p>
      <div className="flex max-w-150 items-center justify-center gap-6 rounded-2xl border border-black/25 bg-black/25 px-6 py-2 text-white shadow-md backdrop-blur-xs dark:border-white/50 dark:bg-white/25">
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-12">
          <path
            clipRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            fillRule="evenodd"
          />
        </svg>
        <p className="mb-px">
          This app is just a remake of the <span className="font-bold">ReactionTimeExperiment</span> app created by {}
          <span className="font-bold">Scott MacKenzie</span> and <span className="font-bold">Steven Castellucci</span>.
          All credit goes to them <span className="font-bold">&#10003;</span>
        </p>
      </div>
      <p className="flex-1 text-right text-black/50 dark:text-white/50">{SOURCE_URL}</p>
    </div>
  );
};

export default Footer;
