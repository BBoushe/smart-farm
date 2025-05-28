"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, Heart } from "lucide-react"
import type { BlogPost } from "@/lib/database"

interface TipModalProps {
  post: BlogPost
  onClose: () => void
  onTip: (amount: number, message?: string) => void
}

/**
 * Modal component for tipping blog post authors
 * Encourages community support and knowledge sharing
 */
export function TipModal({ post, onClose, onTip }: TipModalProps) {
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")

  const predefinedAmounts = [2, 5, 10, 20]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tipAmount = Number(amount)
    if (tipAmount > 0) {
      onTip(tipAmount, message.trim() || undefined)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Support This Author
              </CardTitle>
              <CardDescription>Show appreciation for "{post.title}"</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount">Tip Amount (€)</Label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {predefinedAmounts.map((preAmount) => (
                  <Button
                    key={preAmount}
                    type="button"
                    variant="outline"
                    onClick={() => setAmount(preAmount.toString())}
                    className={amount === preAmount.toString() ? "bg-amber-100 border-amber-300" : ""}
                  >
                    €{preAmount}
                  </Button>
                ))}
              </div>
              <Input
                id="amount"
                type="number"
                min="0.50"
                step="0.50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Custom amount"
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Thank the author or share your thoughts..."
                rows={3}
              />
            </div>

            <div className="bg-amber-50 p-3 rounded-lg text-sm text-amber-800">
              <p className="font-medium">💡 Why tip?</p>
              <p>Tips encourage farmers to share more valuable knowledge and help build a supportive community.</p>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-amber-600 hover:bg-amber-700"
                disabled={!amount || Number(amount) <= 0}
              >
                Send Tip €{amount || "0"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
