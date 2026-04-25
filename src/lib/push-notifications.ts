export async function sendExpoPushNotification(
  pushToken: string,
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<void> {
  if (!pushToken.startsWith("ExponentPushToken")) return;

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ to: pushToken, title, body, sound: "default", data }),
  }).catch(() => {});
}

export async function sendWebPushNotification(
  subscriptionJson: string,
  title: string,
  body: string
): Promise<void> {
  // Stored as JSON string in DB; no VAPID server-side sending without web-push pkg.
  // Notifications are triggered client-side via service worker on next page load.
  // This is a no-op placeholder — web push via SW handles delivery.
  void subscriptionJson; void title; void body;
}
