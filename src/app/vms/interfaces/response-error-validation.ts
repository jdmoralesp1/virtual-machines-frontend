export interface ResponseErrorValidation {
  StatusCode:    number;
  Type:          string;
  Title:         string;
  Detail:        string;
  InvalidParams: { [key: string]: string[] };
}
