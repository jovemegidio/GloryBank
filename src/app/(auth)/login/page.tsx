"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Wallet } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error(result.error || "Erro ao fazer login");
        return;
      }

      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = () => {
    onSubmit({ email: "demo@glorybank.com", password: "Demo@123456" });
  };

  return (
    <>
      <Toaster position="top-right" />
      <div>
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(124,58,237,0.1)" }}>
            <Wallet className="h-5 w-5 text-violet-400" />
          </div>
          <span className="text-xl font-bold text-white">
            Glory<span className="text-amber-400">Bank</span>
          </span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            Entrar na sua conta
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Acesse sua conta para gerenciar suas finanças
          </p>
        </div>

        {/* Demo credentials banner */}
        <div
          className="mb-6 rounded-xl p-4"
          style={{
            background: "rgba(124,58,237,0.07)",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-violet-400">
            🧪 Conta de Demonstração
          </p>
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs text-slate-400">
                Email:{" "}
                <span className="font-mono font-medium text-slate-200">
                  demo@glorybank.com
                </span>
              </p>
              <p className="text-xs text-slate-400">
                Senha:{" "}
                <span className="font-mono font-medium text-slate-200">
                  Demo@123456
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={loginAsDemo}
              disabled={isLoading}
              className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ background: "#7C3AED" }}
            >
              Entrar como Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            icon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
            size="lg"
          >
            Entrar
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Não tem uma conta?{" "}
          <Link
            href="/register"
            className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </>
  );
}
