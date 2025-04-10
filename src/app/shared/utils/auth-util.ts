import { createAlert } from "./alert";

export function isAdministrator(): boolean {
  let role: string | null = sessionStorage.getItem('role') || null;

  return role?.toLocaleLowerCase() === 'administrator';
}

export function isLoggedIn(): boolean {
  let token: string | null = sessionStorage.getItem('authToken') || null;

  if (token === null) {
    createAlert('error', 'Error - Acceso No Autorizado', 'Debe iniciar sesión.');
  }

  return token !== null;
}
