import { Body, Controller, Get, Header, Params, Post, Query } from "koa-ts-controllers";

@Controller('/test')
class TestController {
  @Get('/hello')
  async hello(){
    return 'hello Test!'
  }

  // 
  @Get('/user/:id')
  async getUser(
    // @Params () p:{id:number}
    @Params('id') id :number
  ){
    return '当前用户的id是' + id
  }

  @Get('/user')
  async getUser2(
    // @Params () p:{id:number}
    @Query() q:{id:number}
  ){
    return '当前用户的id是' + q.id
  }

  @Post('/user')
  async postUser(
    @Body() body:{
      name:string,
      password:string
    },
    @Header() head:any
  ){
    console.log(head.token);
    return `当前用户的数据是${JSON.stringify(body)}`
  }

}