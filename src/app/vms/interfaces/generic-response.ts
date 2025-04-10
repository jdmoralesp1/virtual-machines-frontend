export interface GenericResponse<T> {
  succeded: boolean;
  message: string;
  data: T;
}
