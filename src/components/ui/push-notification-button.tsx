"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PushNotificationButton() {
  const [status, setStatus] = useState<"idle" | "subscribed" | "denied" | "unsupported">("idle");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }
    if (Notification.permission === "denied") {
      setStatus("denied");
      return;
    }
    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then((sub) => {
        setStatus(sub ? "subscribed" : "idle");
      });
    });
  }, []);

  const subscribe = async () => {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });
      await fetch("/api/notifications/web-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: sub.toJSON() }),
      });
      setStatus("subscribed");
    } catch {
      if (Notification.permission === "denied") setStatus("denied");
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) await sub.unsubscribe();
      await fetch("/api/notifications/web-push", { method: "DELETE" });
      setStatus("idle");
    } finally {
      setLoading(false);
    }
  };

  if (status === "unsupported") return null;

  if (status === "subscribed") {
    return (
      <Button variant="ghost" size="sm" onClick={unsubscribe} disabled={loading} className="gap-2 text-slate-500">
        <BellOff className="h-4 w-4" />
        <span className="hidden sm:inline">Notificações ativas</span>
      </Button>
    );
  }

  if (status === "denied") return null;

  return (
    <Button variant="ghost" size="sm" onClick={subscribe} disabled={loading} className="gap-2 text-slate-500 hover:text-slate-800">
      <Bell className="h-4 w-4" />
      <span className="hidden sm:inline">Ativar notificações</span>
    </Button>
  );
}
