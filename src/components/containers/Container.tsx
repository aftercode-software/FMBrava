import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = React.ComponentProps<"div">;

const cn = (...inputs: unknown[]) => {
  return twMerge(clsx(inputs));
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...rest
}: ContainerProps) => {
  return (
    <div className={cn("max-w-[90vw] mx-auto", className)} {...rest}>
      {children}
    </div>
  );
};

export default Container;
