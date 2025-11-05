import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Download } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = React.useState({
    nome: "",
    email: "",
    telefone: "",
    instituicao: "",
    tipoInscricao: "",
    segmento: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [accessCode, setAccessCode] = React.useState("");
  const [certificateCode, setCertificateCode] = React.useState("");
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateAccessCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const validateForm = () => {
    if (!formData.nome.trim()) {
      toast({
        variant: "destructive",
        title: "Campo obrigatório",
        description: "Por favor, preencha o seu nome.",
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        variant: "destructive",
        title: "Campo obrigatório",
        description: "Por favor, preencha o seu email.",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Email inválido",
        description: "Por favor, digite um email válido.",
      });
      return false;
    }

    if (!formData.telefone.trim()) {
      toast({
        variant: "destructive",
        title: "Campo obrigatório",
        description: "Por favor, preencha o seu telefone.",
      });
      return false;
    }

    if (!formData.tipoInscricao) {
      toast({
        variant: "destructive",
        title: "Campo obrigatório",
        description: "Por favor, selecione o tipo de inscrição.",
      });
      return false;
    }

    if (formData.tipoInscricao === "Delegado" && !formData.segmento) {
      toast({
        variant: "destructive",
        title: "Campo obrigatório",
        description: "Por favor, selecione o segmento que você representa.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular salvamento da inscrição
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const code = generateAccessCode();
      setAccessCode(code);

      toast({
        title: "Inscrição realizada!",
        description: "Sua inscrição foi registrada com sucesso.",
      });

      setShowSuccess(true);

      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        instituicao: "",
        tipoInscricao: "",
        segmento: "",
      });
    } catch (error) {
      console.error("Erro ao realizar inscrição:", error);
      toast({
        variant: "destructive",
        title: "Erro ao realizar inscrição",
        description: "Por favor, tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchCertificate = () => {
    if (!certificateCode.trim()) {
      toast({
        variant: "destructive",
        title: "Campo obrigatório",
        description: "Por favor, digite o código de acesso.",
      });
      return;
    }

    toast({
      title: "Certificado não encontrado",
      description: "Verifique o código e tente novamente.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          I Conferência Municipal de Saúde do Trabalhador e da Trabalhadora
        </h1>
        <p className="text-gray-600">
          Realize sua inscrição ou consulte seu certificado
        </p>
      </div>

      <Tabs defaultValue="inscricao" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inscricao">Inscrição</TabsTrigger>
          <TabsTrigger value="certificado">Certificado</TabsTrigger>
        </TabsList>

        <TabsContent value="inscricao">
          <Card>
            <CardHeader>
              <CardTitle>Formulário de Inscrição</CardTitle>
              <CardDescription>
                Preencha seus dados para participar da conferência
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Telefone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Instituição
                  </label>
                  <Input
                    type="text"
                    placeholder="Nome da instituição (opcional)"
                    value={formData.instituicao}
                    onChange={(e) => handleInputChange("instituicao", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Tipo de Inscrição <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.tipoInscricao}
                    onValueChange={(value) => handleInputChange("tipoInscricao", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Delegado">Delegado</SelectItem>
                      <SelectItem value="Observador">Observador</SelectItem>
                      <SelectItem value="Convidado">Convidado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.tipoInscricao === "Delegado" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Segmento que Representa <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.segmento}
                      onValueChange={(value) => handleInputChange("segmento", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o segmento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Usuário">Usuário</SelectItem>
                        <SelectItem value="Gestor/Prestador">Gestor/Prestador</SelectItem>
                        <SelectItem value="Trabalhador">Trabalhador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#00a0df] hover:bg-[#0089bd]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>Processando...</span>
                    </div>
                  ) : (
                    "Realizar Inscrição"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificado">
          <Card>
            <CardHeader>
              <CardTitle>Consultar Certificado</CardTitle>
              <CardDescription>
                Digite seu código de acesso para buscar e baixar seu certificado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Código de Acesso
                  </label>
                  <Input
                    type="text"
                    placeholder="Digite seu código"
                    value={certificateCode}
                    onChange={(e) => setCertificateCode(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleSearchCertificate}
                  className="w-full bg-[#00a0df] hover:bg-[#0089bd]"
                >
                  Buscar Certificado
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <DialogTitle className="text-center text-2xl">
              Inscrição Realizada!
            </DialogTitle>
            <DialogDescription className="text-center">
              Sua inscrição foi registrada com sucesso
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">Seu código de acesso:</p>
              <p className="text-2xl font-bold text-[#00a0df]">{accessCode}</p>
              <p className="text-xs text-gray-500 mt-2">
                Guarde este código para consultar seu certificado
              </p>
            </div>

            <Button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-[#00a0df] hover:bg-[#0089bd]"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
