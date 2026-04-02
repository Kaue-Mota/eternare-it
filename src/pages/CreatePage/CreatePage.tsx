// src/pages/CreatePage.tsx
import { TOTAL_STEPS, REVIEW_STEP, type StepId } from "../../types/memory";
import { useMemoryForm } from "../../hooks/useMemoryForm";
import { MemoryPreview } from "../../components/ui/MemoryPreview";
import { StepPhotos } from "../../components/steps/StepPhotos";
import { StepIdentity } from "../../components/steps/StepIdentity";
import { StepText } from "../../components/steps/StepText";
import { StepVisual } from "../../components/steps/StepVisual";
import { StepMusic } from "../../components/steps/StepMusic";
import { StepReview } from "../../components/steps/StepReview";
import { StepEmoji } from "../../components/steps/StepEmoji";
import { Link } from "react-router-dom";
import { BackgroundLight } from "../../components/ui/sections/Backgroundlight";

export function CreatePage() {
  const {
    data,
    step,
    errors,
    setField,
    openFilePicker,
    handleFileChange,
    removePhoto,
    fileInputRef,
    goNext,
    goBack,
    goToStep,
  } = useMemoryForm();

  const isReview = step === REVIEW_STEP;

  return (
    <>
      <div className="min-h-screen white relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6  border-b border-white/6 bg-[#09090f]/85 backdrop-blur-lg">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo/TIPOLOGO.png"
              alt="Eternare.it"
              className="h-auto w-15 scale-200 ml-5 object-contain"
            />
          </Link>

          {/* Barra de progresso — esconde na revisão */}
          {!isReview && (
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => {
                  const s = (i + 1) as StepId;
                  const isDone = s < step;
                  const isActive = s === step;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => isDone && goToStep(s)}
                      disabled={!isDone}
                      className="h-0.75 rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? 24 : 12,
                        background: isDone
                          ? "#7c6aff"
                          : isActive
                            ? "#b06fff"
                            : "rgba(255,255,255,0.12)",
                        cursor: isDone ? "pointer" : "default",
                      }}
                      aria-label={`Ir para etapa ${s}`}
                    />
                  );
                })}
              </div>
              <span className="text-[11px] text-white/30 tabular-nums">
                {step}/{TOTAL_STEPS}
              </span>
            </div>
          )}

          {/* Badge na revisão */}
          {isReview && (
            <span className="text-[11px] text-[#b06fff] tracking-widest uppercase">
              Revisão final
            </span>
          )}
        </header>

        {/* Layout principal */}
        <div className="bg-[rgba(5,6,18,0.88)]  backdrop-blur-lg pt-15 min-h-screen grid grid-cols-1 lg:grid-cols-2">
          {/* Coluna do formulário */}
          <div className=" flex flex-col justify-center px-6 py-10 lg:px-12 lg:max-w-xl lg:ml-auto w-full">
            {step === 1 && (
              <StepPhotos
                data={data}
                errors={errors}
                onOpenPicker={openFilePicker}
                onRemove={removePhoto}
                onNext={goNext}
              />
            )}
            {step === 2 && (
              <StepIdentity
                data={data}
                errors={errors}
                onChange={setField}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 3 && (
              <StepText
                data={data}
                errors={errors}
                onChange={setField}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 4 && (
              <StepVisual
                data={data}
                onChange={setField}
                onNext={goNext}
                onBack={goBack}
              />
            )}

            {step === 5 && (
              <StepEmoji
                data={data}
                errors={errors}
                onChange={setField}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            
            {step === 6 && (
              <StepMusic
                data={data}
                errors={errors}
                onChange={setField}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === REVIEW_STEP && (
              <StepReview data={data} onEdit={goToStep} onBack={goBack} />
            )}
          </div>

          {/* Preview fixo na direita */}
          <div className="lg:flex items-center justify-center sticky top-16 h-full border-l border-white/5 mb-20 ">
            <MemoryPreview data={data} />
          </div>
        </div>

        {/* Input oculto com multiple */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <BackgroundLight />{" "}
    </>
  );
}
