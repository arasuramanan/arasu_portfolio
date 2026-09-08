import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Resume = lazy(() => import("./pages/Resume"));
// const Articles = lazy(() => import("./pages/Articles"));
// const Profiles = lazy(() => import("./pages/Profiles"));
const Contact = lazy(() => import("./pages/Contact"));


const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="container-tight py-32 flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
  </div>
);

const lazyPage = (El: React.ComponentType) => (
  <Suspense fallback={<PageFallback />}>
    <El />
  </Suspense>
);

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                {/* <Route path="/about" element={lazyPage(About)} /> */}
                <Route path="/projects" element={lazyPage(Projects)} />
                <Route path="/skills" element={lazyPage(Skills)} />
                <Route path="/resume" element={lazyPage(Resume)} />
                {/* <Route path="/articles" element={lazyPage(Articles)} /> */}
                {/* <Route path="/profiles" element={lazyPage(Profiles)} /> */}
                <Route path="/contact" element={lazyPage(Contact)} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
