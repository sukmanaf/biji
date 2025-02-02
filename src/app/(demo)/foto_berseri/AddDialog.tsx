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
  siswa_id: number;
  minggu_ke: number;
  semester: number;
  a_agama: string;
  a_jati_diri: string;
  a_literasi: string;
  path_foto1: File; 
  path_foto2: File; 
  path_foto3: File; 
  keterangan1: string;
  keterangan2: string;
  keterangan3: string;

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
  const [fileName1, setFileName1] = useState(""); // Track file name
  const [fileName2, setFileName2] = useState(""); // Track file name
  const [fileName3, setFileName3] = useState(""); // Track file name
  const [imagePreview1, setImagePreview1] = useState<string | null>(null);
  const [imagePreview2, setImagePreview2] = useState<string | null>(null);
  const [imagePreview3, setImagePreview3] = useState<string | null>(null);

  useEffect(() => {
    reset()
    
      const removeImageByClass = () => {
        const imgElement = document.querySelector(".img1");
        if (imgElement) {
          imgElement.remove();
          console.log("Gambar dengan class 'img1' dihapus");
        }
      };

      // Trigger penghapusan jika imagePreview1 dihapus
      if (!imagePreview1) {
        removeImageByClass();
      }
    
    if (initialData) {
      setValue("siswa_id", initialData.siswa_id);
      setValue("a_agama", initialData.a_agama);
      setValue("minggu_ke", initialData.minggu_ke || 1);
      setValue("semester", initialData.semester || 1);
      setValue("a_jati_diri", initialData.a_jati_diri);
      setValue("a_literasi", initialData.a_literasi);
      setValue("path_foto1", initialData.path_foto1);
      setValue("path_foto2", initialData.path_foto2);
      setValue("path_foto3", initialData.path_foto3);
      setValue("keterangan1", initialData.keterangan1);
      setValue("keterangan2", initialData.keterangan2);
      setValue("keterangan3", initialData.keterangan3);
      
      if (initialData.path_foto1 instanceof File) {
        setImagePreview1(URL.createObjectURL(initialData.path_foto1));
      } else if (typeof initialData.path_foto1 === "string") {
        setImagePreview1(initialData.path_foto1);
      }

      if (initialData.path_foto2 instanceof File) {
        setImagePreview2(URL.createObjectURL(initialData.path_foto2));
      } else if (typeof initialData.path_foto2 === "string") {
        setImagePreview2(initialData.path_foto2);
      }

      if (initialData.path_foto3 instanceof File) {
        setImagePreview3(URL.createObjectURL(initialData.path_foto3));
      } else if (typeof initialData.path_foto3 === "string") {
        setImagePreview3(initialData.path_foto3);
      }
      
      
    }else{
      
     
    }
  }, [initialData, setValue]);
  
  const onFileChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName1(file.name); // Set file name
      setValue("path_foto1", file); // Set file in form
      const previewUrl = URL.createObjectURL(file);
      setImagePreview1(previewUrl);
    } else {
        setImagePreview1(null); // Reset preview if no file is selected
    }
  };
  const onFileChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName2(file.name); // Set file name
      setValue("path_foto2", file); // Set file in form
      const previewUrl = URL.createObjectURL(file);
      setImagePreview2(previewUrl);
    } else {
      setImagePreview2(null); // Reset preview if no file is selected
    }
  };
  const onFileChange3 = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName3(file.name); // Set file name
      setValue("path_foto3", file); // Set file in form
      const previewUrl = URL.createObjectURL(file);
      setImagePreview3(previewUrl);
    } else {
      setImagePreview3(null); // Reset preview if no file is selected
    }
  };

const onSubmit: SubmitHandler<Record> = async (data) => {
    try {
        const formData = new FormData();
        
        // Append all fields to FormData
        for (const key in data) {
            formData.append(key, data[key]);
        }
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
    <Dialog open={isOpen} onOpenChange={() => {
          setImagePreview1(null);
          setImagePreview2(null);
          setImagePreview3(null);
          onClose(); 
        }}>
      <DialogContent className="dialog-scroll max-w-5xl"> {/* Added styles here */}
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Foto Berseri" : "Add New Foto Berseri"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details of the Foto Berseri."
              : "Fill in the details of the new Foto Berseri."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="form-item">
                <label htmlFor="minggu_ke">Minggu Ke</label>
                <Input type="number" id="minggu_ke" {...register("minggu_ke", { required: true,valueAsNumber: true, min: 1 })} />
              </div>
            </div>
            <div>
              
              <div className="form-item">
                <label htmlFor="a_literasi">Literasi</label>
                <Textarea className="h-24" id="a_literasi" {...register("a_literasi", { required: true })} />
              </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
              <div className="form-item c-agama mb-0">
                <label htmlFor="a_agama">Agama</label>
                <Textarea className="h-24" id="a_agama" {...register("a_agama", { required: true })} />
              </div>
          </div>
          <div>
              <div className="form-item">
                <label htmlFor="a_jati_diri">Jati Diri</label>
                <Textarea
                className="h-24"
                  id="a_jati_diri"
                  {...register("a_jati_diri", { required: true })}
                />
              </div>
          </div>
          <div>

          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <fieldset>
              <legend>Foto 1</legend>
                <div className="form-item">
                  <label htmlFor="path_foto1">Upload Foto</label>
                  <Input type="file" accept="image/*" onChange={onFileChange1} />
                </div>

              <div className="form-item">
                <label htmlFor="keterangan1">Keterangan</label>
                <Input id="keterangan1" {...register("keterangan1", { required: true })} />
              </div>
              <div>
                  {imagePreview1 && (
                    <img
                      src={imagePreview1}
                      alt="Preview"
                      className="mt-2 w-48 h-auto border border-gray-300 rounded img1" // Set width to 48 for better sizing
                    />
                  )}
              </div>
            </fieldset>
          </div>
          <div>
            <fieldset>
              <legend>Foto 2</legend>
                <div className="form-item">
                  <label htmlFor="path_foto2">Upload Foto</label>
                  <Input type="file" accept="image/*" onChange={onFileChange2} />
                </div>

              <div className="form-item">
                <label htmlFor="keterangan2">Keterangan</label>
                <Input id="keterangan2" {...register("keterangan2", { required: true })} />
              </div>
              <div>
                  {imagePreview2 && (
                    <img
                      src={imagePreview2}
                      alt="Preview"
                      className="mt-2 w-48 h-auto border border-gray-300 rounded img2" // Set width to 48 for better sizing
                    />
                  )}
              </div>
            </fieldset>
          </div>
          <div>
            <fieldset>
              <legend>Foto 3</legend>
                <div className="form-item">
                  <label htmlFor="path_foto3">Upload Foto</label>
                  <Input type="file" accept="image/*" onChange={onFileChange3} />
                </div>

              <div className="form-item">
                <label htmlFor="keterangan3">Keterangan</label>
                <Input id="keterangan3" {...register("keterangan3", { required: true })} />
              </div>
              <div>
                  {imagePreview3 && (
                    <img
                      src={imagePreview3}
                      alt="Preview"
                      className="mt-2 w-48 h-auto border border-gray-300 rounded img3" // Set width to 48 for better sizing
                    />
                  )}
              </div>
            </fieldset>
          </div>
        </div>            
            
          <DialogFooter className=" p-3">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={() => {
                setImagePreview1(null);
                setImagePreview2(null);
                setImagePreview3(null);
                onClose(); 
              }}>
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
