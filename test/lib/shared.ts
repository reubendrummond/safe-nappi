export type StandardResponse<T> = SuccessResponse<T> | ErrorResponse;

// union discrimination with "success" property
interface SuccessResponse<T extends {}> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  error: {
    statud: number;
    message: string;
  };
}
