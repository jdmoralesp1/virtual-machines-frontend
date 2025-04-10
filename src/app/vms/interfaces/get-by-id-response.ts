export interface GetByIdResponse {
  id:              number;
  cores:           number;
  ram:             number;
  disc:            number;
  operatingSystem: string;
  createdAt:       string;
  updatedAt?:      string;
}
