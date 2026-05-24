"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Sparkles, 
  Trash2, 
  Plus, 
  Copy, 
  Check, 
  X, 
  ArrowUp, 
  ArrowDown, 
  Sun, 
  Moon, 
  LayoutGrid, 
  Code,
  Eye
} from "lucide-react";
import SkeletonBuilder from "./skeleton-builder";

interface ElementConfig {
  id: string;
  type: "circle" | "rect" | "text" | "badge" | "button";
  width: string;
  height: string;
  radius: string;
  spacing: string;
}

const PRESETS = {
  service: "rect:w-full:h-1.5:rounded-none circle:w-10 text:w-28 text:w-44 text:w-full text:w-3/4 button:w-32",
  product: "rect:w-full:h-48:rounded-2xl text:w-3/4 text:w-1/2 badge:w-16 button:w-full:h-12",
  hero: "badge:w-36 text:w-full:h-12 text:w-3/4:h-12 text:w-5/6 text:w-2/3 button:w-32:h-12 button:w-24:h-12",
  profile: "circle:w-16 text:w-44:h-6 text:w-28",
};

export default function SkeletonDevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"builder" | "code">("builder");
  const [codeType, setCodeType] = useState<"builder" | "vanilla">("builder");
  const [copied, setCopied] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  
  // List of items in our layout
  const [elements, setElements] = useState<ElementConfig[]>([
    { id: "1", type: "circle", width: "w-12", height: "h-12", radius: "rounded-full", spacing: "mb-3" },
    { id: "2", type: "text", width: "w-3/4", height: "h-5", radius: "rounded", spacing: "mb-2" },
    { id: "3", type: "text", width: "w-1/2", height: "h-4", radius: "rounded", spacing: "mb-4" },
    { id: "4", type: "rect", width: "w-full", height: "h-32", radius: "rounded-2xl", spacing: "mb-0" },
  ]);

  useEffect(() => {
    setMounted(true);
    // Auto-detect dark mode for preview theme
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setPreviewTheme(isDark ? "dark" : "light");
    }
  }, []);

  // Compute the shorthand string
  const layoutString = useMemo(() => {
    return elements.map(el => {
      if (el.type === "circle") return `circle:${el.width}`;
      if (el.type === "rect") return `rect:${el.width}:${el.height}:${el.radius}`;
      if (el.type === "text") return `text:${el.width}:${el.height}`;
      if (el.type === "badge") return `badge:${el.width}`;
      if (el.type === "button") return `button:${el.width}:${el.height}`;
      return "";
    }).filter(Boolean).join(" ");
  }, [elements]);

  // Generate code snippet
  const generatedCode = useMemo(() => {
    if (codeType === "builder") {
      return `import SkeletonBuilder from "@/components/ui/skeleton-builder";

export default function MyComponentSkeleton() {
  return (
    <SkeletonBuilder 
      layout="${layoutString}"
      className="flex flex-col gap-4 w-full max-w-md p-6 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl"
      itemClassName="flex flex-col gap-3"
      count={1}
    />
  );
}`;
    } else {
      const skeletonsMarkup = elements.map(el => {
        const spacingClass = el.spacing ? ` ${el.spacing}` : "";
        if (el.type === "circle") {
          return `      <Skeleton className="${el.width} h-${el.width.replace("w-", "")} rounded-full${spacingClass}" />`;
        }
        if (el.type === "rect") {
          return `      <Skeleton className="${el.width} ${el.height} ${el.radius}${spacingClass}" />`;
        }
        if (el.type === "text") {
          return `      <Skeleton className="${el.width} ${el.height} rounded${spacingClass}" />`;
        }
        if (el.type === "badge") {
          return `      <Skeleton className="${el.width} h-6 rounded-full${spacingClass}" />`;
        }
        if (el.type === "button") {
          return `      <Skeleton className="${el.width} ${el.height} rounded-full${spacingClass}" />`;
        }
        return "";
      }).join("\n");

      return `import Skeleton from "@/components/ui/skeleton";

export default function MyComponentSkeleton() {
  return (
    <div className="flex flex-col p-6 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl w-full max-w-md">
${skeletonsMarkup}
    </div>
  );
}`;
    }
  }, [layoutString, elements, codeType]);

  if (!mounted || process.env.NODE_ENV !== "development") return null;

  // Handlers
  const handleAddElement = (type: ElementConfig["type"]) => {
    const id = Date.now().toString();
    const defaults: Record<ElementConfig["type"], Partial<ElementConfig>> = {
      circle: { width: "w-10", height: "h-10", radius: "rounded-full", spacing: "mb-3" },
      rect: { width: "w-full", height: "h-24", radius: "rounded-xl", spacing: "mb-3" },
      text: { width: "w-full", height: "h-4", radius: "rounded", spacing: "mb-2" },
      badge: { width: "w-16", height: "h-6", radius: "rounded-full", spacing: "mb-3" },
      button: { width: "w-24", height: "h-10", radius: "rounded-full", spacing: "mb-3" },
    };
    
    setElements([...elements, { id, type, ...defaults[type] } as ElementConfig]);
  };

  const handleUpdateElement = (id: string, updates: Partial<ElementConfig>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === elements.length - 1) return;

    const newElements = [...elements];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newElements[index];
    newElements[index] = newElements[targetIndex];
    newElements[targetIndex] = temp;
    setElements(newElements);
  };

  const handleLoadPreset = (presetName: keyof typeof PRESETS) => {
    const presetStr = PRESETS[presetName];
    const tokens = presetStr.split(" ");
    const parsed = tokens.map((token, idx) => {
      const parts = token.split(":");
      const type = parts[0] as ElementConfig["type"];
      const id = `${idx}-${Date.now()}`;
      
      if (type === "circle") {
        return { id, type, width: parts[1] || "w-10", height: "h-10", radius: "rounded-full", spacing: "mb-3" };
      }
      if (type === "rect") {
        return { id, type, width: parts[1] || "w-full", height: parts[2] || "h-24", radius: parts[3] || "rounded-xl", spacing: "mb-3" };
      }
      if (type === "text") {
        return { id, type, width: parts[1] || "w-full", height: parts[2] || "h-4", radius: "rounded", spacing: "mb-2" };
      }
      if (type === "badge") {
        return { id, type, width: parts[1] || "w-16", height: "h-6", radius: "rounded-full", spacing: "mb-3" };
      }
      if (type === "button") {
        return { id, type, width: parts[1] || "w-24", height: parts[2] || "h-10", radius: "rounded-full", spacing: "mb-3" };
      }
      return null;
    }).filter(Boolean) as ElementConfig[];

    setElements(parsed);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <>
      {/* Floating dev trigger badge - Left bottom corner */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all duration-200 group border border-neutral-800 dark:border-neutral-200"
        title="Open Skeleton Builder"
      >
        <LayoutGrid className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
        </span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over Drawer Panel */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-[450px] max-w-full bg-white/95 dark:bg-neutral-950/95 border-r border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl transition-transform duration-300 ease-out flex flex-col backdrop-blur-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Skeleton Builder</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Desarrollo local (devmode)</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Navigation Tabs */}
        <div className="flex border-b border-neutral-100 dark:border-neutral-800">
          <button
            onClick={() => setActiveTab("builder")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === "builder" 
                ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" 
                : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
            }`}
          >
            <Eye className="h-4 w-4" />
            Builder & Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === "code" 
                ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" 
                : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
            }`}
          >
            <Code className="h-4 w-4" />
            Código Exportado
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === "builder" ? (
            <>
              {/* Presets Grid */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">Plantillas Predefinidas</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleLoadPreset("service")}
                    className="p-2 text-left rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-xs font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    🐾 Tarjeta de Servicio
                  </button>
                  <button 
                    onClick={() => handleLoadPreset("product")}
                    className="p-2 text-left rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-xs font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    🛍️ Tarjeta Producto
                  </button>
                  <button 
                    onClick={() => handleLoadPreset("hero")}
                    className="p-2 text-left rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-xs font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    ✨ Banner Heroico
                  </button>
                  <button 
                    onClick={() => handleLoadPreset("profile")}
                    className="p-2 text-left rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-xs font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    👤 Ficha Perfil
                  </button>
                </div>
              </div>

              {/* Elements Toolbar */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">Añadir Componente</label>
                <div className="flex flex-wrap gap-1.5">
                  <button 
                    onClick={() => handleAddElement("circle")} 
                    className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1 transition-colors"
                  >
                    <Plus className="h-3 w-3" /> Círculo
                  </button>
                  <button 
                    onClick={() => handleAddElement("rect")} 
                    className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1 transition-colors"
                  >
                    <Plus className="h-3 w-3" /> Rectángulo
                  </button>
                  <button 
                    onClick={() => handleAddElement("text")} 
                    className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1 transition-colors"
                  >
                    <Plus className="h-3 w-3" /> Texto
                  </button>
                  <button 
                    onClick={() => handleAddElement("badge")} 
                    className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1 transition-colors"
                  >
                    <Plus className="h-3 w-3" /> Badge
                  </button>
                  <button 
                    onClick={() => handleAddElement("button")} 
                    className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1 transition-colors"
                  >
                    <Plus className="h-3 w-3" /> Botón
                  </button>
                </div>
              </div>

              {/* Elements List */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Orden del Esqueleto</label>
                  {elements.length > 0 && (
                    <button 
                      onClick={() => setElements([])}
                      className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Limpiar todo
                    </button>
                  )}
                </div>

                {elements.length === 0 ? (
                  <div className="text-center py-8 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 text-xs">
                    El esqueleto está vacío. Añade componentes arriba.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {elements.map((el, index) => (
                      <div 
                        key={el.id} 
                        className="flex items-center gap-2 p-3 bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl text-xs"
                      >
                        <div className="flex flex-col gap-0.5">
                          <button 
                            disabled={index === 0}
                            onClick={() => handleMove(index, "up")}
                            className="p-0.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 disabled:opacity-30 disabled:pointer-events-none"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button 
                            disabled={index === elements.length - 1}
                            onClick={() => handleMove(index, "down")}
                            className="p-0.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 disabled:opacity-30 disabled:pointer-events-none"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold capitalize text-neutral-800 dark:text-neutral-200">{el.type}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">#{index + 1}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                            {/* Width Selector */}
                            <div className="flex flex-col gap-0.5">
                              <span className="text-neutral-400">Ancho</span>
                              <select 
                                value={el.width}
                                onChange={(e) => handleUpdateElement(el.id, { width: e.target.value })}
                                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-1 py-0.5 text-neutral-800 dark:text-neutral-200 font-mono text-[10px]"
                              >
                                <option value="w-full">Full (100%)</option>
                                <option value="w-3/4">3/4</option>
                                <option value="w-2/3">2/3</option>
                                <option value="w-1/2">1/2</option>
                                <option value="w-1/3">1/3</option>
                                <option value="w-1/4">1/4</option>
                                <option value="w-48">w-48 (12rem)</option>
                                <option value="w-44">w-44 (11rem)</option>
                                <option value="w-36">w-36 (9rem)</option>
                                <option value="w-32">w-32 (8rem)</option>
                                <option value="w-28">w-28 (7rem)</option>
                                <option value="w-24">w-24 (6rem)</option>
                                <option value="w-20">w-20 (5rem)</option>
                                <option value="w-16">w-16 (4rem)</option>
                                <option value="w-12">w-12 (3rem)</option>
                                <option value="w-10">w-10 (2.5rem)</option>
                                <option value="w-8">w-8 (2rem)</option>
                              </select>
                            </div>

                            {/* Height Selector (Not for Circle) */}
                            {el.type !== "circle" && (
                              <div className="flex flex-col gap-0.5">
                                <span className="text-neutral-400">Alto</span>
                                <select 
                                  value={el.height}
                                  onChange={(e) => handleUpdateElement(el.id, { height: e.target.value })}
                                  className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-1 py-0.5 text-neutral-800 dark:text-neutral-200 font-mono text-[10px]"
                                >
                                  <option value="h-1.5">h-1.5 (6px)</option>
                                  <option value="h-2">h-2 (8px)</option>
                                  <option value="h-3">h-3 (12px)</option>
                                  <option value="h-4">h-4 (16px)</option>
                                  <option value="h-5">h-5 (20px)</option>
                                  <option value="h-6">h-6 (24px)</option>
                                  <option value="h-7">h-7 (28px)</option>
                                  <option value="h-8">h-8 (32px)</option>
                                  <option value="h-10">h-10 (40px)</option>
                                  <option value="h-12">h-12 (48px)</option>
                                  <option value="h-16">h-16 (64px)</option>
                                  <option value="h-20">h-20 (80px)</option>
                                  <option value="h-24">h-24 (96px)</option>
                                  <option value="h-32">h-32 (128px)</option>
                                  <option value="h-40">h-40 (160px)</option>
                                  <option value="h-48">h-48 (192px)</option>
                                </select>
                              </div>
                            )}

                            {/* Radius Selector (Only for Rect) */}
                            {el.type === "rect" && (
                              <div className="flex flex-col gap-0.5">
                                <span className="text-neutral-400">Esquinas</span>
                                <select 
                                  value={el.radius}
                                  onChange={(e) => handleUpdateElement(el.id, { radius: e.target.value })}
                                  className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-1 py-0.5 text-neutral-800 dark:text-neutral-200 font-mono text-[10px]"
                                >
                                  <option value="rounded-none">Rectas</option>
                                  <option value="rounded-sm">Redondeado sm</option>
                                  <option value="rounded">Redondeado base</option>
                                  <option value="rounded-md">Redondeado md</option>
                                  <option value="rounded-lg">Redondeado lg</option>
                                  <option value="rounded-xl">Redondeado xl</option>
                                  <option value="rounded-2xl">Redondeado 2xl</option>
                                  <option value="rounded-3xl">Redondeado 3xl</option>
                                  <option value="rounded-full">Círculo/Píldora</option>
                                </select>
                              </div>
                            )}

                            {/* Gap Spacing Selector */}
                            <div className="flex flex-col gap-0.5">
                              <span className="text-neutral-400">Separación</span>
                              <select 
                                value={el.spacing}
                                onChange={(e) => handleUpdateElement(el.id, { spacing: e.target.value })}
                                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-1 py-0.5 text-neutral-800 dark:text-neutral-200 font-mono text-[10px]"
                              >
                                <option value="mb-0">Sin margen</option>
                                <option value="mb-1">Pequeño xs (4px)</option>
                                <option value="mb-2">Pequeño (8px)</option>
                                <option value="mb-3">Normal (12px)</option>
                                <option value="mb-4">Medio (16px)</option>
                                <option value="mb-5">Grande sm (20px)</option>
                                <option value="mb-6">Grande lg (24px)</option>
                                <option value="mb-8">Muy Grande (32px)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleDeleteElement(el.id)}
                          className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Shimmer Preview Sandbox */}
              {elements.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Vista Previa Shimmer</label>
                    <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-lg border border-neutral-200/30 dark:border-neutral-800/30">
                      <button 
                        onClick={() => setPreviewTheme("light")}
                        className={`p-1 rounded ${previewTheme === "light" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs" : "text-neutral-400"}`}
                        title="Previsualizar Claro"
                      >
                        <Sun className="h-3 w-3" />
                      </button>
                      <button 
                        onClick={() => setPreviewTheme("dark")}
                        className={`p-1 rounded ${previewTheme === "dark" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs" : "text-neutral-400"}`}
                        title="Previsualizar Oscuro"
                      >
                        <Moon className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                    previewTheme === "dark" 
                      ? "dark bg-neutral-950 border-neutral-800" 
                      : "bg-white border-neutral-200/60"
                  }`}>
                    {/* Render the actual elements list in the preview */}
                    <div className="flex flex-col w-full max-w-sm mx-auto">
                      {elements.map(el => {
                        const spacingClass = el.spacing ? ` ${el.spacing}` : "";
                        if (el.type === "circle") {
                          const sizeNum = el.width.replace("w-", "");
                          const heightClass = `h-${sizeNum}`;
                          return (
                            <div key={el.id} className="skeleton-shimmer rounded-full" style={{ width: el.width === "w-full" ? "100%" : undefined }} className={`${el.width} ${heightClass} rounded-full${spacingClass} skeleton-shimmer`} />
                          );
                        }
                        if (el.type === "rect") {
                          return (
                            <div key={el.id} className={`${el.width} ${el.height} ${el.radius}${spacingClass} skeleton-shimmer`} />
                          );
                        }
                        if (el.type === "text") {
                          return (
                            <div key={el.id} className={`${el.width} ${el.height} rounded${spacingClass} skeleton-shimmer`} />
                          );
                        }
                        if (el.type === "badge") {
                          return (
                            <div key={el.id} className={`${el.width} h-6 rounded-full${spacingClass} skeleton-shimmer`} />
                          );
                        }
                        if (el.type === "button") {
                          return (
                            <div key={el.id} className={`${el.width} ${el.height} rounded-full${spacingClass} skeleton-shimmer`} />
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Code Exporter Tab */
            <div className="space-y-5 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Tipo de Exportación</span>
                <div className="flex bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-lg border border-neutral-200/30 dark:border-neutral-800/30 text-[11px] font-medium">
                  <button 
                    onClick={() => setCodeType("builder")}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      codeType === "builder" 
                        ? "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white shadow-xs" 
                        : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                    }`}
                  >
                    SkeletonBuilder
                  </button>
                  <button 
                    onClick={() => setCodeType("vanilla")}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      codeType === "vanilla" 
                        ? "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white shadow-xs" 
                        : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                    }`}
                  >
                    Raw skeletons
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {codeType === "builder" 
                    ? "Exporta usando el componente modular y dinámico SkeletonBuilder a través de un layout estructurado como propiedad."
                    : "Exporta código React nativo con cada componente Skeleton explícito para copiar directamente en tu componente."
                  }
                </p>
              </div>

              {/* Shorthand viewer */}
              {codeType === "builder" && (
                <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 text-xs">
                  <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono uppercase tracking-wider mb-1">Layout string (shorthand):</div>
                  <code className="block font-mono text-indigo-500 dark:text-indigo-400 select-all font-semibold break-all leading-normal">
                    {layoutString}
                  </code>
                </div>
              )}

              {/* Code Box */}
              <div className="relative flex-1 bg-neutral-950 dark:bg-black rounded-2xl border border-neutral-900 dark:border-neutral-900 overflow-hidden min-h-[300px] flex flex-col">
                <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-900 text-[10px] font-mono text-neutral-500 bg-neutral-950">
                  <span>MyComponentSkeleton.tsx</span>
                  <button 
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-green-500">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="flex-1 overflow-auto p-4 text-[11px] font-mono text-neutral-300 leading-relaxed select-all hide-scrollbar">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
