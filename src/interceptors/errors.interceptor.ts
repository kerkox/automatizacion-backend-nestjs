import {
  BadGatewayException,
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators'
import { ConnectionRefusedError, UniqueConstraintError, ForeignKeyConstraintError } from "sequelize";

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

          // if (err instanceof NotFoundException) {
          //   let error = {
          //     message: err['response']['error'],
          //     status: err['status']
          //   }
          //   exception = new NotFoundException(error.message);

          // } else if (err instanceof UniqueConstraintError) {
          //   if (err.fields.hasOwnProperty('email')) {
          //     exception = new ConflictException(
          //       `User with email '${err.errors[0].value}' already exists`
          //     );
          //   } else {
          //     exception = err
          //   }

          // } else if (err instanceof ForeignKeyConstraintError) {
          //   let error = {
          //     message: `No existe el ID del siguiente campo: ${err.fields}`,
          //     status: 400
          //   }
          //   exception = new BadRequestException(error)

          // } else if (err instanceof ConnectionRefusedError) {
          //   console.log("ConnectionRefusedError: entro a validar")
          //   let error = {
          //     message: 'Error al conectarse a la Base de datos',
          //     status: 500
          //   }
          //   exception = new InternalServerErrorException(error);
          // } else if (err instanceof HttpException) {
          //   if(err.hasOwnProperty('message')){
          //     console.log("Contenia message-----------------------", err['error'].original)
          //     exception = err
          //   } else {
          //     let original = err.hasOwnProperty('original') ? err['original'] : null
          //     let message = "Error desconocido------------------";
          //     if(original){
          //       message = original.errno == "ECONNREFUSED" && "Error al conectar a la base de datos" 
          //     }
          //     exception = new BadGatewayException(message);
          //   }
          //   console.log("#############")
          //   console.log("Entro en modo HttpException")
          //   console.log("#############")
            
          // } else if (err instanceof BadRequestException) {
          //   console.log("#############")
          //   console.log("Entro en modo BadRequestException")
          //   console.log("#############")
          //   exception = err;
          // } else if (err instanceof BadGatewayException) {
          //   console.log("#############")
          //   console.log("Entro en modo BadGatewayException")
          //   console.log("#############")
          //   exception = err;
          // } else if(exception == null ){
          //   console.log("#############")
          //   console.log("Entro en modo null")
          //   console.log("#############")
          //   exception = new BadGatewayException(err);
          // }

          return throwError(exception)
        })
      );
  }
}