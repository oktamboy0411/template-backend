import AuthSwagger from './auth'
import { Swagger, addSwaggerEndpoint } from './main'
import UploadSwagger from './upload'
import UserSwagger from './user'

addSwaggerEndpoint(Swagger, UploadSwagger)
addSwaggerEndpoint(Swagger, AuthSwagger)
addSwaggerEndpoint(Swagger, UserSwagger)

export { Swagger }
