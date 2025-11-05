import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download, Trash2, Users } from "lucide-react";

export default function Admin() {
  const router = useRouter();
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = () => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login como administrador.",
      });
      router.push('/');
      return;
    }
    setIsAdmin(true);
    loadRegistrations();
  };

  const loadRegistrations = () => {
    const data = JSON.parse(localStorage.getItem('registrations') || '[]');
    setRegistrations(data);
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir esta inscrição?')) {
      const updated = registrations.filter(reg => reg.id !== id);
      localStorage.setItem('registrations', JSON.stringify(updated));
      setRegistrations(updated);
      toast({
        title: "Inscrição excluída",
        description: "A inscrição foi removida com sucesso.",
      });
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Nome', 'E-mail', 'Telefone', 'CPF', 'Município', 'Segmento', 'Data de Inscrição'],
      ...registrations.map(reg => [
        reg.name,
        reg.email,
        reg.phone || '',
        reg.cpf,
        reg.municipio || '',
        reg.segmento || '',
        new Date(reg.createdAt).toLocaleDateString('pt-BR')
      ])
    ].map(row => row.join(';')).join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `inscricoes_conferencia_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({
      title: "Exportação realizada",
      description: "As inscrições foram exportadas com sucesso.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    router.push('/');
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout currentPageName="Admin">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-[#00a0df]" />
                <CardTitle className="text-3xl text-[#00a0df]">
                  Área Administrativa
                </CardTitle>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleExport}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={registrations.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar CSV
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                >
                  Sair
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-lg font-semibold">
                Total de inscrições: {registrations.length}
              </p>
            </div>

            {registrations.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl">Nenhuma inscrição realizada ainda.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="p-3 text-left">Nome</th>
                      <th className="p-3 text-left">E-mail</th>
                      <th className="p-3 text-left">Telefone</th>
                      <th className="p-3 text-left">CPF</th>
                      <th className="p-3 text-left">Município</th>
                      <th className="p-3 text-left">Segmento</th>
                      <th className="p-3 text-left">Data</th>
                      <th className="p-3 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg) => (
                      <tr key={reg.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{reg.name}</td>
                        <td className="p-3">{reg.email}</td>
                        <td className="p-3">{reg.phone || '-'}</td>
                        <td className="p-3">{reg.cpf}</td>
                        <td className="p-3">{reg.municipio || '-'}</td>
                        <td className="p-3 capitalize">{reg.segmento || '-'}</td>
                        <td className="p-3">
                          {new Date(reg.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-3 text-center">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(reg.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
