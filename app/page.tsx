import { LoveCalculator } from "@/components/love-calculator"
import { FloatingItems } from "@/components/floating-items"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingItems />
      <LoveCalculator />
    </main>
  )
}
