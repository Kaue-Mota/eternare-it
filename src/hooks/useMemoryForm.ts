// src/hooks/useMemoryForm.ts
import { useState, useCallback, useRef } from "react";
import {
  type MemoryFormData,
  INITIAL_FORM_DATA,
  type StepId,
  TOTAL_STEPS,
  REVIEW_STEP,
} from "../types/memory";
import { validateStep, type StepErrors, stepSchemas } from "../lib/validation";

const MAX_PHOTOS = 5;

export function useMemoryForm() {
  const [data, setData] = useState<MemoryFormData>(INITIAL_FORM_DATA);
  const [step, setStep] = useState<StepId>(1);
  const [errors, setErrors] = useState<StepErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── campos simples ──────────────────────────────────────────────────────────
  const setField = useCallback(
    <K extends keyof MemoryFormData>(key: K, value: MemoryFormData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  // ── fotos ───────────────────────────────────────────────────────────────────
  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (!files.length) return;

      setData((prev) => {
        const photos = [...prev.photos];
        const previews = [...prev.photosPreviews];

        for (const file of files) {
          if (photos.filter(Boolean).length >= MAX_PHOTOS) break;
          const emptySlot = photos.findIndex((p) => !p);
          const targetSlot = emptySlot === -1 ? photos.length : emptySlot;
          if (targetSlot >= MAX_PHOTOS) break;
          photos[targetSlot] = file;
          previews[targetSlot] = URL.createObjectURL(file);
        }

        return { ...prev, photos, photosPreviews: previews };
      });

      setErrors((prev) => ({ ...prev, photos: undefined }));
      e.target.value = "";
    },
    [],
  );

  const removePhoto = useCallback((index: number) => {
    setData((prev) => {
      const photos = [...prev.photos];
      const previews = [...prev.photosPreviews];
      if (previews[index]) URL.revokeObjectURL(previews[index]);
      photos.splice(index, 1);
      previews.splice(index, 1);
      return { ...prev, photos, photosPreviews: previews };
    });
  }, []);

  const filledSlots = data.photos.filter(Boolean).length;
  const canAddMore = filledSlots < MAX_PHOTOS;

  // ── navegação com validação ─────────────────────────────────────────────────
  const goNext = useCallback(() => {
    // se já está na revisão, não faz nada
    if (step === REVIEW_STEP) return;

    // steps 1-5 validam antes de avançar
    if (step <= TOTAL_STEPS) {
      const payloads: Record<number, Record<string, unknown>> = {
        1: { photos: data.photos.filter(Boolean) },
        2: { title: data.title, date: data.date },
        3: { text: data.text },
        4: { bgColor: data.bgColor },
        5: { emoji: data.emoji },
        6: { spotifyUrl: data.spotifyUrl || undefined },
      };

      const stepErrors = validateStep(
        step as keyof typeof stepSchemas,
        payloads[step],
      );

      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }

    setErrors({});
    // do último step vai para a revisão (6), senão avança normalmente
    setStep((prev) =>
      prev === TOTAL_STEPS ? REVIEW_STEP : ((prev + 1) as StepId),
    );
  }, [step, data]);

  const goBack = useCallback(() => {
    setErrors({});
    setStep((prev) => (prev > 1 ? ((prev - 1) as StepId) : prev));
  }, []);

  const goToStep = useCallback((s: StepId) => {
    setErrors({});
    setStep(s);
  }, []);

  return {
    data,
    step,
    errors,
    setField,
    openFilePicker,
    handleFileChange,
    removePhoto,
    canAddMore,
    filledSlots,
    fileInputRef,
    goNext,
    goBack,
    goToStep,
  };
}
