export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatCPF(cpf: string): string {
  const digits = cpf.replace(/\D/g, '');
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatCNPJ(cnpj: string): string {
  const digits = cnpj.replace(/\D/g, '');
  return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
}

export function maskCPF(cpf: string): string {
  const digits = cpf.replace(/\D/g, '');
  return `***${digits.slice(3, 6)}.${digits.slice(6, 9)}-**`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}

export function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'Agora';
  if (diffMin < 60) return `${diffMin}min atrás`;
  if (diffHrs < 24) return `${diffHrs}h atrás`;
  if (diffDays < 7) return `${diffDays}d atrás`;
  return formatDate(dateStr);
}

export function getTransactionIcon(type: string): { name: string; color: string } {
  const map: Record<string, { name: string; color: string }> = {
    PIX_SENT: { name: 'arrow-up-right', color: '#EF4444' },
    PIX_RECEIVED: { name: 'arrow-down-left', color: '#22C55E' },
    BOLETO_CREATED: { name: 'file-text', color: '#3B82F6' },
    BOLETO_PAID: { name: 'check-circle', color: '#22C55E' },
    TRANSFER_SENT: { name: 'send', color: '#EF4444' },
    TRANSFER_RECEIVED: { name: 'download', color: '#22C55E' },
    DEPOSIT: { name: 'plus-circle', color: '#22C55E' },
    WITHDRAWAL: { name: 'minus-circle', color: '#EF4444' },
  };
  return map[type] || { name: 'circle', color: '#64748B' };
}

export function getStatusLabel(status: string): { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' } {
  const map: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
    PENDING: { label: 'Pendente', variant: 'warning' },
    CONFIRMED: { label: 'Confirmada', variant: 'success' },
    CANCELLED: { label: 'Cancelada', variant: 'danger' },
    FAILED: { label: 'Falhou', variant: 'danger' },
    REFUNDED: { label: 'Estornada', variant: 'info' },
  };
  return map[status] || { label: status, variant: 'default' };
}
