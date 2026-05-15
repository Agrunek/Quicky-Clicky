import { useRef } from 'react';
import clsx from 'clsx';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import CrossIcon from '@/components/atoms/icons/CrossIcon';
import KnowledgeIcon from '@/components/atoms/icons/KnowledgeIcon';
import { tw } from '@/utils/string';

interface ExplanationProps {
  children?: React.ReactNode;
  className?: string;
  title: string;
}

const baseClassName = tw`w-100`;

const Explanation = ({ children, className, title }: ExplanationProps) => {
  const style = clsx(baseClassName, className);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  return (
    <>
      <Button onClick={openModal} variant="headless">
        <KnowledgeIcon filled />
      </Button>
      <dialog ref={dialogRef} className="m-auto bg-transparent backdrop:bg-black/50">
        <Card className={style}>
          <div className="mb-4 flex justify-between">
            <Text as="h2" variant="subheading">
              {title}
            </Text>
            <Button onClick={closeModal} variant="headless">
              <CrossIcon />
            </Button>
          </div>
          {children}
        </Card>
      </dialog>
    </>
  );
};

export default Explanation;
