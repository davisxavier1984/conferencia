import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function Register() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você receberá um email de confirmação em breve.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao realizar inscrição",
        description: "Por favor, tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Conferência Municipal de Saúde
        </h1>
        <p className="text-gray-600 mb-8">
          Faça sua inscrição para participar da conferência
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome completo *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefone *
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
              Instituição/Organização
            </label>
            <Input
              id="organization"
              name="organization"
              type="text"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Nome da instituição ou organização"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00a0df] hover:bg-[#0089bd]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Enviando...
              </div>
            ) : (
              'Realizar Inscrição'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
