import { Router } from "@angular/router";
import { ResponseErrorValidation } from "../../vms/interfaces/response-error-validation";
import { createAlert } from "./alert";
import { getFirstInvalidParamMessage } from "./validator";

export function errorHandler(error: any, router: Router): void{
  const responseError = error.error as ResponseErrorValidation;
  if(error.status === 401) {
    createAlert('error', 'Error', 'Sesión expirada. Por favor, inicia sesión nuevamente.');

    sessionStorage.clear();
    router.navigate(['/auth/login']);
  }

  let errorMessage: string | null = null;

  if(error.status === 422){
    if(responseError.InvalidParams !== undefined ) {
      errorMessage = getFirstInvalidParamMessage(responseError.InvalidParams);
    }
  }

  createAlert('error', 'Error', errorMessage || 'Ocurrió un error inesperado, intente nuevamente.');
}
