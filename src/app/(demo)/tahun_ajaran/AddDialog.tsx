"use client";

import React from "react";
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
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
interface FormData {
  nama: string;
  semester: string;
  tahun_ajaran: string;
}

interface AddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initialData?: FormData; // Add initial data for editing
  isEdit?: boolean; // Indicate if this is an edit action
}

export function AddDialog({ isOpen, onClose, onSave, initialData, isEdit }: AddDialogProps) {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>({
    defaultValues: initialData, // Set default values when editing
  });

  React.useEffect(() => {
    console.log(initialData);
    
    if (initialData) {
      setValue("tahun_ajaran", initialData.tahun_ajaran);
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await onSave(data);
      reset(); // Clear the form after successful submission
      onClose();
    } catch (error) {
      console.error('Failed to save record:', error);
    }
  };

  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Tahun_ajaran' : 'Tambah Tahun Ajaran'}</DialogTitle>
          <DialogDescription>{isEdit ? '' : ''}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="tahun_ajaran">Tahun Ajaran</label>
            <Input id="tahun_ajaran" {...register("tahun_ajaran", { required: true })} />
          </div>
          <DialogFooter className="p-2">
            <Button type="submit">{isEdit ? 'Update' : 'Save'}</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
