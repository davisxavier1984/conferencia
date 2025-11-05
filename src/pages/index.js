import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    municipio: "",
    segmento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validação básica
      if (!formData.name || !formData.email || !formData.cpf) {
        toast({
          variant: "destructive",
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
        });
        setIsLoading(false);
        return;
      }

      // Salvar no localStorage (posteriormente pode ser substituído por API)
      const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      const newRegistration = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };

      registrations.push(newRegistration);
      localStorage.setItem('registrations', JSON.stringify(registrations));

      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você será redirecionado para a página de confirmação.",
      });

      // Redirecionar para página de confirmação
      setTimeout(() => {
        router.push('/confirmation');
      }, 2000);

    } catch (error) {
      console.error("Erro ao realizar inscrição:", error);
      toast({
        variant: "destructive",
        title: "Erro ao realizar inscrição",
        description: "Por favor, tente novamente.",
      });
    }

    setIsLoading(false);
  };

  return (
    <Layout currentPageName="Register">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center text-[#00a0df]">
              Inscrição para a Conferência
            </CardTitle>
            <CardDescription className="text-center text-lg">
              VI Conferência Municipal de Saúde de São Borja
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="municipio">Município</Label>
                <Input
                  id="municipio"
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleChange}
                  placeholder="Digite seu município"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="segmento">Segmento</Label>
                <select
                  id="segmento"
                  name="segmento"
                  value={formData.segmento}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Selecione um segmento</option>
                  <option value="usuario">Usuário do SUS</option>
                  <option value="trabalhador">Trabalhador da Saúde</option>
                  <option value="gestor">Gestor</option>
                  <option value="prestador">Prestador de Serviço</option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00a0df] hover:bg-[#0089bd]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  "Realizar Inscrição"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
