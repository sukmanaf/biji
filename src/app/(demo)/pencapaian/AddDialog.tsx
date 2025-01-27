"use client";

import React, { useEffect, useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface FormData {
  id?:number;
  siswa_id: number;
  id_bulan: number;
  tahun: number;
  semester: string;
  ceklis_pencapaian_detail: { tujuan: string; konteks: string; kejadian: string; muncul: number }[];
}

interface AddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initialData?: FormData; 
  isEdit?: boolean; 
  tahuns: { value: string; label: string }[];
  bulans: { value: string; label: string }[];
  siswas: { value: string; label: string }[];
}

export function AddDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEdit,
  tahuns,
  bulans,
  siswas,
}: AddDialogProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    defaultValues: initialData || { siswa_id: null ,semester: 1, tahun: null, id_bulan: null, ceklis_pencapaian_detail: [{ tujuan: "", konteks: "", kejadian: "", muncul: 1 }] },
  });

  const [open, setOpen] = React.useState(false);
  const [openBulan, setOpenBulan] = React.useState(false);
  const [openSiswa, setOpenSiswa] = React.useState(false);
  const [details, setDetails] = useState<FormData["ceklis_pencapaian_detail"]>(initialData?.ceklis_pencapaian_detail || [{ tujuan: "", konteks: "", kejadian: "", muncul: 1 }]);

  useEffect(() => {
    if (initialData) {
      setValue("siswa_id", initialData.siswa_id);
      setValue("semester", initialData.semester || "1");
      setValue("tahun", initialData.tahun);
      setValue("id_bulan", initialData.id_bulan); // Pastikan key yang digunakan benar (id_bulan vs bulan)
      
      // Menangani array ceklis_pencapaian_detail
      if (initialData.ceklis_pencapaian_detail) {
        // Menggunakan setValue untuk mengisi ceklis_pencapaian_detail
        setValue("ceklis_pencapaian_detail", initialData.ceklis_pencapaian_detail);
        setDetails(initialData.ceklis_pencapaian_detail);
      }
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Form Data Submitted:", data);
      await onSave(data);
      reset();
      setDetails([{ tujuan: "", konteks: "", kejadian: "", muncul: 1 }]);
      onClose();
    } catch (error) {
      console.error("Failed to save record:", error);
    }
  };

  const selectedSiswa = watch("siswa_id");
  const selectedTahun = watch("tahun");
  const selectedBulan = watch("id_bulan");
  const selectedSemester = watch("semester")?.toString() || "1"; // Default to "1" if undefined

  const handleAddDetail = () => {
    setDetails([...details, { tujuan: "", konteks: "", kejadian: "", muncul: 1 }]);
  };

  const handleRemoveDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dialog-scroll max-w-5xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Student" : "Add New Student"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the details of the student." : "Fill in the details of the new student."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="siswa">Siswa</label>
              <FocusScope>
                <Popover open={openSiswa} onOpenChange={setOpenSiswa} side="bottom" align="start">
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openSiswa}
                      className="w-full justify-between"
                    >
                      {selectedSiswa
                        ? siswas.find((siswa) => parseInt(siswa.value) === selectedSiswa)?.label
                        : "Pilih Siswa ..."}
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
                        <CommandEmpty>No Month found.</CommandEmpty>
                        <CommandGroup className="w-full">
                          {siswas.map((siswa) => (
                            <CommandItem
                              key={siswa.value}
                              value={siswa.value}
                              onSelect={(currentValue) => {
                                setValue("siswa_id", parseInt(currentValue));
                                setOpenSiswa(false);
                              }}
                              className="w-full"
                            >
                              {siswa.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedSiswa === parseInt(siswa.value)
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
            <div>
              <label htmlFor="id_bulan">Bulan</label>
              <FocusScope>
                <Popover open={openBulan} onOpenChange={setOpenBulan} side="bottom" align="start">
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openBulan}
                      className="w-full justify-between"
                    >
                      {selectedBulan
                        ? bulans.find((bulan) => parseInt(bulan.value) === selectedBulan)?.label
                        : "Pilih Bulan ..."}
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
                        <CommandEmpty>No Month found.</CommandEmpty>
                        <CommandGroup className="w-full">
                          {bulans.map((bulan) => (
                            <CommandItem
                              key={bulan.value}
                              value={bulan.value}
                              onSelect={(currentValue) => {
                                setValue("id_bulan", parseInt(currentValue));
                                setOpenBulan(false);
                              }}
                              className="w-full"
                            >
                              {bulan.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedBulan === parseInt(bulan.value)
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
            <div>
              <label htmlFor="tahun">Tahun</label>
              <FocusScope>
                <Popover open={open} onOpenChange={setOpen} side="bottom" align="start">
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {selectedTahun
                        ? tahuns.find((tahun) => parseInt(tahun.value) === selectedTahun)?.label
                        : "Pilih Tahun ..."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="w-full">
                      <CommandInput
                        placeholder="Search Tahun ..."
                        className="h-9 w-full"
                      />
                      <CommandList className="w-full">
                        <CommandEmpty>No TA found.</CommandEmpty>
                        <CommandGroup className="w-full">
                          {tahuns.map((tahun) => (
                            <CommandItem
                              key={tahun.value}
                              value={tahun.value}
                              onSelect={(currentValue) => {
                                setValue("tahun", parseInt(currentValue));
                                setOpen(false);
                              }}
                              className="w-full"
                            >
                              {tahun.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedTahun === parseInt(tahun.value)
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
            </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="form-item c-agama mb-0">
              <label htmlFor="tujuan">Tujuan</label>
            </div>
            <div className="form-item c-agama mb-0">
              <label htmlFor="konteks">Konteks</label>
            </div>
            <div className="form-item c-agama mb-0">
              <label htmlFor="kejadian">Kejadian</label>
            </div>
            <div className="form-item c-agama mb-0">
              <label htmlFor="muncul">Sudah Muncul?</label>
            </div>
          </div>

          {details.map((detail, index) => (
            <div className="grid grid-cols-4 gap-4" key={index}>
            <div className="form-item c-agama mb-0">
              <Textarea
                className="h-24"
                id={`tujuan-${index}`}
                value={detail.tujuan}
                {...register(`ceklis_pencapaian_detail.${index}.tujuan`, { required: true })}
                onChange={(e) => {
                  const newDetails = [...details];
                  newDetails[index].tujuan = e.target.value;
                  setDetails(newDetails);
                }}
              />
            </div>
            <div className="form-item c-agama mb-0">
              <Textarea
                className="h-24"
                id={`konteks-${index}`}
                value={detail.konteks}
                {...register(`ceklis_pencapaian_detail.${index}.konteks`, { required: true })}
                onChange={(e) => {
                  const newDetails = [...details];
                  newDetails[index].konteks = e.target.value;
                  setDetails(newDetails);
                }}
              />
            </div>
            <div className="form-item c-agama mb-0">
              <Textarea
                className="h-24"
                id={`kejadian-${index}`}
                value={detail.kejadian}
                {...register(`ceklis_pencapaian_detail.${index}.kejadian`, { required: true })}
                onChange={(e) => {
                  const newDetails = [...details];
                  newDetails[index].kejadian = e.target.value;
                  setDetails(newDetails);
                }}
              />
            </div>
            <div className="flex items-center gap-2 w-full justify-between">

            <Switch
              className="ml-10"
              id={`muncul-${index}`}
              checked={detail.muncul === 1} // Checked jika muncul bernilai 1
              {...register(`ceklis_pencapaian_detail.${index}.muncul`, { required: true })}
              onCheckedChange={(checked) => {
                const newDetails = [...details];
                const newValue = checked ? 1 : 0; // Ubah menjadi 1 atau 0
                newDetails[index].muncul = newValue;

                setDetails(newDetails); // Perbarui state lokal
                setValue(`ceklis_pencapaian_detail.${index}.muncul`, newValue); // Update react-hook-form
              }}
            />

            {index === 0 ? (
              <Button variant="success" onClick={handleAddDetail} className="mt-4">
                +
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={() => handleRemoveDetail(index)}
                className="mt-4"
              >
                -
              </Button>
            )}
            
             
            </div>
            
          </div>
          
          ))}

          

          <DialogFooter>
            <Button type="submit">Save</Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
