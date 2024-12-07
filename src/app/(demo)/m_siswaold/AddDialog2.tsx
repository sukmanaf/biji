"use client";

import React, { useEffect, useRef } from "react";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button"; // Adjust imports as necessary
import { Input } from "@/components/ui/input"; // Adjust imports as necessary
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const tahun_ajarans = [
  {
    value: "1",
    label: "2020/2021",
  },
  {
    value: "2",
    label: "2021/2022",
  },
  {
    value: "3",
    label: "2022/2023",
  },
  {
    value: "4",
    label: "2024/2025",
  }
];

interface FormData {
  nama: string;
  kelompok: string;
  tahun_ajaran: string;
}

interface AddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initialData?: FormData; // Add initial data for editing
  isEdit?: boolean; // Indicate if this is an edit action
}

export function AddDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEdit,
}: AddDialogProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    defaultValues: initialData,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialData) {
      setValue("nama", initialData.nama);
      setValue("kelompok", initialData.kelompok);
      setValue("tahun_ajaran", initialData.tahun_ajaran || "");
    }
  }, [initialData, setValue]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // Focus the input when the dialog opens
    }
  }, [isOpen]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await onSave(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to save record:", error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const selectedTA = watch("tahun_ajaran");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Student" : "Add New Student"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details of the student."
              : "Fill in the details of the new student."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="nama">Nama</label>
            <Input
              id="nama"
              {...register("nama", { required: true })}
              ref={inputRef}
            />
          </div>
          <div>
            <label htmlFor="kelompok">Kelompok</label>
            <Input id="kelompok" {...register("kelompok", { required: true })} />
          </div>
          <div>
            <label htmlFor="tahun_ajaran">Tahun Ajaran</label>
            <FocusScope>
              <Popover open={open} onOpenChange={setOpen} side="bottom" align="start">
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {selectedTA
                      ? tahun_ajarans.find(
                          (ta) => ta.value === selectedTA
                        )?.label
                      : "Pilih Tahun Ajaran ..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="w-full">
                    <CommandInput
                      placeholder="Search Tahun Ajaran..."
                      className="h-9 w-full"
                    />
                    <CommandList className="w-full">
                      <CommandEmpty>No ta found.</CommandEmpty>
                      <CommandGroup className="w-full">
                        {tahun_ajarans.map((tahun_ajaran) => (
                          <CommandItem
                            key={tahun_ajaran.value}
                            value={tahun_ajaran.value}
                            onSelect={(currentValue) => {
                              setValue("tahun_ajaran", currentValue);
                              setOpen(false);
                            }}
                            className="w-full"
                          >
                            {tahun_ajaran.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedTA === tahun_ajaran.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FocusScope>
          </div>
          <DialogFooter className="p-3">
            <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
