// Este script inicializa o banco de dados com dados de exemplo
import { MongoClient } from "mongodb"
import { hash } from "bcrypt"

// Obter as variáveis de ambiente
const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB
const jwtSecret = process.env.JWT_SECRET

if (!uri || !dbName) {
  console.error("Erro: Variáveis de ambiente MONGODB_URI e MONGODB_DB são obrigatórias")
  process.exit(1)
}

if (!jwtSecret) {
  console.warn("Aviso: Variável de ambiente JWT_SECRET não definida. A autenticação pode não funcionar corretamente.")
}

async function setupDatabase() {
  let client

  try {
    // Conectar ao MongoDB
    client = new MongoClient(uri)
    await client.connect()
    console.log("Conectado ao MongoDB com sucesso!")

    const db = client.db(dbName)

    // Criar usuário administrador
    const adminPassword = await hash("admin123", 10)

    // Verificar se já existe um usuário administrador
    const existingAdmin = await db.collection("users").findOne({ email: "admin@vianahub.pt" })

    if (!existingAdmin) {
      await db.collection("users").insertOne({
        name: "Administrador",
        email: "admin@vianahub.pt",
        password: adminPassword,
        role: "admin",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log("Usuário administrador criado com sucesso!")
    } else {
      console.log("Usuário administrador já existe, pulando criação...")
    }

    // Criar testemunhos de exemplo
    const testimonials = [
      {
        id: 1,
        name: "Sarah Viana",
        position: "CEO",
        company: "TechViana",
        image: "/images/testimonials/sarah-viana-02.webp",
        rating: 5,
        testimonial: {
          pt: "A VianaHub transformou completamente nosso sistema de gestão. A equipe foi extremamente profissional e entregou além das nossas expectativas.",
          en: "VianaHub completely transformed our management system. The team was extremely professional and delivered beyond our expectations.",
        },
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Alan Antonio",
        position: "CTO",
        company: "Inovação Digital",
        image: "/images/testimonials/alan-antonio-02.webp",
        rating: 5,
        testimonial: {
          pt: "Trabalhamos com a VianaHub em vários projetos e sempre ficamos impressionados com a qualidade e eficiência do trabalho deles.",
          en: "We have worked with VianaHub on several projects and have always been impressed with the quality and efficiency of their work.",
        },
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Claudio Antunes",
        position: "Diretor de Operações",
        company: "Logística Express",
        image: "/images/testimonials/claudio-antunes-02.webp",
        rating: 4,
        testimonial: {
          pt: "O sistema desenvolvido pela VianaHub aumentou nossa eficiência operacional em mais de 30%. Recomendo fortemente.",
          en: "The system developed by VianaHub increased our operational efficiency by more than 30%. I strongly recommend them.",
        },
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    // Verificar se já existem testemunhos
    const existingTestimonials = await db.collection("testimonials").countDocuments()

    if (existingTestimonials === 0) {
      await db.collection("testimonials").insertMany(testimonials)
      console.log("Testemunhos de exemplo criados com sucesso!")
    } else {
      console.log("Testemunhos já existem, pulando criação...")
    }

    // Criar projetos de exemplo
    const projects = [
      {
        id: 1,
        title: {
          pt: "Sistema ERP para Indústria",
          en: "ERP System for Industry",
        },
        description: {
          pt: "Desenvolvimento de um sistema ERP completo para gerenciamento de processos industriais.",
          en: "Development of a complete ERP system for managing industrial processes.",
        },
        image: "/images/projects/odoo.jpg",
        order: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: {
          pt: "Plataforma de E-commerce",
          en: "E-commerce Platform",
        },
        description: {
          pt: "Criação de uma plataforma de e-commerce personalizada com integração a múltiplos meios de pagamento.",
          en: "Creation of a custom e-commerce platform with integration to multiple payment methods.",
        },
        image: "/placeholder.svg?height=400&width=600",
        order: 2,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: {
          pt: "Sistema IoT para Monitoramento",
          en: "IoT System for Monitoring",
        },
        description: {
          pt: "Implementação de um sistema IoT para monitoramento em tempo real de equipamentos industriais.",
          en: "Implementation of an IoT system for real-time monitoring of industrial equipment.",
        },
        image: "/placeholder.svg?height=400&width=600",
        order: 3,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    // Verificar se já existem projetos
    const existingProjects = await db.collection("projects").countDocuments()

    if (existingProjects === 0) {
      await db.collection("projects").insertMany(projects)
      console.log("Projetos de exemplo criados com sucesso!")
    } else {
      console.log("Projetos já existem, pulando criação...")
    }

    // Criar serviços de exemplo
    const services = [
      {
        id: 1,
        title: {
          pt: "Desenvolvimento de Software",
          en: "Software Development",
        },
        description: {
          pt: "Criamos soluções personalizadas para atender às necessidades específicas do seu negócio.",
          en: "We create customized solutions to meet the specific needs of your business.",
        },
        icon: "Code",
        order: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: {
          pt: "Consultoria em TI",
          en: "IT Consulting",
        },
        description: {
          pt: "Aconselhamento especializado para otimizar os seus processos tecnológicos.",
          en: "Expert advice to optimize your technological processes.",
        },
        icon: "Database",
        order: 2,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: {
          pt: "Engenharia de Sistemas",
          en: "Systems Engineering",
        },
        description: {
          pt: "Projetamos e implementamos sistemas robustos e escaláveis.",
          en: "We design and implement robust and scalable systems.",
        },
        icon: "Server",
        order: 3,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        title: {
          pt: "Suporte Técnico",
          en: "Technical Support",
        },
        description: {
          pt: "Assistência contínua para garantir o funcionamento ideal dos seus sistemas.",
          en: "Continuous assistance to ensure optimal operation of your systems.",
        },
        icon: "Headphones",
        order: 4,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    // Verificar se já existem serviços
    const existingServices = await db.collection("services").countDocuments()

    if (existingServices === 0) {
      await db.collection("services").insertMany(services)
      console.log("Serviços de exemplo criados com sucesso!")
    } else {
      console.log("Serviços já existem, pulando criação...")
    }

    // Criar informações sobre a empresa
    const aboutInfo = {
      mission: {
        pt: "Fornecer soluções tecnológicas inovadoras que impulsionem o sucesso dos nossos clientes.",
        en: "To provide innovative technological solutions that drive our clients' success.",
      },
      vision: {
        pt: "Ser referência em excelência e inovação no setor de tecnologia em Portugal.",
        en: "To be a reference in excellence and innovation in the technology sector in Portugal.",
      },
      values: {
        pt: ["Inovação", "Qualidade", "Integridade", "Colaboração"],
        en: ["Innovation", "Quality", "Integrity", "Collaboration"],
      },
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Verificar se já existem informações sobre a empresa
    const existingAboutInfo = await db.collection("about").countDocuments()

    if (existingAboutInfo === 0) {
      await db.collection("about").insertOne(aboutInfo)
      console.log("Informações sobre a empresa criadas com sucesso!")
    } else {
      console.log("Informações sobre a empresa já existem, pulando criação...")
    }

    // Criar configurações gerais
    const settings = {
      siteName: "VianaHub",
      siteDescription: "VianaHub - Soluções inovadoras em sistemas e engenharia",
      contactEmail: "info@vianahub.pt",
      contactPhone: "+351 123 456 789",
      address: "Rua da Bandeira 123, 4900-001 Viana do Castelo, Portugal",
      socialMedia: {
        facebook: "https://facebook.com/vianahub",
        instagram: "https://instagram.com/vianahub",
        linkedin: "https://linkedin.com/company/vianahub",
      },
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Verificar se já existem configurações gerais
    const existingSettings = await db.collection("settings").countDocuments()

    if (existingSettings === 0) {
      await db.collection("settings").insertOne(settings)
      console.log("Configurações gerais criadas com sucesso!")
    } else {
      console.log("Configurações gerais já existem, pulando criação...")
    }

    // Criar coleções para logs e backups
    await db.createCollection("logs")
    console.log("Coleção de logs criada com sucesso!")

    // Criar índices para melhorar o desempenho
    await db.collection("testimonials").createIndex({ id: 1 }, { unique: true })
    await db.collection("projects").createIndex({ id: 1 }, { unique: true })
    await db.collection("services").createIndex({ id: 1 }, { unique: true })
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("logs").createIndex({ timestamp: -1 })
    console.log("Índices criados com sucesso!")

    console.log("Banco de dados inicializado com sucesso!")
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error)
  } finally {
    if (client) {
      await client.close()
      console.log("Conexão com o MongoDB fechada.")
    }
  }
}

// Executar a função de inicialização
setupDatabase()
