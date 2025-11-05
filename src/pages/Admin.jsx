import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const checkAdmin = () => {
      const adminAuth = localStorage.getItem('adminAuth');
      if (adminAuth !== 'true') {
        navigate('/');
      } else {
        setIsAdmin(true);
      }
    };
    checkAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center">
              <Users className="w-8 h-8 mr-3" />
              Área Administrativa
            </h1>
            <p className="text-gray-600">
              Gerencie as inscrições da conferência
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Sair
          </Button>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Inscrições Recentes</h2>
            <p className="text-gray-500 text-center py-8">
              Nenhuma inscrição registrada ainda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Total de Inscrições
              </h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Confirmadas
              </h3>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Pendentes
              </h3>
              <p className="text-3xl font-bold text-yellow-600">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
