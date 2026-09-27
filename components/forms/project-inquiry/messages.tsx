"use client";

import { createContext, useContext, type ReactNode } from "react";
import { format, type Content } from "@/lib/i18n";
import { MAX_FILES } from "@/lib/project-inquiry/upload";

type ValidationMessages = Content["inquiry"]["validation"];

const MessagesContext = createContext<ValidationMessages | null>(null);

/** Provides the locale's validation texts to every field in the questionnaire. */
export function ValidationMessagesProvider({
  messages,
  children,
}: {
  messages: ValidationMessages;
  children: ReactNode;
}) {
  return <MessagesContext.Provider value={messages}>{children}</MessagesContext.Provider>;
}

/** Translates a schema message key ("email", "consent", ...) into readable text. */
export function useValidationMessage() {
  const messages = useContext(MessagesContext);
  return (key?: string) => {
    if (!key) return undefined;
    const text = messages?.[key as keyof ValidationMessages];
    return typeof text === "string" ? format(text, { max: MAX_FILES }) : key;
  };
}

export function useValidationMessages() {
  return useContext(MessagesContext);
}
