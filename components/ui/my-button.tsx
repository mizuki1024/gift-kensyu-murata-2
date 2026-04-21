import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "px-4 py-2 rounded font-medium transition cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-blue-500 text-white hover:bg-blue-600",
                outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
                ghost: "text-gray-600 hover:bg-gray-100",
            },
        },
        defaultVariants: { variant: "default" },
    }
);

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function MyButton({ variant, className, ...props }: Props) {
    return (
        <button
          className={cn(buttonVariants({ variant }), className)}
          {...props}
        />
    );
}
