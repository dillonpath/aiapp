import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandResponsiveDialog, CommandInput, CommandItem, CommandList } from "./ui/command";

interface Props {
    options: Array<{
        id: string;
        value: string;
        children: ReactNode;
    }>;
    onSelect: (value: string) => void;
    onSearch?: (value: string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
};

export const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an option",
    className,
}: Props) => {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find((option) => option.id === value);

    const handleOpenChange = (open: boolean) => {
        onSearch?.("");
        setOpen(open);
    };

    return (
        <>
            <Button type="button" variant="outline" onClick={() => setOpen(true)}
            className={cn("h-9 font-normal px-2 justify-between", !selectedOption && "text-muted-foreground", className)} 
            >
                <div>
                    {selectedOption?.children ?? placeholder}
                </div>
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            <CommandResponsiveDialog open={open} onOpenChange={handleOpenChange} shouldFilter={!onSearch}>
                <CommandInput placeholder="Search..." onValueChange={onSearch} />
                <CommandList>
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No options found.
                        </span>
                    </CommandEmpty>
                    {options.map((option) => (
                        <CommandItem key={option.id} onSelect={() => {
                            onSelect(option.value) 
                            setOpen(false);
                            }}>
                            {option.children}
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandResponsiveDialog>
        </>
    )
}