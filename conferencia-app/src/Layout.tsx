
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export default function Layout({ children, currentPageName }) {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [showAdminDialog, setShowAdminDialog] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const userData = localStorage.getItem('adminAuth');
      if (userData && userData === 'true') {
        setIsAdmin(true);
      }
    } catch (e) {
      setIsAdmin(false);
    }
  };

  const handleAdminLogin = async () => {
    setIsLoading(true);
    try {
      if (password === "conferencia2025") {
        localStorage.setItem('adminAuth', 'true');
        setIsAdmin(true);
        setShowAdminDialog(false);
        window.location.href = createPageUrl("Admin");
      } else {
        toast({
          variant: "destructive",
          title: "Senha incorreta",
          description: "Por favor, tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Por favor, tente novamente.",
      });
    }
    setIsLoading(false);
    setPassword("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdminLogin();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --primary: #00a0df;
          --secondary: #ffd700;
          --text: #333333;
        }
      `}</style>

      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to={createPageUrl("Register")}>
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/cf4b5f_Designsemnome3.png"
                alt="Logo"
                className="h-20 object-contain"
              />
            </Link>

            {isAdmin ? (
              <Link
                to={createPageUrl("Admin")}
                className="inline-flex items-center px-4 py-2 text-primary hover:text-primary/80"
              >
                <Users className="w-5 h-5 mr-2" />
                Área Administrativa
              </Link>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setShowAdminDialog(true)}
                className="text-primary hover:text-primary/80"
              >
                <Users className="w-5 h-5 mr-2" />
                Acesso Administrativo
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-50 border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          © 2025 Secretaria Municipal de Saúde / Conselho Municipal de Saúde
        </div>
      </footer>

      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Acesso Administrativo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
            </div>
            <Button
              className="w-full bg-[#00a0df] hover:bg-[#0089bd]"
              onClick={handleAdminLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                "Entrar"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
