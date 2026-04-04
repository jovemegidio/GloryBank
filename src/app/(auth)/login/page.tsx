"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Landmark } from "lucide-react";
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
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, #5B21B6, #7C3AED)",
              boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
            }}
          >
            <Landmark className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <span className="text-xl font-bold text-white">
            Glory<span className="text-amber-400">Bank</span>
          </span>
        </div>

        <div className="mb-7">
          <h2 className="text-[1.6rem] font-bold tracking-tight text-white">
            Acesse sua conta
          </h2>
          <p className="mt-1.5 text-[13px] text-slate-500">
            Internet Banking — GloryBank
          </p>
        </div>

        {/* Demo credentials banner */}
        <div
          className="mb-6 rounded-xl p-4"
          style={{
            background: "rgba(124,58,237,0.06)",
            border: "1px solid rgba(124,58,237,0.18)",
          }}
        >
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-violet-400">
            Conta de Demonstração
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-[12px] text-slate-400">
                <span className="text-slate-500">Login: </span>
                <span className="font-mono font-medium text-slate-200">demo@glorybank.com</span>
              </p>
              <p className="text-[12px] text-slate-400">
                <span className="text-slate-500">Senha: </span>
                <span className="font-mono font-medium text-slate-200">Demo@123456</span>
              </p>
            </div>
            <button
              type="button"
              onClick={loginAsDemo}
              disabled={isLoading}
              className="shrink-0 rounded-lg px-4 py-2 text-[12px] font-semibold text-white transition-all hover:opacity-85 disabled:opacity-50 active:scale-95"
              style={{ background: "linear-gradient(135deg, #5B21B6, #7C3AED)" }}
            >
              Entrar como Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            icon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
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
            Entrar na conta
          </Button>
        </form>

        <p className="mt-6 text-center text-[13px] text-slate-500">
          Ainda não tem conta?{" "}
          <Link
            href="/register"
            className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
          >
            Criar conta grátis
          </Link>
        </p>
      </div>
    </>
  );
}
