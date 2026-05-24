"use client";

import React from "react";
import Skeleton from "./skeleton";

export interface SkeletonBuilderProps {
  /**
   * Layout schema. Can be a space-separated string of tokens like "circle:w-12 rect:w-full:h-32 text:w-3/4"
   * or an array of layout objects.
   */
  layout?: string | any[];
  /**
   * Number of times to repeat the skeleton pattern.
   */
  count?: number;
  /**
   * Tailwind class for the outermost container holding the repeated items.
   */
  className?: string;
  /**
   * Tailwind class for each repeated item's wrapper.
   */
  itemClassName?: string;
}

function parseToken(token: string) {
  const parts = token.split(":");
  const type = parts[0];

  if (type === "circle") {
    // format: circle:size (e.g., circle:w-12 or circle:10)
    const size = parts[1] || "w-10";
    const className = size.startsWith("w-")
      ? `${size} h-${size.substring(2)} rounded-full`
      : size.includes("px") || size.match(/^\d+$/)
      ? `w-[${size}] h-[${size}] rounded-full`
      : `${size} rounded-full`;
    return { type: "circle", className };
  }

  if (type === "rect") {
    // format: rect:width:height:radius (e.g., rect:w-full:h-32:rounded-xl)
    const width = parts[1] || "w-full";
    const height = parts[2] || "h-24";
    const radius = parts[3] || "rounded-xl";
    
    const wClass = width.startsWith("w-") || width.startsWith("w-[") ? width : `w-${width}`;
    const hClass = height.startsWith("h-") || height.startsWith("h-[") ? height : `h-${height}`;
    const rClass = radius.startsWith("rounded") ? radius : `rounded-${radius}`;
    
    return {
      type: "rect",
      className: `${wClass} ${hClass} ${rClass}`,
    };
  }

  if (type === "text" || type === "line") {
    // format: text:width:height (e.g., text:w-3/4:h-4)
    const width = parts[1] || "w-full";
    const height = parts[2] || "h-4";
    
    const wClass = width.startsWith("w-") || width.startsWith("w-[") ? width : `w-${width}`;
    const hClass = height.startsWith("h-") || height.startsWith("h-[") ? height : `h-${height}`;
    
    return {
      type: "text",
      className: `${wClass} ${hClass} rounded`,
    };
  }

  if (type === "badge") {
    // format: badge:width (e.g., badge:w-16)
    const width = parts[1] || "w-16";
    const wClass = width.startsWith("w-") || width.startsWith("w-[") ? width : `w-${width}`;
    return { type: "badge", className: `${wClass} h-6 rounded-full` };
  }

  if (type === "button") {
    // format: button:width:height (e.g., button:w-24:h-10)
    const width = parts[1] || "w-24";
    const height = parts[2] || "h-10";
    
    const wClass = width.startsWith("w-") || width.startsWith("w-[") ? width : `w-${width}`;
    const hClass = height.startsWith("h-") || height.startsWith("h-[") ? height : `h-${height}`;
    
    return { type: "button", className: `${wClass} ${hClass} rounded-full` };
  }

  // fallback if full class was passed directly
  return { type: "custom", className: token };
}

export default function SkeletonBuilder({
  layout = "circle:w-12 text:w-3/4 text:w-1/2",
  count = 1,
  className = "flex flex-col gap-4 w-full",
  itemClassName = "flex flex-col gap-3 w-full",
}: SkeletonBuilderProps) {
  
  const items = React.useMemo(() => {
    if (Array.isArray(layout)) {
      return layout.map((item) => {
        if (typeof item === "string") {
          return parseToken(item);
        }
        
        const type = item.type || "rect";
        const w = item.width || (type === "circle" ? "w-10" : "w-full");
        const h = item.height || (type === "circle" ? "h-10" : type === "text" || type === "line" ? "h-4" : "h-24");
        const r = item.radius || (type === "circle" ? "rounded-full" : type === "text" || type === "line" ? "rounded" : "rounded-xl");
        const customClass = item.className || "";
        
        return {
          type,
          className: `${w} ${h} ${r} ${customClass}`.trim(),
        };
      });
    }

    if (typeof layout === "string") {
      return layout.trim().split(/\s+/).map(parseToken);
    }

    return [];
  }, [layout]);

  const itemsArray = Array.from({ length: count });

  return (
    <div className={className}>
      {itemsArray.map((_, index) => (
        <div key={index} className={itemClassName}>
          {items.map((item, itemIndex) => (
            <Skeleton key={itemIndex} className={item.className} />
          ))}
        </div>
      ))}
    </div>
  );
}
