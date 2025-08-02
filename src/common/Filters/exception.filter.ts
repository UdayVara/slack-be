import {
    Catch,
    ExceptionFilter,
    HttpException,
  } from '@nestjs/common';
  import { GraphQLError } from 'graphql';
  
  @Catch()
  export class GraphQLExceptionFilter implements ExceptionFilter {
    catch(exception: unknown) {
  
      let statusCode = 500;
      let message = 'Internal server error';
      let code = 'INTERNAL_SERVER_ERROR';
  
      if (exception instanceof HttpException) {
        statusCode = exception.getStatus();
        const response = exception.getResponse();
  
        // Extract message
        if (typeof response === 'string') {
          message = response;
        } else if (typeof response === 'object') {
          message = (response as any).message ?? message;
        }
  
        // Map HTTP status code to GraphQL code
        code = this.mapHttpStatusToGraphQLCode(statusCode);
  
        throw new GraphQLError(message, {
          extensions: {
            code,
            statusCode,
            message,
          },
        });
      }
  
      // Unknown error fallback
      throw new GraphQLError(message, {
        extensions: {
          code,
          statusCode,
          message,
        },
      });
    }
  
    private mapHttpStatusToGraphQLCode(status: number): string {
      const map: Record<number, string> = {
        400: 'BAD_REQUEST',
        401: 'UNAUTHORIZED',
        403: 'FORBIDDEN',
        404: 'NOT_FOUND',
        405: 'METHOD_NOT_ALLOWED',
        409: 'CONFLICT',
        422: 'UNPROCESSABLE_ENTITY',
        429: 'TOO_MANY_REQUESTS',
        500: 'INTERNAL_SERVER_ERROR',
        502: 'BAD_GATEWAY',
        503: 'SERVICE_UNAVAILABLE',
        504: 'GATEWAY_TIMEOUT',
      };
  
      return map[status] ?? 'INTERNAL_SERVER_ERROR';
    }
  }
  