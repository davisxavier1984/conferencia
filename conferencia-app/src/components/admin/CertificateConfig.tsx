
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { UploadFile } from "@/integrations/Core";
import { CertificateTemplate } from "@/entities/CertificateTemplate";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Image, Move, Upload, Save, Check, Type } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CertificateConfig() {
  const [template, setTemplate] = useState(null);
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [previewText, setPreviewText] = useState("Nome do Participante");
  const [previewType, setPreviewType] = useState("Delegado");
  const [isDragging, setIsDragging] = useState(false);
  const [currentElement, setCurrentElement] = useState("name"); // "name" ou "type"
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [typePosition, setTypePosition] = useState({ x: 50, y: 60 });
  const [fontSize, setFontSize] = useState(24);
  const [typeFontSize, setTypeFontSize] = useState(18);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("nome");
  const containerRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    loadTemplate();
  }, []);

  const loadTemplate = async () => {
    try {
      const templates = await CertificateTemplate.list();
      const activeTemplate = templates.find(t => t.is_active);
      if (activeTemplate) {
        setTemplate(activeTemplate);
        setBackgroundUrl(activeTemplate.background_url);
        setPosition(activeTemplate.name_position);
        setFontSize(activeTemplate.name_position.fontSize);

        if (activeTemplate.type_position) {
          setTypePosition(activeTemplate.type_position);
          setTypeFontSize(activeTemplate.type_position.fontSize);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar template:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar template",
        description: "Não foi possível carregar o template existente.",
      });
    }
    setIsLoading(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { file_url } = await UploadFile({ file });
      setBackgroundUrl(file_url);
      toast({
        title: "Imagem carregada com sucesso",
        description: "Agora posicione o texto do nome conforme desejado.",
        className: "bg-green-50 border-green-200",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar imagem",
        description: "Por favor, tente novamente.",
      });
    }
  };

  const handleMouseDown = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (currentElement === "name") {
      setPosition({ x, y });
    } else {
      setTypePosition({ x, y });
    }
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (currentElement === "name") {
      setPosition({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y))
      });
    } else {
      setTypePosition({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const saveTemplate = async () => {
    if (!backgroundUrl) {
      toast({
        variant: "destructive",
        title: "Imagem não selecionada",
        description: "Por favor, carregue uma imagem para o certificado.",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Desativar templates anteriores
      const templates = await CertificateTemplate.list();
      for (const temp of templates) {
        if (temp.is_active) {
          await CertificateTemplate.update(temp.id, { is_active: false });
        }
      }

      // Criar novo template
      const newTemplate = await CertificateTemplate.create({
        background_url: backgroundUrl,
        name_position: {
          x: position.x,
          y: position.y,
          fontSize: fontSize
        },
        type_position: {
          x: typePosition.x,
          y: typePosition.y,
          fontSize: typeFontSize
        },
        is_active: true
      });

      setTemplate(newTemplate);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      toast({
        title: "Template salvo com sucesso",
        description: "O novo modelo de certificado foi configurado.",
        className: "bg-green-50 border-green-200",
      });
    } catch (error) {
      console.error("Erro ao salvar template:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar template",
        description: "Por favor, tente novamente.",
      });
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
          <Image className="w-5 h-5 text-blue-500" />
          Configuração do Certificado
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {showSuccess && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <Check className="w-4 h-4" />
            <AlertDescription>
              Template salvo com sucesso!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="w-full border-blue-200 hover:bg-blue-50"
              onClick={() => document.getElementById("backgroundUpload").click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {backgroundUrl ? "Trocar Imagem" : "Carregar Imagem"}
            </Button>
            {backgroundUrl && (
              <Button
                onClick={saveTemplate}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Template
                  </>
                )}
              </Button>
            )}
          </div>
          <input
            id="backgroundUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {backgroundUrl && (
          <>
            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value);
              setCurrentElement(value === "nome" ? "name" : "type");
            }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="nome">Nome do Participante</TabsTrigger>
                <TabsTrigger value="tipo">Tipo de Inscrição</TabsTrigger>
              </TabsList>

              <TabsContent value="nome">
                <div className="space-y-4 mt-4">
                  <Label>Texto de Exemplo (Nome)</Label>
                  <Input
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    placeholder="Digite um texto para testar o posicionamento"
                    className="border-blue-200"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Tamanho da Fonte (Nome)</Label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    min={12}
                    max={72}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-500 text-center">
                    {fontSize}px
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tipo">
                <div className="space-y-4 mt-4">
                  <Label>Texto de Exemplo (Tipo)</Label>
                  <Input
                    value={previewType}
                    onChange={(e) => setPreviewType(e.target.value)}
                    placeholder="Tipo de inscrição"
                    className="border-blue-200"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Tamanho da Fonte (Tipo)</Label>
                  <Slider
                    value={[typeFontSize]}
                    onValueChange={(value) => setTypeFontSize(value[0])}
                    min={12}
                    max={72}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-500 text-center">
                    {typeFontSize}px
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div
              ref={containerRef}
              className="relative border rounded-lg overflow-hidden cursor-pointer mt-6"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={backgroundUrl}
                alt="Template do Certificado"
                className="w-full h-auto"
              />
              <div
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 text-center ${currentElement === "name" ? "ring-2 ring-blue-500" : ""}`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  fontSize: `${fontSize}px`,
                  cursor: "move",
                  userSelect: "none",
                  color: "#000",
                  textShadow: "1px 1px 2px rgba(255,255,255,0.5)"
                }}
              >
                {currentElement === "name" && <Move className="w-6 h-6 mb-2 mx-auto text-blue-500" />}
                {previewText}
              </div>

              <div
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 text-center ${currentElement === "type" ? "ring-2 ring-blue-500" : ""}`}
                style={{
                  left: `${typePosition.x}%`,
                  top: `${typePosition.y}%`,
                  fontSize: `${typeFontSize}px`,
                  cursor: "move",
                  userSelect: "none",
                  color: "#000",
                  textShadow: "1px 1px 2px rgba(255,255,255,0.5)"
                }}
              >
                {currentElement === "type" && <Move className="w-6 h-6 mb-2 mx-auto text-blue-500" />}
                {previewType}
              </div>
            </div>

            <div className="text-sm text-gray-500 text-center mt-4">
              Clique e arraste o texto selecionado para posicioná-lo no certificado
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
