# GraphQL-API

mock 用 API 接口，基于 Apollo-Server。

## 构思

- ~~更灵活的 reducer~~,直接在 resolver 里处理
- 边界情况、异常值处理
- ~~校验器（待定）~~,by `class-validator`
- ~~大部分 API 的类型定义一时找不到，又成 anyScript 了~~,感谢`TypeGraphQL`

## 更新

- 抛弃`Apollo-Data-Source`, 上`TypeGraphQL`和`TypeORM`,这样就少了一道在 resolver 里面调用`dataSource API` 再调用 ORM 的步骤. 但是全是装饰器语法我还得研究研究.

- 校验器使用`class-validator`

- TypeORM 的结合待实践(今天搞这个搞瑞了)
