import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import {nestCsrf, CsrfFilter} from 'ncsrf';

async function bootstrap() {



// setup route middlewares

  const app = await NestFactory.create(AppModule);
  // const config = new ConfigService();
  // await app.listen(await config.getPortConfig());
  // console.log('Server on port', config.getPortConfig())
  // const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(cookieParser());
  app.use(nestCsrf({ ttl: 86400 }));
  app.use(csurf({ cookie: true }));
  app.useGlobalFilters(new CsrfFilter)
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });
  // app.post('/data_assets',function(req,res,next){
  //   res.json({'csrfToken':req.csrfToken()});
  // });



  // app.use(app1.get('/form', csrfProtection, function (req, res) {
  //   // pass the csrfToken to the view
  //   res.render('send', { csrfToken: req.csrfToken() })
  // }))
  // app.use(app1.post('/process', parseForm, csrfProtection, function (req, res) {
  //   res.send('data is being processed')
  // })),
  // );
  app.enableCors();
  await app.listen(6000);


}
bootstrap();
