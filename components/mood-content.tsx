"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Smile, Frown, ChevronRight } from "lucide-react"

export function MoodContent() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Daily Mood Card */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-2xl font-bold text-primary">
              Daily Mood
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Private and anonymous data
            </p>
          </div>
          <Badge className="bg-primary text-primary-foreground">
            Main Tracker
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Steps */}
          <div className="flex items-center justify-center gap-2">
            {[
              { num: 1, label: "Type", active: true },
              { num: 2, label: "Emotion", active: false },
              { num: 3, label: "Intensity", active: false },
              { num: 4, label: "Notes (opt.)", active: false },
            ].map((step, i) => (
              <div key={step.num} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      step.active
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {step.num}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {step.label}
                  </span>
                </div>
                {i < 3 && (
                  <div className="w-8 h-px bg-border mt-[-16px]" />
                )}
              </div>
            ))}
          </div>

          {/* Mood Selection */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 px-8 py-4 border-border hover:border-primary hover:bg-primary/5"
            >
              <Smile className="h-8 w-8 text-amber-500" />
              <span className="text-sm font-medium">Pleasant</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 px-8 py-4 border-border hover:border-primary hover:bg-primary/5"
            >
              <Frown className="h-8 w-8 text-amber-600" />
              <span className="text-sm font-medium">Unpleasant</span>
            </Button>
          </div>

          {/* Question */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">
              How would you describe your mood today?
            </h3>
          </div>

          {/* Mood Wheel Placeholder */}
          <div className="flex items-center justify-center">
            <div className="relative h-48 w-48">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="hsl(var(--primary) / 0.3)"
                  strokeWidth="24"
                  strokeDasharray="200 302"
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="24"
                  strokeDasharray="100 402"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-medium text-foreground">
                  Tranquil
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Card */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-2xl font-bold text-primary">
              Events
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Private and anonymous data
            </p>
          </div>
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            Secondary
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Steps */}
          <div className="flex items-center justify-center gap-2">
            {[
              { num: 1, label: "Emotion", active: true },
              { num: 2, label: "Intensity", active: false },
              { num: 3, label: "Notes (opt.)", active: false },
            ].map((step, i) => (
              <div key={step.num} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      step.active
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {step.num}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {step.label}
                  </span>
                </div>
                {i < 2 && (
                  <div className="w-8 h-px bg-border mt-[-16px]" />
                )}
              </div>
            ))}
          </div>

          {/* Question */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">
              Have you experienced any positive or negative events today?
            </h3>
          </div>

          {/* Events Wheel Placeholder */}
          <div className="flex items-center justify-center">
            <div className="relative h-48 w-48">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="24"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="hsl(var(--primary) / 0.7)"
                  strokeWidth="24"
                  strokeDasharray="150 352"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-medium text-foreground">
                  Sad
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
