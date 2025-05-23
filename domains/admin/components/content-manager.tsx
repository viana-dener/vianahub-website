"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash, Save, RefreshCw, Star, MessageSquare, ImageIcon, FileText, Code } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

// Componente para gerenciar testemunhos
export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    position: "",
    company: "",
    image: "/images/testimonials/placeholder.webp",
    rating: 5,
    testimonial: {
      pt: "",
      en: "",
    },
  })
  const { toast } = useToast()

  // Buscar testemunhos
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials")

        if (!response.ok) {
          throw new Error("Falha ao buscar testemunhos")
        }

        const data = await response.json()
        setTestimonials(data)
        setIsLoading(false)
      } catch (err) {
        console.error("Erro ao buscar testemunhos:", err)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os testemunhos.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [toast])

  // Adicionar novo testemunho
  const handleAddTestimonial = async () => {
    // Validar dados
    if (!newTestimonial.name || !newTestimonial.testimonial.pt || !newTestimonial.testimonial.en) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTestimonial),
      })

      if (!response.ok) {
        throw new Error("Falha ao adicionar testemunho")
      }

      const data = await response.json()

      // Atualizar a lista de testemunhos
      setTestimonials([...testimonials, data])

      // Limpar o formulário
      setNewTestimonial({
        name: "",
        position: "",
        company: "",
        image: "/images/testimonials/placeholder.webp",
        rating: 5,
        testimonial: {
          pt: "",
          en: "",
        },
      })

      toast({
        title: "Sucesso",
        description: "Testemunho adicionado com sucesso!",
      })
    } catch (err) {
      console.error("Erro ao adicionar testemunho:", err)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o testemunho.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Editar testemunho
  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial)
  }

  // Salvar edição de testemunho
  const handleSaveEdit = async () => {
    if (!editingTestimonial) return

    setIsSaving(true)

    try {
      const response = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingTestimonial),
      })

      if (!response.ok) {
        throw new Error("Falha ao atualizar testemunho")
      }

      // Atualizar a lista de testemunhos
      const updatedTestimonials = testimonials.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t))

      setTestimonials(updatedTestimonials)
      setEditingTestimonial(null)

      toast({
        title: "Sucesso",
        description: "Testemunho atualizado com sucesso!",
      })
    } catch (err) {
      console.error("Erro ao atualizar testemunho:", err)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o testemunho.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Excluir testemunho
  const handleDeleteTestimonial = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este testemunho?")) return

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Falha ao excluir testemunho")
      }

      // Atualizar a lista de testemunhos
      setTestimonials(testimonials.filter((t) => t.id !== id))

      toast({
        title: "Sucesso",
        description: "Testemunho excluído com sucesso!",
      })
    } catch (err) {
      console.error("Erro ao excluir testemunho:", err)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o testemunho.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Testemunhos</CardTitle>
        <CardDescription>Adicione, edite ou remova testemunhos de clientes</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Lista de testemunhos */}
            <div className="rounded-md border mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.length > 0 ? (
                    testimonials.map((testimonial) => (
                      <TableRow key={testimonial.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{testimonial.company}</TableCell>
                        <TableCell>
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditTestimonial(testimonial)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Excluir</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        Nenhum testemunho encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Formulário para adicionar/editar testemunho */}
            <div className="space-y-4 border rounded-md p-4">
              <h3 className="text-lg font-medium">
                {editingTestimonial ? "Editar Testemunho" : "Adicionar Novo Testemunho"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={editingTestimonial ? editingTestimonial.name : newTestimonial.name}
                    onChange={(e) => {
                      if (editingTestimonial) {
                        setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                      } else {
                        setNewTestimonial({ ...newTestimonial, name: e.target.value })
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Cargo</Label>
                  <Input
                    id="position"
                    value={editingTestimonial ? editingTestimonial.position : newTestimonial.position}
                    onChange={(e) => {
                      if (editingTestimonial) {
                        setEditingTestimonial({ ...editingTestimonial, position: e.target.value })
                      } else {
                        setNewTestimonial({ ...newTestimonial, position: e.target.value })
                      }
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    value={editingTestimonial ? editingTestimonial.company : newTestimonial.company}
                    onChange={(e) => {
                      if (editingTestimonial) {
                        setEditingTestimonial({ ...editingTestimonial, company: e.target.value })
                      } else {
                        setNewTestimonial({ ...newTestimonial, company: e.target.value })
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={editingTestimonial ? editingTestimonial.image : newTestimonial.image}
                    onChange={(e) => {
                      if (editingTestimonial) {
                        setEditingTestimonial({ ...editingTestimonial, image: e.target.value })
                      } else {
                        setNewTestimonial({ ...newTestimonial, image: e.target.value })
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Avaliação</Label>
                <Select
                  value={editingTestimonial ? String(editingTestimonial.rating) : String(newTestimonial.rating)}
                  onValueChange={(value) => {
                    if (editingTestimonial) {
                      setEditingTestimonial({ ...editingTestimonial, rating: Number(value) })
                    } else {
                      setNewTestimonial({ ...newTestimonial, rating: Number(value) })
                    }
                  }}
                >
                  <SelectTrigger id="rating">
                    <SelectValue placeholder="Selecione a avaliação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Estrela</SelectItem>
                    <SelectItem value="2">2 Estrelas</SelectItem>
                    <SelectItem value="3">3 Estrelas</SelectItem>
                    <SelectItem value="4">4 Estrelas</SelectItem>
                    <SelectItem value="5">5 Estrelas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial-pt">Testemunho (Português)</Label>
                <Textarea
                  id="testimonial-pt"
                  rows={3}
                  value={editingTestimonial ? editingTestimonial.testimonial.pt : newTestimonial.testimonial.pt}
                  onChange={(e) => {
                    if (editingTestimonial) {
                      setEditingTestimonial({
                        ...editingTestimonial,
                        testimonial: { ...editingTestimonial.testimonial, pt: e.target.value },
                      })
                    } else {
                      setNewTestimonial({
                        ...newTestimonial,
                        testimonial: { ...newTestimonial.testimonial, pt: e.target.value },
                      })
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial-en">Testemunho (Inglês)</Label>
                <Textarea
                  id="testimonial-en"
                  rows={3}
                  value={editingTestimonial ? editingTestimonial.testimonial.en : newTestimonial.testimonial.en}
                  onChange={(e) => {
                    if (editingTestimonial) {
                      setEditingTestimonial({
                        ...editingTestimonial,
                        testimonial: { ...editingTestimonial.testimonial, en: e.target.value },
                      })
                    } else {
                      setNewTestimonial({
                        ...newTestimonial,
                        testimonial: { ...newTestimonial.testimonial, en: e.target.value },
                      })
                    }
                  }}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                {editingTestimonial && (
                  <Button variant="outline" onClick={() => setEditingTestimonial(null)}>
                    Cancelar
                  </Button>
                )}

                <Button onClick={editingTestimonial ? handleSaveEdit : handleAddTestimonial} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      {editingTestimonial ? "Salvando..." : "Adicionando..."}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingTestimonial ? "Salvar Alterações" : "Adicionar Testemunho"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// Adicione esta função após o componente TestimonialsManager

// Componente para gerenciar projetos
export function ProjectsManager() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [newProject, setNewProject] = useState({
    title: {
      pt: "",
      en: "",
    },
    description: {
      pt: "",
      en: "",
    },
    image: "/placeholder.svg",
    order: 0,
    active: true,
  })
  const { toast } = useToast()

  // Buscar projetos
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects")

        if (!response.ok) {
          throw new Error("Falha ao buscar projetos")
        }

        const data = await response.json()
        setProjects(data)
        setIsLoading(false)
      } catch (err) {
        console.error("Erro ao buscar projetos:", err)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os projetos.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [toast])

  // Adicionar novo projeto
  const handleAddProject = async () => {
    // Validar dados
    if (!newProject.title.pt || !newProject.title.en || !newProject.description.pt || !newProject.description.en) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      })

      if (!response.ok) {
        throw new Error("Falha ao adicionar projeto")
      }

      const data = await response.json()

      // Atualizar a lista de projetos
      setProjects([...projects, data])

      // Limpar o formulário
      setNewProject({
        title: {
          pt: "",
          en: "",
        },
        description: {
          pt: "",
          en: "",
        },
        image: "/placeholder.svg",
        order: 0,
        active: true,
      })

      toast({
        title: "Sucesso",
        description: "Projeto adicionado com sucesso!",
      })
    } catch (err) {
      console.error("Erro ao adicionar projeto:", err)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o projeto.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Editar projeto
  const handleEditProject = (project) => {
    setEditingProject(project)
  }

  // Salvar edição de projeto
  const handleSaveEdit = async () => {
    if (!editingProject) return

    setIsSaving(true)

    try {
      const response = await fetch(`/api/projects/${editingProject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingProject),
      })

      if (!response.ok) {
        throw new Error("Falha ao atualizar projeto")
      }

      // Atualizar a lista de projetos
      const updatedProjects = projects.map((p) => (p.id === editingProject.id ? editingProject : p))

      setProjects(updatedProjects)
      setEditingProject(null)

      toast({
        title: "Sucesso",
        description: "Projeto atualizado com sucesso!",
      })
    } catch (err) {
      console.error("Erro ao atualizar projeto:", err)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o projeto.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Excluir projeto
  const handleDeleteProject = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Falha ao excluir projeto")
      }

      // Atualizar a lista de projetos
      setProjects(projects.filter((p) => p.id !== id))

      toast({
        title: "Sucesso",
        description: "Projeto excluído com sucesso!",
      })
    } catch (err) {
      console.error("Erro ao excluir projeto:", err)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o projeto.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Projetos</CardTitle>
        <CardDescription>Adicione, edite ou remova projetos</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Lista de projetos */}
            <div className="rounded-md border mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagem</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Ordem</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div className="w-16 h-12 bg-muted rounded overflow-hidden">
                            <img
                              src={project.image || "/placeholder.svg"}
                              alt={project.title.pt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{project.title.pt}</p>
                            <p className="text-sm text-muted-foreground">{project.title.en}</p>
                          </div>
                        </TableCell>
                        <TableCell>{project.order}</TableCell>
                        <TableCell>
                          {project.active ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Ativo
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Inativo
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditProject(project)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Excluir</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        Nenhum projeto encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Formulário para adicionar/editar projeto */}
            <div className="space-y-4 border rounded-md p-4">
              <h3 className="text-lg font-medium">{editingProject ? "Editar Projeto" : "Adicionar Novo Projeto"}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title-pt">Título (Português)</Label>
                  <Input
                    id="title-pt"
                    value={editingProject ? editingProject.title.pt : newProject.title.pt}
                    onChange={(e) => {
                      if (editingProject) {
                        setEditingProject({
                          ...editingProject,
                          title: { ...editingProject.title, pt: e.target.value },
                        })
                      } else {
                        setNewProject({
                          ...newProject,
                          title: { ...newProject.title, pt: e.target.value },
                        })
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title-en">Título (Inglês)</Label>
                  <Input
                    id="title-en"
                    value={editingProject ? editingProject.title.en : newProject.title.en}
                    onChange={(e) => {
                      if (editingProject) {
                        setEditingProject({
                          ...editingProject,
                          title: { ...editingProject.title, en: e.target.value },
                        })
                      } else {
                        setNewProject({
                          ...newProject,
                          title: { ...newProject.title, en: e.target.value },
                        })
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description-pt">Descrição (Português)</Label>
                <Textarea
                  id="description-pt"
                  rows={3}
                  value={editingProject ? editingProject.description.pt : newProject.description.pt}
                  onChange={(e) => {
                    if (editingProject) {
                      setEditingProject({
                        ...editingProject,
                        description: { ...editingProject.description, pt: e.target.value },
                      })
                    } else {
                      setNewProject({
                        ...newProject,
                        description: { ...newProject.description, pt: e.target.value },
                      })
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description-en">Descrição (Inglês)</Label>
                <Textarea
                  id="description-en"
                  rows={3}
                  value={editingProject ? editingProject.description.en : newProject.description.en}
                  onChange={(e) => {
                    if (editingProject) {
                      setEditingProject({
                        ...editingProject,
                        description: { ...editingProject.description, en: e.target.value },
                      })
                    } else {
                      setNewProject({
                        ...newProject,
                        description: { ...newProject.description, en: e.target.value },
                      })
                    }
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={editingProject ? editingProject.image : newProject.image}
                    onChange={(e) => {
                      if (editingProject) {
                        setEditingProject({ ...editingProject, image: e.target.value })
                      } else {
                        setNewProject({ ...newProject, image: e.target.value })
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    type="number"
                    value={editingProject ? editingProject.order : newProject.order}
                    onChange={(e) => {
                      if (editingProject) {
                        setEditingProject({ ...editingProject, order: Number(e.target.value) })
                      } else {
                        setNewProject({ ...newProject, order: Number(e.target.value) })
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="active"
                  checked={editingProject ? editingProject.active : newProject.active}
                  onCheckedChange={(checked) => {
                    if (editingProject) {
                      setEditingProject({ ...editingProject, active: checked })
                    } else {
                      setNewProject({ ...newProject, active: checked })
                    }
                  }}
                />
                <Label htmlFor="active">Ativo</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                {editingProject && (
                  <Button variant="outline" onClick={() => setEditingProject(null)}>
                    Cancelar
                  </Button>
                )}

                <Button onClick={editingProject ? handleSaveEdit : handleAddProject} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      {editingProject ? "Salvando..." : "Adicionando..."}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingProject ? "Salvar Alterações" : "Adicionar Projeto"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// Atualize o componente ContentManager para incluir o ProjectsManager
export function ContentManager() {
  return (
    <Tabs defaultValue="testimonials" className="space-y-4">
      <TabsList>
        <TabsTrigger value="testimonials" className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-2" />
          Testemunhos
        </TabsTrigger>
        <TabsTrigger value="projects" className="flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          Projetos
        </TabsTrigger>
        <TabsTrigger value="services" className="flex items-center">
          <Code className="h-4 w-4 mr-2" />
          Serviços
        </TabsTrigger>
        <TabsTrigger value="about" className="flex items-center">
          <ImageIcon className="h-4 w-4 mr-2" />
          Sobre
        </TabsTrigger>
      </TabsList>

      <TabsContent value="testimonials">
        <TestimonialsManager />
      </TabsContent>

      <TabsContent value="projects">
        <ProjectsManager />
      </TabsContent>

      <TabsContent value="services">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Serviços</CardTitle>
            <CardDescription>Adicione, edite ou remova serviços</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-12 text-muted-foreground">
              Implementação do gerenciador de serviços em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="about">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Informações Sobre a Empresa</CardTitle>
            <CardDescription>Edite as informações sobre a empresa</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-12 text-muted-foreground">
              Implementação do gerenciador de informações sobre a empresa em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
