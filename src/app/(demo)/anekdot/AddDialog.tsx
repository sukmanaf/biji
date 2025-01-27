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
import { record } from "zod";

interface ViewData {
  id?: number;
  siswa_id: number;
  tanggal: Date;
  a_agama: string;
  semester: number;
  a_jati_diri: string;
  a_literasi: string;
  path_foto: string;
  kelompok : string;
  nama : string;
  ta : string;
  tempat : string;
  umpan_balik : string;
  keterangan : string;
  tahun : number;
}

interface Siswas {
  value: string;
  label: string;
}
interface Bulan {
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
  bulan: Bulan[];
}

interface FormData {
  id?:number;
  siswa_id      :Number;
  semester      :Number;
  id_bulan      :Number;
  tahun         :Number;
  tempat        :String;
  tanggal       :String;
  keterangan    :String;
  a_agama       :String;
  a_jati_diri   :String;
  a_literasi    :String;
  umpan_balik   :String;
}



export function AddDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEdit,
  siswas,
  bulan,
}: AddDialogProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Record>({
    defaultValues: initialData });
  
  const [open, setOpen] = useState(false); // Popover open state
  const [fileName, setFileName] = useState(""); // Track file name
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    reset()
    
    
    reset(); // Clear form on every load to ensure data isn't duplicated
    if (initialData) {
      const localDate = new Date(initialData.tanggal);
      const formattedDate = `${localDate.getFullYear()}-${(localDate.getMonth() + 1).toString().padStart(2, '0')}-${localDate.getDate().toString().padStart(2, '0')}`;
      setValue("siswa_id", initialData.siswa_id);
      setValue("tanggal", formattedDate); // Format date
      setValue("a_agama", initialData.a_agama);
      setValue("semester", initialData.semester || 1);
      setValue("a_jati_diri", initialData.a_jati_diri);
      setValue("a_literasi", initialData.a_literasi);
      setValue("tempat", initialData.tempat);
      setValue("keterangan", initialData.keterangan);
      setValue("umpan_balik", initialData.umpan_balik);
    } else {
      setValue("semester", 1);
    }
  }, [initialData, setValue]);
  
  

const onSubmit: SubmitHandler<Record> = async (data) => {
    try {
        const formData = new FormData();
        
        // Append all fields to FormData
        for (const key in data) {
            formData.append(key, data[key]);
        }
        
        console.log("Form Data Submitted anekdot:", formData); // Log the form data
        
        await onSave(formData); // Pass FormData to onSave
        reset();
        onClose();
    } catch (error) {
        console.error("Failed to save record:", error);
    }
};
 const selectedSemester = watch("semester")?.toString() || "1"; // Default to "1" if undefined
  const selectedSiswa = parseInt(watch("siswa_id")?.toString(), 10) || undefined;

  return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="dialog-scroll max-w-5xl">
      <DialogHeader>
        <DialogTitle>{isEdit ? "Edit Catatan Anekdot" : "Add New Catatan Anekdot"}</DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update the details of the Catatan Anekdot."
            : "Fill in the details of the new Catatan Anekdot."}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Grid layout for two columns */}
        <div className="grid grid-cols-2 gap-4">

          {/* Left Column */}
          <div>
            <div className="form-item">
              <label htmlFor="siswa_id">Siswa</label>
              <FocusScope>
                <Popover open={open} onOpenChange={setOpen} side="bottom" align="start">
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                      onClick={() => setOpen(!open)}
                    >
                      {selectedSiswa
                        ? siswas.find((siswa) => parseInt(siswa.value) === selectedSiswa)?.label
                        : "Pilih Siswa ..."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="w-full">
                      <CommandInput placeholder="Search Siswa..." className="h-9 w-full" />
                      <CommandList className="w-full">
                        <CommandEmpty>No siswa found.</CommandEmpty>
                        <CommandGroup className="w-full">
                          {siswas.map((siswa) => (
                            <CommandItem
                              key={siswa.value}
                              value={siswa.value}
                              onSelect={(currentValue) => {
                                setValue("siswa_id", currentValue);
                                setOpen(false);
                              }}
                              className="w-full"
                            >
                              {siswa.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedSiswa === parseInt(siswa.value) ? "opacity-100" : "opacity-0"
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

            <fieldset>
              <legend>Kegiatan Siswa</legend>
              <div className="form-item">
                <label htmlFor="tanggal">Tanggal</label>
                <Input
                  id="tanggal"
                  type="date"
                  {...register("tanggal", { required: true })}
                />
              </div>
              <div className="form-item">
                <label htmlFor="tempat">Tempat</label>
                <Input id="tempat" {...register("tempat", { required: true })} />
              </div>
              <div className="form-item">
                <label htmlFor="keterangan">Kegiatan Siswa</label>
                <Textarea className="h-24" id="keterangan" {...register("keterangan", { required: true })} />
              </div>
            </fieldset>
          </div>

          {/* Right Column */}
          <div>
            <fieldset>
              <legend>Analisis Catatan</legend>
              <div className="form-item">
                <label htmlFor="a_agama">Agama</label>
                <Textarea className="h-24" id="a_agama" {...register("a_agama", { required: true })} />
              </div>

              <div className="form-item">
                <label htmlFor="a_jati_diri">Jati Diri</label>
                <Textarea className="h-24" id="a_jati_diri" {...register("a_jati_diri", { required: true })} />
              </div>

              <div className="form-item">
                <label htmlFor="a_literasi">Literasi</label>
                <Textarea className="h-24" id="a_literasi" {...register("a_literasi", { required: true })} />
              </div>
              <div className="form-item">
                <label htmlFor="umpan_balik">Umpan Balik</label>
                <Textarea className="h-24" id="umpan_balik" {...register("umpan_balik", { required: true })} />
              </div>
            </fieldset>
          </div>
        </div>
        <DialogFooter className="p-3">
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
