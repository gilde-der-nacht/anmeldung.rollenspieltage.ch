import { loadAllProgram } from "$lib/server/methods/loadAllProgram";
import { error, json } from "@sveltejs/kit";

export async function GET() {
  const response = await loadAllProgram();
  if (!response.success) {
    throw error(400, 'Problem while computing and loading the data.');
  }
  return json(response.data);
}