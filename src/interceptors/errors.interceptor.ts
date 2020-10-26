import { BadGatewayException, BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators'

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
    .pipe(
      catchError(err => {
        console.log("==========================")
        console.log("err", err)
        console.log("==========================")
        let exception = null;
        if(err instanceof BadRequestException){
          exception = new BadRequestException();
        }
        if(err instanceof BadGatewayException){
          exception = new BadGatewayException();
        }
        if(err instanceof NotFoundException){
          exception = new NotFoundException();
        }
        return throwError(exception)
      })
    );
  }
}