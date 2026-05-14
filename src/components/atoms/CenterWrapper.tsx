interface CenterWrapperProps {
  children?: React.ReactNode;
}

const CenterWrapper = ({ children }: CenterWrapperProps) => {
  return <div className="flex min-h-screen w-screen items-center justify-center">{children}</div>;
};

export default CenterWrapper;
