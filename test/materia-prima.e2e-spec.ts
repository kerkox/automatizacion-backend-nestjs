import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { TransformInterceptor } from '../src/interceptors/transform.interceptor';
import { ErrorsInterceptor } from '../src/interceptors/errors.interceptor';

describe('MateriaPrimaController (e2e)', () => {
  let app: INestApplication;
  let materia = {
    descripcion: 'Quimico #1'
  }
  let materia2 = {
    descripcion: 'Quimico #2'
  }

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new TransformInterceptor())
    app.useGlobalInterceptors(new ErrorsInterceptor())
    await app.init();
  });

  it('api/materia-prima Qumico 1 (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/api/materia-prima')
      .send(materia)
      .expect(201)
      .end((err,res) => {
        if(err) return done(err)
        done();
      })
  })

  it('api/materia-prima Qumico 2 (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/api/materia-prima')
      .send(materia2)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        done();
      })
  })

  it('/api/materia-prima (GET)', (done) => {
    let data = {data: [materia,materia2]}
    return request(app.getHttpServer())
      .get('/api/materia-prima')
      .expect((res) => {
        res.body.data = res.body.data.map((m: any) => { 
          return { descripcion: m.descripcion }
        })
      })
      .expect(200, data, done)
  });

  it('/api/materia-prima Quimico 1 (GET)', (done) => {
    let data = {data: materia}
    return request(app.getHttpServer())
      .get('/api/materia-prima/1')
      .expect((res) => {
        res.body.data = {descripcion: res.body.data.descripcion }      
      })
      .expect(200, data, done)
  });


  it('/api/materia-prima (GET)', (done) => {
    let materia = {descripcion: 'Quimico #1.1'}
    return request(app.getHttpServer())
      .put('/api/materia-prima/1')
      .send(materia)
      .expect((res) => {
        res.body.data = { descripcion: res.body.data.descripcion }      
      })
      .expect(200, {data:materia}, done)
  });


});
