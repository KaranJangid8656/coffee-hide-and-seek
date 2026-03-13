"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

function CoffeeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 1v3M10 1v3M14 1v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChocolateIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor" />
      <line x1="9" y1="6" x2="9" y2="18" stroke="var(--background)" strokeWidth="1.5" />
      <line x1="15" y1="6" x2="15" y2="18" stroke="var(--background)" strokeWidth="1.5" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="var(--background)" strokeWidth="1.5" />
    </svg>
  )
}

export function LoveCalculator() {
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [result, setResult] = useState<{ percentage: number; isInfinite: boolean } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const checkSpecialCouple = (n1: string, n2: string) => {
    const normalize = (name: string) => name.toLowerCase().trim()
    const first = normalize(n1)
    const second = normalize(n2)

    const specialPairs = [
      ["karan", "riya"],
      ["riya", "karan"],
      ["karan suthar", "riya sharma"],
      ["riya sharma", "karan suthar"],
      ["riya sharma", "karan"],
      ["karan", "riya sharma"],
      ["karan suthar" , "riya"],
      ["riya", "karan suthar"]
      ["karan", "muskan"],
      ["muskan", "karan"]
    ]

    return specialPairs.some(
      ([a, b]) => (first === a && second === b) || (first === b && second === a)
    )
  }

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return

    setIsCalculating(true)
    setResult(null)

    setTimeout(() => {
      const isInfinite = checkSpecialCouple(name1, name2)
      const percentage = isInfinite ? 100 : Math.floor(Math.random() * 51) + 10

      setResult({ percentage, isInfinite })
      setIsCalculating(false)
    }, 1500)
  }

  const reset = () => {
    setName1("")
    setName2("")
    setResult(null)
  }

  return (
    <Card className="w-full max-w-md shadow-2xl border-2 border-primary/20 bg-card/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center gap-3 mb-2">
          <CoffeeIcon className="w-10 h-10 text-primary" />
          <ChocolateIcon className="w-10 h-10 text-accent" />
        </div>
        <CardTitle className="text-3xl font-bold text-primary">Love Calculator</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">Sweet as chocolate, warm as coffee</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Name 1</label>
            <Input
              placeholder="Enter name 1"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="border-primary/30 focus:border-primary bg-background/50"
              disabled={isCalculating}
            />
          </div>

          <div className="flex justify-center gap-2">
            <CoffeeIcon className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">+</span>
            <ChocolateIcon className="w-5 h-5 text-accent" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Name 2</label>
            <Input
              placeholder="Enter name 2"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="border-primary/30 focus:border-primary bg-background/50"
              disabled={isCalculating}
            />
          </div>
        </div>

        <Button
          onClick={calculateLove}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
          disabled={!name1.trim() || !name2.trim() || isCalculating}
        >
          {isCalculating ? (
            <span className="flex items-center gap-2">
              <CoffeeIcon className="w-5 h-5 animate-bounce" />
              Calculating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Calculate Love
            </span>
          )}
        </Button>

        {result && (
          <div className="animate-in fade-in-0 zoom-in-95 duration-500">
            <ResultDisplay
              name1={name1}
              name2={name2}
              percentage={result.percentage}
              isInfinite={result.isInfinite}
              onReset={reset}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ResultDisplay({
  name1,
  name2,
  percentage,
  isInfinite,
  onReset,
}: {
  name1: string
  name2: string
  percentage: number
  isInfinite: boolean
  onReset: () => void
}) {
  return (
    <div className="relative rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-6 text-center overflow-hidden">
      {isInfinite && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-primary/5 to-accent/5" />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="font-semibold text-foreground capitalize">{name1}</span>
          <CoffeeIcon className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground capitalize">{name2}</span>
        </div>

        {isInfinite ? (
          <div className="space-y-3">
            <div className="relative">
              <span className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse">
                Infinite
              </span>
              <Sparkles className="absolute -top-2 -right-4 w-6 h-6 text-accent animate-bounce" />
              <Sparkles className="absolute -top-1 -left-4 w-5 h-5 text-primary animate-bounce delay-150" />
            </div>
            <p className="text-2xl font-bold text-primary">Infinite Love!</p>
            <p className="text-sm text-muted-foreground">
              A perfect blend! Like coffee and chocolate, you belong together forever.
            </p>
            <div className="flex justify-center gap-2 mt-2">
              {[...Array(3)].map((_, i) => (
                <CoffeeIcon
                  key={`coffee-${i}`}
                  className={cn(
                    "w-6 h-6 text-primary animate-bounce"
                  )}
                  style={{ animationDelay: `${i * 150}ms` } as React.CSSProperties}
                />
              ))}
              {[...Array(2)].map((_, i) => (
                <ChocolateIcon
                  key={`choc-${i}`}
                  className={cn(
                    "w-6 h-6 text-accent animate-bounce"
                  )}
                  style={{ animationDelay: `${(i + 3) * 150}ms` } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <span className="text-6xl font-bold text-primary">{percentage}%</span>
            <p className="text-lg font-medium text-foreground">
              {percentage >= 50
                ? "Good compatibility!"
                : percentage >= 30
                ? "There is potential!"
                : "Keep working on it!"}
            </p>
          </div>
        )}

        <Button
          variant="outline"
          onClick={onReset}
          className="mt-4 border-primary/30 text-primary hover:bg-primary/10"
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}
