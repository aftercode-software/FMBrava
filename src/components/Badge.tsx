type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ className, children }: Props) {
  return (
    <div
      className={`bg-white text-negro-800 px-2 py-1 w-fit rounded-full uppercase font-inter font-bold text-sm ${className}`}
    >
      {children}
    </div>
  );
}
