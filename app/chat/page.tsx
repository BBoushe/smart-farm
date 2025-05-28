"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

/**
 * AI-powered chatbot page for agricultural assistance
 * Provides farming advice, equipment guidance, and general support
 */
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your SmartFarm AI assistant. I can help you with farming techniques, equipment advice, plant diseases, and more. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  /**
   * Generates contextual responses based on user input
   * In production, this would connect to an actual AI service
   */
  const generateBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("tractor") || lowerInput.includes("equipment")) {
      return "For tractor maintenance, ensure regular oil changes every 100 hours of operation. Check hydraulic fluid levels weekly and inspect tires for proper pressure. Would you like specific advice about a particular tractor model?"
    }

    if (lowerInput.includes("disease") || lowerInput.includes("pest")) {
      return "Plant diseases can be prevented through proper crop rotation, adequate spacing, and regular monitoring. Common signs include yellowing leaves, spots, or wilting. Can you describe the specific symptoms you're seeing?"
    }

    if (lowerInput.includes("soil") || lowerInput.includes("fertilizer")) {
      return "Soil health is crucial for productive farming. I recommend testing your soil pH annually and adding organic matter like compost. The ideal pH for most crops is 6.0-7.0. What type of crops are you planning to grow?"
    }

    if (lowerInput.includes("weather") || lowerInput.includes("season")) {
      return "Weather planning is essential for farming success. Consider using weather apps and local forecasts for planting decisions. Spring preparation should begin 2-3 weeks before the last frost date in your area."
    }

    return "That's a great question! While I can provide general agricultural guidance, for specific technical issues, I recommend consulting with local agricultural extension services or experienced farmers in your area. Is there anything else I can help you with?"
  }

  return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-green-800 mb-2">AI Agricultural Assistant</h1>
          <p className="text-stone-600">
            Get instant advice on farming techniques, equipment, and agricultural best practices
          </p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Bot className="w-5 h-5 mr-2" />
              SmartFarm AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col overflow-auto">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === "user" ? "bg-green-700 text-white" : "bg-stone-100 text-stone-800"
                          }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender === "bot" && <Bot className="w-4 h-4 mt-1 text-green-600" />}
                          {message.sender === "user" && <User className="w-4 h-4 mt-1" />}
                          <div>
                            <p>{message.text}</p>
                            <p
                                className={`text-xs mt-1 ${message.sender === "user" ? "text-green-200" : "text-stone-500"}`}
                            >
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </ScrollArea>

            <form onSubmit={handleSendMessage} className="flex space-x-2 mt-4">
              <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about farming techniques, equipment, or any agricultural question..."
                  className="flex-1"
              />
              <Button type="submit" className="bg-green-700 hover:bg-green-800">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
  )
}
