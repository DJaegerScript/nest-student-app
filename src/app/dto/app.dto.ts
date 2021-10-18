export class ResponseBodyDTO {
  success: boolean;
  content?: any[] | Record<string, unknown>;
  message?: string;
}
