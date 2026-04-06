import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import { CreatePage } from "../pages/CreatePage/CreatePage";
import { SuccessPage } from "../pages/SuccessPage";
import MemoryPage from "../pages/Memory/MemoryPage";

import { TermsPage } from "../pages/Legal/TermsPage";
import { PrivacyPage } from "../pages/Legal/PrivacyPage";
import { RefundPage } from "../pages/Legal/RefundPage";
import { AboutPage } from "../pages/AboutPage/AboutPage";
import { SupportPage } from "../pages/SupportPage/SupportPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route index element={<HomePage />} />
      <Route path="/criar" element={<CreatePage />} />
      <Route path="/sobre" element={<AboutPage />} />
      <Route path="/suporte" element={<SupportPage />} />
      <Route path="/m/:slug" element={<MemoryPage />} />
      <Route path="/sucesso" element={<SuccessPage />} />
     
      <Route path="/termos" element={<TermsPage />} />
      <Route path="/privacidade" element={<PrivacyPage />} />
      <Route path="/reembolso" element={<RefundPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}