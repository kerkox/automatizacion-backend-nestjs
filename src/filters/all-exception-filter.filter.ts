import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionFilterFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();


    const status = 
      exception instanceof HttpException 
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    console.log("exception-----------",exception)
    response.status(status).json({
      status,
      errors: exception['errors'] || [],
      message: exception['message'] || "Error desconocido"
    })
  }

}
