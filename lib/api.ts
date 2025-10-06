// lib/api.ts
export async function submitCarShipping(
  payload: any,
  intent: "wait-24-hours" | "book-now" | string
) {
  // Adjust endpoint and payload shape to match your backend.
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submit-car-booking`;
  const body = { ...payload, intent };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Submission failed");
  }
  return res.json();
}
