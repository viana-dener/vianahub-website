import { openai } from "@ai-sdk/openai"
import { streamText, type Message } from "ai"

// Permitir respostas de streaming de até 30 segundos
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json()

  // Adicionar contexto sobre a VianaHub para o modelo
  const systemMessage = {
    role: "system",
    content: `Você é o assistente virtual da VianaHub, uma empresa de sistemas e engenharia localizada em Viana do Castelo, Portugal.
    
    Informações sobre a VianaHub:
    - Fundada em 2010
    - Especializada em desenvolvimento de software, consultoria em TI, engenharia de sistemas e suporte técnico
    - Atende clientes em Portugal e internacionalmente
    - Horário de funcionamento: Segunda a Sexta, 9h às 18h
    - Contato: info@vianahub.pt, +351 123 456 789
    
    Seja cordial, profissional e útil. Se não souber responder a alguma pergunta específica, ofereça encaminhar para um atendente humano.`,
  }

  const result = streamText({
    model: openai("gpt-4o"),
    messages: [systemMessage, ...messages],
  })

  return result.toDataStreamResponse()
}
