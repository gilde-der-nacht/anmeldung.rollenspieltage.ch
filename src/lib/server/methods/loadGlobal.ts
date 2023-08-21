import { OLYMP } from "$lib/Constants";
import type NumberInput from "$lib/components/form/NumberInput.svelte";
import { serverDataSchema, type ServerData } from "$lib/shared/schema/server.types";
import { z } from "zod";

export async function loadGlobal(): Promise<ServerData | null> {
  const base = OLYMP + '/items/global_23';
  const url = new URL(base);

  const res = await fetch(url);
  if (!res.ok) {
    return null;
  }
  const json = await res.json();
  const parsed = z.object({
    data: z.object({
      program: serverDataSchema
    })
  }).safeParse(json);

  if (!parsed.success) {
    return null;
  }
  return parsed.data.data.program;
}