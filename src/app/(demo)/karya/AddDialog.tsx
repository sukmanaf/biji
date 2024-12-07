"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
import { Textarea } from "@/components/ui/textarea";

interface Record {
  id?: number;
  siswa_id: string;
  tanggal: Date;
  a_agama: string;
  semester: number;
  a_jati_diri: string;
  a_literasi: string;
  path_foto: File; 
}

interface Siswas {
  value: string;
  label: string;
}

interface AddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initialData?: Record;
  isEdit?: boolean;
  siswas: Siswas[];
}

export function AddDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEdit,
  siswas,
}: AddDialogProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Record>({
    defaultValues: initialData });
  
  const [open, setOpen] = useState(false); // Popover open state
  const [fileName, setFileName] = useState(""); // Track file name
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    reset()
    if (initialData) {
      setValue("siswa_id", initialData.siswa_id);
      setValue("tanggal", new Date(initialData.tanggal).toISOString().split('T')[0]); // Set to YYYY-MM-DD format
      setValue("a_agama", initialData.a_agama);
      setValue("semester", initialData.semester || 1);
      setValue("a_jati_diri", initialData.a_jati_diri);
      setValue("a_literasi", initialData.a_literasi);
      setValue("path_foto", initialData.path_foto);
    } else {
      setValue("semester", 1);
    }
  }, [initialData, setValue]);
  
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
    setFileName(file.name); // Set file name
    setValue("path_foto", file); // Set file in form
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  } else {
       setImagePreview(null); // Reset preview if no file is selected
  }
  };

const onSubmit: SubmitHandler<Record> = async (data) => {
    try {
        const formData = new FormData();
        
        // Append all fields to FormData
        for (const key in data) {
            formData.append(key, data[key]);
        }
        
        console.log("Form Data Submitted:", formData); // Log the form data
        
        await onSave(formData); // Pass FormData to onSave
        reset();
        onClose();
    } catch (error) {
        console.error("Failed to save record:", error);
    }
};
 const selectedSemester = watch("semester")?.toString() || "1"; // Default to "1" if undefined
  const selectedSiswa = watch("siswa_id");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dialog-scroll"> {/* Added styles here */}
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Karya Ilmiah" : "Add New Karya Ilmiah"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details of the karya ilmiah."
              : "Fill in the details of the new karya ilmiah."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item">
            <label htmlFor="siswa_id">Siswa</label>
            <FocusScope>
              <Popover open={open} onOpenChange={setOpen} side="bottom" align="start">
                <PopoverTrigger asChild>
                   <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                        onClick={() => setOpen(!open)} // Toggle popover
                      >
                        {selectedSiswa
                          ? siswas.find((siswa) => siswa.value === selectedSiswa)?.label
                          : "Pilih Siswa ..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="w-full">
                    <CommandInput
                      placeholder="Search Siswa..."
                      className="h-9 w-full"
                    />
                    <CommandList className="w-full">
                      <CommandEmpty>No siswa found.</CommandEmpty>
                      <CommandGroup className="w-full">
                        {siswas.map((siswa) => (
                          <CommandItem
                            key={siswa.value}
                            value={siswa.value}
                            onSelect={(currentValue) => {
                              setValue("siswa_id", currentValue);
                              setOpen(false); // Close popover when item selected
                            }}
                            className="w-full"
                          >
                            {siswa.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedSiswa === siswa.value
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

          <div className="form-item">
            <label htmlFor="tanggal">Tanggal</label>
            <Input
              id="tanggal"
              type="date"
              {...register("tanggal", { required: true })}
            />
          </div>


          <div className="form-item">
            <label htmlFor="semester">Semester</label>
            <RadioGroup
              value={selectedSemester}
              onValueChange={(value) => setValue("semester", parseInt(value))}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="semester-1" />
                <label htmlFor="semester-1" className="text-sm font-medium">
                  Semester 1
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="semester-2" />
                <label htmlFor="semester-2" className="text-sm font-medium">
                  Semester 2
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="form-item">
            <label htmlFor="a_agama">Agama</label>
            <Textarea className="h-24" id="a_agama" {...register("a_agama", { required: true })} />
          </div>

          <div className="form-item">
            <label htmlFor="a_jati_diri">Jati Diri</label>
            <Textarea
            className="h-24"
              id="a_jati_diri"
              {...register("a_jati_diri", { required: true })}
            />
          </div>

          <div className="form-item">
            <label htmlFor="a_literasi">Literasi</label>
            <Textarea className="h-24" id="a_literasi" {...register("a_literasi", { required: true })} />
          </div>

          <div className="flex items-center space-x-4"> {/* Flex container */}
            <div className="form-item">
              <label htmlFor="path_foto">Upload Foto</label>
              <Input type="file" accept="image/*" onChange={onFileChange} />
            </div>

            <div className="flex-shrink-0"> {/* Prevent image from shrinking */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-48 h-auto border border-gray-300 rounded" // Set width to 48 for better sizing
                />
              )}
            </div>
          </div>

          <DialogFooter className=" p-3">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
          </DialogFooter>
          
        </form>
      </DialogContent>
    </Dialog>
  );
}
