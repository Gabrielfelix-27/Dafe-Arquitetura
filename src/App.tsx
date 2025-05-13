import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// Removendo importações que não existem ainda e usando lazy loading para carregá-las dinamicamente
import { lazy, Suspense } from "react";

// Carregamento lazy para os componentes Login e Admin
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));

const queryClient = new QueryClient();

// Obtém o nome do subdiretório a partir da URL
const getBasename = () => {
  // Se estiver em produção e possuir um subdiretório, adicione-o aqui
  // Por exemplo, se o site estiver em example.com/app, o basename seria '/app'
  return process.env.NODE_ENV === 'production' ? '/' : '/';
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={getBasename()}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/login" 
            element={
              <Suspense fallback={<div>Carregando...</div>}>
                <Login />
              </Suspense>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <Suspense fallback={<div>Carregando...</div>}>
                <Admin />
              </Suspense>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
