import { z } from "zod";

function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, "");
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cleaned.charAt(i), 10) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cleaned.charAt(i), 10) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(10), 10)) return false;

  return true;
}

function isValidCNPJ(cnpj: string): boolean {
  const cleaned = cnpj.replace(/\D/g, "");
  if (cleaned.length !== 14) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseInt(cleaned.charAt(i), 10) * weights1[i];
  let remainder = sum % 11;
  remainder = remainder < 2 ? 0 : 11 - remainder;
  if (remainder !== parseInt(cleaned.charAt(12), 10)) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) sum += parseInt(cleaned.charAt(i), 10) * weights2[i];
  remainder = sum % 11;
  remainder = remainder < 2 ? 0 : 11 - remainder;
  if (remainder !== parseInt(cleaned.charAt(13), 10)) return false;

  return true;
}

const cpfCnpjSchema = z
  .string()
  .transform((val) => val.replace(/\D/g, ""))
  .refine(
    (val) => val.length === 11 || val.length === 14,
    "CPF deve ter 11 digitos ou CNPJ deve ter 14 digitos"
  )
  .refine(
    (val) => (val.length === 11 ? isValidCPF(val) : isValidCNPJ(val)),
    "CPF/CNPJ invalido"
  );

const companyTypeSchema = z.enum(["MEI", "LIMITED", "INDIVIDUAL", "ASSOCIATION"], {
  errorMap: () => ({ message: "Tipo de empresa invalido" }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(100, "Nome deve ter no maximo 100 caracteres")
      .trim(),
    email: z
      .string()
      .email("Email invalido")
      .max(255, "Email deve ter no maximo 255 caracteres")
      .toLowerCase()
      .trim(),
    cpfCnpj: cpfCnpjSchema,
    phone: z
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .refine(
        (val) => val.length === 10 || val.length === 11,
        "Telefone deve ter 10 ou 11 digitos"
      ),
    birthDate: z
      .string()
      .optional()
      .refine((val) => !val || !Number.isNaN(Date.parse(val)), "Data de nascimento invalida"),
    companyType: companyTypeSchema.optional(),
    incomeValue: z.coerce
      .number()
      .positive("Renda mensal deve ser maior que zero")
      .max(999999999, "Renda mensal muito alta"),
    address: z
      .string()
      .min(3, "Endereco deve ter pelo menos 3 caracteres")
      .max(255, "Endereco deve ter no maximo 255 caracteres")
      .trim(),
    addressNumber: z
      .string()
      .min(1, "Numero do endereco e obrigatorio")
      .max(20, "Numero do endereco deve ter no maximo 20 caracteres")
      .trim(),
    province: z
      .string()
      .min(2, "Bairro deve ter pelo menos 2 caracteres")
      .max(100, "Bairro deve ter no maximo 100 caracteres")
      .trim(),
    postalCode: z
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .refine((val) => val.length === 8, "CEP deve ter 8 digitos"),
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .max(128, "Senha deve ter no maximo 128 caracteres")
      .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiuscula")
      .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minuscula")
      .regex(/[0-9]/, "Senha deve conter pelo menos um numero")
      .regex(/[^A-Za-z0-9]/, "Senha deve conter pelo menos um caractere especial"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Senhas nao conferem",
        path: ["confirmPassword"],
      });
    }

    if (data.cpfCnpj.length === 11 && !data.birthDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Data de nascimento e obrigatoria para cadastro com CPF",
        path: ["birthDate"],
      });
    }

    if (data.cpfCnpj.length === 14 && !data.companyType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tipo de empresa e obrigatorio para cadastro com CNPJ",
        path: ["companyType"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email("Email invalido").toLowerCase().trim(),
  password: z.string().min(1, "Senha e obrigatoria"),
});

export const pixTransferSchema = z.object({
  pixKey: z.string().min(1, "Chave PIX e obrigatoria").max(100),
  pixKeyType: z.enum(["CPF", "CNPJ", "EMAIL", "PHONE", "EVP"], {
    errorMap: () => ({ message: "Tipo de chave PIX invalido" }),
  }),
  amount: z
    .number()
    .positive("Valor deve ser positivo")
    .min(0.01, "Valor minimo e R$ 0,01")
    .max(1000000, "Valor maximo e R$ 1.000.000,00"),
  description: z.string().max(200).optional(),
});

export const boletoSchema = z.object({
  customerName: z.string().min(3, "Nome do pagador e obrigatorio"),
  customerCpfCnpj: cpfCnpjSchema,
  amount: z.number().positive("Valor deve ser positivo").min(5, "Valor minimo e R$ 5,00"),
  dueDate: z.string().refine((val) => {
    const date = new Date(val);
    return date > new Date();
  }, "Data de vencimento deve ser futura"),
  description: z.string().max(200).optional(),
});

export const transferSchema = z.object({
  pixKey: z.string().min(1, "Chave PIX e obrigatoria"),
  pixKeyType: z.enum(["CPF", "CNPJ", "EMAIL", "PHONE", "EVP"]),
  amount: z.number().positive("Valor deve ser positivo").min(0.01, "Valor minimo e R$ 0,01"),
  description: z.string().max(200).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PixTransferInput = z.infer<typeof pixTransferSchema>;
export type BoletoInput = z.infer<typeof boletoSchema>;
export type TransferInput = z.infer<typeof transferSchema>;
