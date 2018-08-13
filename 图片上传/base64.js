
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

module.exprots = app => {
    class oss {
        * base64(ctx){
            var query = this.ctx.request.body,
                content = query.content,//ͼƬbase64
                type = query.type,
                size = query.size,
                typeReg = /^data:image\/\w+;base64,/,
                fileName = uuid(),
                fileSavePath = path.resolve(__dirname,'../../public/images/'+fileName+'.'+type);

            var buf = content.replace(typeReg,'');
            buf = Buffer.from(buf,'base64');
            yield new Promise(resolve=>{
                fs.writeFile(fileSavePath,buf,(e)=>{
                    resolve('');
                })
            })
            return this.ctx.body = {
                code : 1,
                data : {
                    url : app.config.domain + '/pubilc/images/'+fileName+'.'+type
                },
                msg : ''
            }
        }
    }
    return oss
}