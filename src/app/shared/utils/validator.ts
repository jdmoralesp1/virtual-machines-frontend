export function getFirstInvalidParamMessage(invalidParams: { [key: string]: string[] }): string | null {
  for (const key in invalidParams) {
    if (invalidParams.hasOwnProperty(key) && invalidParams[key].length > 0) {
      return invalidParams[key][0]; // Devuelve el primer mensaje encontrado
    }
  }
  return null; // Si no hay mensajes, devuelve null
}
