DBMS (Dtavase Management System)

데이터베이스 관리 시스템
- 데이터를 어떻게 저장하고 어떻게 관리하느냔에 따라 여러가지로 분류할 수 있다.

1. RDBMS(Relational DBMS) = table(표)로 관리하는 것, 표끼리 관계를 지을 수 있다, 관계형 데이터 베이스
    - 관계형 데이터를 관리하는 DBMS
    - SQL : RDBMS에서 데이터를 관리하기 위해 설계된 언어
    - MySQL, PostgreSQL 

2.NoSQL (Not Only SQL) = Json 형식 느낌으로 담거나, 키 벨류로 담거나(Redis) 
    - SQL을 사용하지 않는 DBMS
    - Redis, MongoDB
    - 단점을 보안하기 위해 나옴



<DB 설정>
몽고DB -> DataBase 생성 -> 네트워크 Access, Database Access (권한 부여 필수) -> connect -> MongoDB Compass 

>>Nestjs 시작

보일러 플레이트
npm i -g @nest/cli
nest new "이름"

start:dev
start:debug 

*spec.ts 는 테스트를 위한 파일 

express 구조랑 비교하면 좋음

providers: 공급자
controllsers: 모듈에서 정의된 컨트롤러 세트
imports: 모듈을 연결한다.(가져온다)
[imports:[CatsModule,UsersModule]에서 exports 한 서비스들을  controllers나 providers에서 사용할 수 있게된다.]




>>Nestjs 의존성 주입 페턴 (디펜던시 인젝션)

보통은 this.appService = appService 
이런식으로 초기화를 해서 사용하는데 

return this.appService.getHello() 바로 인자를 받아서 사용함

```
@Controller()
export class AppController //소비자가 { 
  constructor(private readonly appService: AppService) {}
                //어떤 프로파이더 에서 appService 라는 제품을 받아
  @Get()
  getHello(): string {
    return this.appService.getHello();
                //사용한다.
  }
}
```
nestjs는 모든게 모듈화가 되어있다.
모듈에 프로파이더를 제거 하게 된다면 
AppController의 AppService가 resolve 할 수 없다고 하는데

이유는? 
nest에서는 등록을 해주면 제품의 대한 공급자를 찾아가서 
공급자에서 제품을 받아 고객에게 주려고 했는데
공급자를 찾아 가려했는데 모듈에 등록되지 않음 (사용할 수 없음)
provider(공급자)등록을 해줘야한다.
provider(공급자)로 취급이 되는 것들은
@Injectable(의존성 주입)이 가능하다는 데코레이터(@)가 있다.
간단히 말하면 "사업자 등록"

소비자(AppController)가 appService(제품): AppService(공급자) 을 받아서

return this.appService.getHello(제품을 사용할 수 있다.)

>>모듈

- 명령어를 통한 모듈 생성 

nest cli
```
nest g mo "이름"
```
[공식 문서에서는 복수형으로 이름을 하기를 권장]

직접 모듈을 만들어도 되지만 nest cli 사용하면 자동으로 모듈에 imports 된다.

- 명령어로 컨트롤러 생성
```
nest g co "이름"
```
자동으로 cats 모듈에 컨트롤러가 들어간다.

-명령어로 서비스 생성
 ```
 nest g service "이름"
 ```
자동으로 cats 모듈에 서비스가 들어간다.

- 미들웨어 생성
```
 nest g middleware "이름"
```

>> 모듈의 캡슐화

```
@Controller()
export class AppController //소비자가 { 
  constructor(private readonly appService: AppService) {}
                //어떤 프로파이더 에서 appService 라는 제품을 받아
  @Get()
  getHello(): string {
    return this.appService.getHello();
                //사용한다.
  }
}
```

app.controller 에서 appService:AppService 를 주입 받았는데 
다른 서비스도 가능하다. 
 constructor(private readonly appService: AppService,
 private readonly catsService: CatsService
 ) 이렇게 주입 가능하다.

*단 모듈은 기본적으로 공급자(provider)는 캡슐화 한다
exports 하지 않으면 공급자는 사용 할 수 없다. 
(cats.module 에서 exports:CatsService 해야한다.)

사업자 등록(provider에 등록)하나하나 
사업자 등록(provider에 등록) 하는 방법도 있다.
ex) 
imports:[CatsModules, UsersModules]
providers:[CatsService,UsersService]

패턴도 있는데 관리가 힘들어서 좋지 않다

>> Nestjs 미들웨어 

미들웨어는 라우트 핸덜러 이전에 호출되는 함수 
Express 미들웨어와 같다.

404 미들웨어
json 미들웨어
로깅 미들웨어 (어떠한 대상이 어떤한 요청을 했는지 로깅)
 같은

@Module 데코레이터에는 미들웨어를 쓸 수 없고

configure 무듈 클래스 메서드를 사용해서 쓴다.

```
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
```
consumer:소비자 에게
LoggerMiddleware 제공 (의존성 주입 가능한 provider)

forRoutes('cats'): cats 라우터에 바인딩 시켜주는것 
forRoutes('*')로 와일드 카드 형식으로 하면 전체 endPoint에
로그 미들웨어가 실행된다.

활용가능한 로깅할때 Logger라는 클래스를 사용하는데
    private logger = new Logger('HTTP');
HTTP 프로토콜에 관한 로거를 사용할 수 있다.
    this.logger.log(req.ip, req.originalUrl);


추가적으로 

[미들웨어] - [라우트] - [Response] 구조인데
Response의 결과 값도 로깅을 해주는것 

  res.on('finish', () => {
      this.logger.log(res.statusCode);
    });

'finish' 라는 이벤트 (res가 완료 됐을때..)


>> Nestjs Exception filter & Pipes (필터링)

잘못된 엔드포인트에 들어갔을때 
nestjs의 규칙으로 인해 자동으로 status, message, error를 반환한다.

 throw new HttpException('api is broken', 401);

서비스의 형태의 따라 에러를 핸들링 할때가 있다.
이것을 추가적으로 수정 하고 싶을때는 

 throw new HttpException({
    success:false, message:"api is broken", 401
    });

여기서 success는 그대로 두고 message만 바꾸는 형식을 만들고 싶다면
 [Exception] - [Exception 하나로 모여]-[Exception 필터링]-[res 반환]

http-exception.filter.ts 참고

1.각각 적용 하는 방법
cats.controller.ts

@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}

@UseFilters를 이용해서 해당하는 필터를 인자로 넘겨주고
함수 안에서 exception이 발생하면 exception이에대한 내용이 필터로 넘어가서 반환되는 형식 

에러 메시지 전달 
 throw new HttpException('api is broken', 401);

  const error = exception.getResponse(); 
    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
    });

2.전역 적용 방법

main.ts

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();

object 로 뜰경우는 nest에서 자체적인 처리고
string 처리는 직접 인자 값을 설정한 경우

if문으로 분기처리
인자값을 넣어서 발생시킨 에러와
nest 자체 에러를 분리한다

 const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; messagse: string | string[] };

    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        ...error,
      });
    }
  
  [미들웨어]-[컨트롤러]-[서비스]-[exception] 
  으로 사용자 응답에 도달한다.

> Pipes (파이프)

1. 변환 :입력 데이터가 원하는 형식으로 변환
2. 유효성 검사:입력데이터를 평가하고 유효하면 변경x 전달 
그렇지 않으면 예외를 발생

getOneCat(@Param('id') param) {
    console.log(param);
    return 'all cat';
  } 

넘어온 id 값을 타입 변환을 할 수 있다.


  getOneCat(@Param('id', ParseIntPipe) param: number) {
    console.log(param);
    return 'all cat';
  }
ParseIntPipe 로 넘버로 타입 변환 가능
추가적으로 int,number이 아닌 값으로 전달되면 validation 에러까지 자동으로 가능 


class validation 으로 직접 타입 설정 가능


>> Interceptors (인터셉터)

Interceptors는 @Injectable 이 달린 클래스로 의존성 주입이 가능하다. 
각각의 핵심 기능에서 횡단하며 재사용 가능한 기능들을 관점 지향으로 하나의 모듈로 묶는것을 말함

Interceptors는 AOP(관점 지향 프로그레밍) 영감을 받은 기능

[                    핵심기능                        ]
      |                 |                 |
[유저.컨트롤러]  [고양이.컨트롤러]   [강아지.컨트롤러]


공통적인 재사용 기능들이 있을건데 
로깅 기능 같은 
그렇기때문에 미들웨어로 로깅을 만듬 실제로 인터셉터로 만들 수있다

인터 셉트에서 컨트롤러가 시작전 끝냈을때 나눠서 코딩이 가능하다.
  console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  
@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
흐름으로 봤을때 Interceptor가 없으면 성공이든 실패든
 excepions으로 가기때문에 성공했을 경우를 만들어준다고 생각 하면된다.

 그리고  console.log('Before...'); 경우 보통 미들웨어에서 처리를 하기떄문에 컨트롤러가 보냈을때 데이터를 받아서 가공해서 필터처럼 사용 할 수 있는것

  [요청]-[미들웨어]-[인터셉터(pre before)]-[컨트롤러]-[인터셉터(post after)]-[서비스]-[exception] 

  >> mongoose(MongoDB를 생으로 안쓰고 직관적이고 스키마 제공해서 편하게 쓰려고 나온것)
  nestjs 는 mongoose 타입스크립트에 직관적으로 상용할 수 있게 더 나은 인터페이스제공 한다.

  MongoDB를 url 을 메인 모듈에 imports 해주는데 환경변수 설정을 해서 보안을 유지하자 

  ```
   npm i --save @nestjs/config

  ```
  express 에서는 .env 를 사용하려면 따로 설치해야하지만 
  네스트에서 config 모듈 설치하면 사용 가능하다.
  모듈에  ConfigModule.forRoot() imports 해줘야 사용 가능

  * 모듈이 여러개가ㅣ 있고 app 모듈에 임폴트 되어서 main.ts 에서 실행된다.

- 기본적으로 nodejs와 mgDB 연결할때 셋팅해줘야 할게 있다.

mongoose 버전 6.0 이상부터는 useFindAndModify, useCreateIndex 옵션을 설정안해주셔도 됩니다!
2023.01.05 기준  몽고디비 설정할때, 기본으로 다 지원하기 때문에
추가 설정을 할 필요가 없다고 하네요!

- useNewUrlParser : true

    - mongodb url을 읽을 수 있도록 설정합니다. 설정하지 않으면 다음과 같은 경고가 뜹니다. DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.

- useUnifiedTopology : true

    - 최신 mongodb 드라이버 엔진을 사용하도록 설정합니다. (안정적인 연결을 유지할 수 없는 경우를 제외하고 이 옵션을 true로 설정해야 합니다.)

개발중 몽구스 쿼리를 로그로 찍을 수 잇다 

```
import * as mongoose from "mongoose"
```

schema 설정시 varidation 을 설정 해줘야하는데 (이메일 형식 같은) 자동으로 해주는 nest 라이브러가 있다.

```
yarn add class-validator class-transformer

```
class-validator 을 사용하려면 main.ts 에 등록을 해줘야 한다. 
```
 app.useGlobalPipes(new ValidationPipe());

```

>> DTO 페턴
![img](https://github.com/moogieon/prod-meat/assets/86825253/84c62d53-a86f-4110-b061-57555d8ac55c)


자동 403 에러 

throw new UnauthorizedException("중복된 아이디입니다.")
비밀번호 암호화 

```
yarn add bcrypt 
yarn add -D @types/bcrypt
```

암호화된 비밀번호 숨기기 
schema 에서 
버추얼 필드 
(readOnlyData 는 사용자한테 가상으로 필요한 데이터만 필터링 해서 나간다.)

```
virtual("readOnlyData").get(function(this:Cat)){
    return {
        id:this.id
        email:this.email
    }
}
```

>> API 문서 

nest는 기본적으로 express 프레임워크를 사용한다.
Fastify 는 espress와 비슷한 웹 프레임 워크 
구조적으로 Express 보다 훨씬 빠르다. 

속도를 높힐 필요가 있는 API 리팩토링 = Fastify
기본적인 API = Express

문서 자동 작성 라이브러리

```
yarn add @nestjs/swagger-ui-express
```

``` -main.ts-

 const config = new DocumentBuilder()
    .setTitle("title")
    .setDescription("descripton")
    .setVersion("version")
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
```

API 설명 적는법

```  -meats.controller.ts-

  @ApiOperation({ summary: '고기 상세정보' })
```
API 예시 설정

``` -meats.request.dto-

 @ApiProperty({
    example: 'pyyye@naver.com',
    description: 'email',
    required: true,
  })

```

Response 설정

``` -meats.controller.ts-
 @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiOperation({ summary: '회원가입' })
```

Response DTO 설정

``` -meats.dto.ts-

 @ApiProperty({
    example: '3254125215',
    description: 'email',
    required: true,
  })
  id: string;

 -meats.controller.ts- 
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiOperation({ summary: '회원가입' })

```

재사용성을 위해서 schema 에서 상속받아 사용하기
Dto 설정을 schema 설정해서 상속해서 사용하기!

``` -meats.dto.ts-
export class ReadOnlyMeatDto extends Meat {
  @ApiProperty({
    example: '3254125215',
    description: 'email',
    required: true,
  })
  id: string;
}

```

필요한 부분만 가져오는 방법  'PickType()' 
반대로 필요 없는 부분을 뺴는 방법 'OmitType()'

```
export class ReadOnlyMeatDto extends PickType(Meat, [
  'email',
  'name',
] as const) {
  @ApiProperty({
    example: '3254125215',
    description: 'email',
    required: true,
  })
  id: string;
}
```

>> CORS 설정 방법

``` -main.ts-

  app.enableCors({
    origin: true, //개발 할때는 true, 특정 url 적어야함
    credentials: true,
  });
  
```