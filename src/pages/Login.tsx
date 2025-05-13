import React, { useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Tentando login com:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erro de login:", error);
        throw error;
      }

      if (data && data.user) {
        console.log("Login bem-sucedido. Dados do usuário:", data.user);
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vinda ao painel administrativo",
        });
        window.location.href = '/admin';
      }
    } catch (error: any) {
      console.error('Erro detalhado ao fazer login:', error);
      toast({
        title: "Erro ao fazer login",
        description: "Verifique seu email e senha",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Função para verificar se o usuário já está autenticado
  React.useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Sessão atual:", data);
      if (data.session) {
        window.location.href = '/admin';
      }
    };
    
    checkSession();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-sm border border-architect-beige/30">
          <div className="text-center">
            <h2 className="text-2xl font-display font-medium text-architect-dark">Área da Arquiteta</h2>
            <p className="mt-2 text-architect-dark/70">Faça login para acessar o painel administrativo</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pr-10"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-architect-accent hover:bg-architect-accent/90"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login; 