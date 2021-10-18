export class ResponseBodyDTO {
  success: boolean;
  content?: any[] | Record<string, any>;
  message?: string;
}
