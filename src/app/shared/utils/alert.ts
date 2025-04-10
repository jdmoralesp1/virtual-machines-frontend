import Swal, { SweetAlertIcon } from "sweetalert2";

export function createAlert(icon: SweetAlertIcon, title: string, text?: string):void {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
}
