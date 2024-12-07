"use client";

import React, { useEffect } from "react";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
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

interface FormData {
  nama: string;
  kelompok: string;
  guru: string;
  tahun_ajaran: string;
}

interface AddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initialData?: FormData; 
  isEdit?: boolean; 
  tahun_ajarans: { value: string; label: string }[];
}

export function AddDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEdit,
  tahun_ajarans,
}: AddDialogProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    defaultValues: initialData || { nama: "", kelompok: "", tahun_ajaran: "" },
  });

  useEffect(() => {
    if (initialData) {
      setValue("nama", initialData.nama);
      setValue("kelompok", initialData.kelompok);
      setValue("guru", initialData.guru);
      setValue("tahun_ajaran", String(initialData.tahun_ajaran));
      
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Form Data Submitted:", data); // Log the form data
      await onSave(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to save record:", error);
    }
  };

  const selectedTA = watch("tahun_ajaran");
  const [open, setOpen] = React.useState(false);

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
            <Input id="nama" {...register("nama", { required: true })} />
          </div>
          <div>
            <label htmlFor="kelompok">Kelompok</label>
            <Input id="kelompok" {...register("kelompok", { required: true })} />
          </div>
          <div>
            <label htmlFor="guru">Guru</label>
            <Input id="guru" {...register("guru", { required: true })} />
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
                      ? tahun_ajarans.find((ta) => ta.value === selectedTA)?.label
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
                      <CommandEmpty>No TA found.</CommandEmpty>
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
