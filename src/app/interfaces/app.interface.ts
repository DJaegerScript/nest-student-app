export class ResponseBodyInterface {
  success: boolean;
  content?: any[] | Record<string, any>;
  message?: string;
}
