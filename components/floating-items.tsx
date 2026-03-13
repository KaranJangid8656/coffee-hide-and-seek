"use client"

import { useEffect, useState } from "react"

interface FloatingItem {
  id: number
  x: number
  delay: number
  duration: number
  type: "coffee" | "chocolate"
  size: number
}

function CoffeeIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
        fill="#8B4513"
        stroke="#5D3A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 1v3M10 1v3M14 1v3"
        stroke="#8B4513"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChocolateIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="12" rx="2" fill="#5D3A1A" stroke="#3D2A1A" strokeWidth="1" />
      <line x1="9" y1="6" x2="9" y2="18" stroke="#3D2A1A" strokeWidth="1" />
      <line x1="15" y1="6" x2="15" y2="18" stroke="#3D2A1A" strokeWidth="1" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="#3D2A1A" strokeWidth="1" />
    </svg>
  )
}

export function FloatingItems() {
  const [items, setItems] = useState<FloatingItem[]>([])

  useEffect(() => {
    const newItems: FloatingItem[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
      type: Math.random() > 0.5 ? "coffee" : "chocolate",
      size: 20 + Math.random() * 16,
    }))
    setItems(newItems)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute animate-float opacity-40"
          style={{
            left: `${item.x}%`,
            bottom: "-50px",
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.type === "coffee" ? (
            <CoffeeIcon size={item.size} />
          ) : (
            <ChocolateIcon size={item.size} />
          )}
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}
