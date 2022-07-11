import { getStateFromLocalStorage } from "./store";

const API_BASE_URL = "https://api.gildedernacht.ch";
const PROJECT_ID =
  "e04acdcb28a0fc4befb725f1301b2a43d99372dc9892b21ae52e076b69013b56";

export function register(name: string, email: string): Promise<Response> {
  return fetch(API_BASE_URL + "/resources/" + PROJECT_ID + "/register", {
    method: "POST",
    body: JSON.stringify({
      privateBody: {
        name: name,
        email: email,
      },
      publicBody: { sendDiscordMsg: true, sendMailOnlyToUs: true },
    }),
  });
}

export function loadServerData(secret: string): Promise<Response> {
  return fetch(
    API_BASE_URL + "/resources/" + PROJECT_ID + "/registration/" + secret
  );
}

export function getSecretQuery(secret: string, isFirstQuery = true): string {
  if (secret.trim().length > 0) {
    return (isFirstQuery ? "?" : "&") + "secret=" + secret.trim();
  }
  return "";
}

export function saveToServer(secret: string, sendConfirmation = false) {
  return getStateFromLocalStorage().then((data) => {
    return fetch(
      API_BASE_URL + "/resources/" + PROJECT_ID + "/registration/" + secret,
      {
        method: "POST",
        body: JSON.stringify({
          privateBody: {
            ...data,
          },
          publicBody: {
            sendDiscordMsg: true,
            sendMailToApplicant: sendConfirmation,
          },
        }),
      }
    );
  });
}
