import config from './configs' 
import Koa,{Context} from 'koa';
import {bootstrapControllers} from 'koa-ts-controllers';
import KoaRouter from 'koa-router'; 
import path from 'path';
import KoaBodyParser from 'koa-bodyparser'




//bootstrapControllers 注册路由
(async () => {
  const app = new Koa();
  const {port, host} = config.server;
  const router = new KoaRouter();
  await bootstrapControllers(app, {
      router,
      basePath: '/api',
      versions: [1],
      controllers: [
        path.resolve(__dirname, 'controllers/**/*')
      ],
      errorHandler:async (err:any,ctx:Context) => {
        let status = 500
        let body = {
          statusCode:status,
          error: "Internal Server error",
          message: "An internal server error occurred"
        };
        ctx.status = status;
        ctx.body = body;
      }
  });

  app.use( KoaBodyParser() );
  app.use( router.routes() );

  app.listen(port, host, ()=>{
    console.log(`服务启动成功:http://${host}:${port}`);
  });
})()



 




