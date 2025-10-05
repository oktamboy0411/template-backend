import { Swagger, addSwaggerEndpoint } from './main'
import UploadSwagger from './upload'

addSwaggerEndpoint(Swagger, UploadSwagger)

export default Swagger
