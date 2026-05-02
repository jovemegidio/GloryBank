"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Lock,
  User,
  Phone,
  CreditCard,
  Wallet,
  CalendarDays,
  MapPin,
  Building2,
  Home,
  Landmark,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { AsaasBadge } from "@/components/ui/asaas-badge";

const companyTypeOptions = [
  { value: "MEI", label: "MEI" },
  { value: "LIMITED", label: "LTDA / Empresarial" },
  { value: "INDIVIDUAL", label: "Empresario Individual" },
  { value: "ASSOCIATION", label: "Associacao" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyType: "MEI",
    },
  });

  const cpfCnpj = watch("cpfCnpj") || "";
  const documentLength = cpfCnpj.replace(/\D/g, "").length;
  const isCompany = documentLength === 14;
  const isIndividual = documentLength === 11;

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        if (result.errors) {
          Object.values(result.errors)
            .flat()
            .forEach((err) => toast.error(err as string));
        } else {
          toast.error(result.error || "Erro ao criar conta");
        }
        return;
      }

      toast.success("Conta criada com sucesso!");
      router.push("/dashboard");
    } catch {
      toast.error("Erro de conexao. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div>
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: "rgba(0,166,80,0.08)" }}
          >
            <Wallet className="h-5 w-5 text-emerald-700" />
          </div>
          <span className="text-xl font-bold text-slate-800">
            Cred<span className="text-emerald-700">Business</span>
          </span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Criar sua conta</h2>
          <p className="mt-2 text-sm text-slate-500">
            Preencha os dados exigidos para abrir sua conta digital via Asaas.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nome completo"
            placeholder="Joao da Silva"
            icon={<User className="h-4 w-4" />}
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            icon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="CPF/CNPJ"
            placeholder="000.000.000-00"
            icon={<CreditCard className="h-4 w-4" />}
            error={errors.cpfCnpj?.message}
            {...register("cpfCnpj")}
          />

          <Input
            label="Telefone"
            placeholder="(11) 99999-9999"
            icon={<Phone className="h-4 w-4" />}
            error={errors.phone?.message}
            {...register("phone")}
          />

          {isIndividual && (
            <Input
              label="Data de nascimento"
              type="date"
              icon={<CalendarDays className="h-4 w-4" />}
              error={errors.birthDate?.message}
              {...register("birthDate")}
            />
          )}

          {isCompany && (
            <Select
              label="Tipo de empresa"
              options={companyTypeOptions}
              error={errors.companyType?.message}
              {...register("companyType")}
            />
          )}

          <Input
            label="Renda mensal"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="5000"
            icon={<Landmark className="h-4 w-4" />}
            error={errors.incomeValue?.message}
            {...register("incomeValue", { valueAsNumber: true })}
          />

          <Input
            label="CEP"
            placeholder="01310-100"
            icon={<MapPin className="h-4 w-4" />}
            error={errors.postalCode?.message}
            {...register("postalCode")}
          />

          <Input
            label="Endereco"
            placeholder="Av. Paulista"
            icon={<Home className="h-4 w-4" />}
            error={errors.address?.message}
            {...register("address")}
          />

          <Input
            label="Numero"
            placeholder="1000"
            icon={<Building2 className="h-4 w-4" />}
            error={errors.addressNumber?.message}
            {...register("addressNumber")}
          />

          <Input
            label="Bairro"
            placeholder="Bela Vista"
            icon={<MapPin className="h-4 w-4" />}
            error={errors.province?.message}
            {...register("province")}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Min. 8 caracteres"
            icon={<Lock className="h-4 w-4" />}
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            label="Confirmar senha"
            type="password"
            placeholder="Repita a senha"
            icon={<Lock className="h-4 w-4" />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <div className="pt-2">
            <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
              Criar conta
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Ja tem uma conta?{" "}
          <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
            Entrar
          </Link>
        </p>

        <div className="mt-6">
          <AsaasBadge variant="inline" />
        </div>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          Ao criar conta, voce concorda com os{" "}
          <Link href="/termos" className="underline hover:text-slate-600">
            Termos de Uso
          </Link>{" "}
          e a{" "}
          <Link href="/privacidade" className="underline hover:text-slate-600">
            Politica de Privacidade
          </Link>
          .
        </p>
      </div>
    </>
  );
}
