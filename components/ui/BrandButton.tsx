import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Brand-Button gemäß Figma „Set Up" – kompakte CTA-/Link-Buttons.
 * - solid: gefüllt in der Akzentfarbe (color-Prop)
 * - outline: weiß mit Rahmen
 * - borderless: reiner Text-/Link-Button
 */
const brandButton = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[4px] border font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-navy/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "text-white",
        outline:
          "border-black bg-white text-black hover:bg-black hover:text-white",
        borderless:
          "border-transparent bg-transparent text-black underline-offset-4 hover:underline",
      },
      color: {
        goldbrown: "",
        green: "",
        blue: "",
        rosa: "",
        black: "",
      },
      size: {
        sm: "px-[17px] py-[9px] text-sm [&_svg]:size-4",
        md: "px-[25px] py-[13px] text-base [&_svg]:size-4",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "goldbrown",
        className: "border-goldbrown bg-goldbrown hover:bg-goldbrown/90",
      },
      {
        variant: "solid",
        color: "green",
        className: "border-green bg-green hover:bg-green/90",
      },
      {
        variant: "solid",
        color: "blue",
        className: "border-blue bg-blue hover:bg-blue/90",
      },
      {
        variant: "solid",
        color: "rosa",
        className: "border-rosa bg-rosa hover:bg-rosa/90",
      },
      {
        variant: "solid",
        color: "black",
        className: "border-black bg-black hover:bg-black/85",
      },
    ],
    defaultVariants: { variant: "solid", color: "goldbrown", size: "sm" },
  }
);

type BrandButtonProps = {
  href?: string;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof brandButton> &
  Omit<React.ComponentProps<"button">, "color">;

export const BrandButton = ({
  href,
  variant,
  color,
  size,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className,
  children,
  ...props
}: BrandButtonProps) => {
  const classes = cn(brandButton({ variant, color, size }), className);
  const content = (
    <>
      {IconLeft && <IconLeft aria-hidden />}
      {children}
      {IconRight && <IconRight aria-hidden />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} tabIndex={props.tabIndex}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};
