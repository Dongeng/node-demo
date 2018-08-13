var WXBizDataCrypt = require('./WXBizDataCrypt')//解密文件


var router = require('express').router;


router.post('/',(req,res) => {
    var query = req.query,
        iv = query.iv,
        encryptedData = query.encryptedData,
        appId = app.config.appId;//小程序appid


    var pc = new WXBizDataCrypt(appId, sessionKey);

    var data = pc.decryptData(encryptedData , iv);
    console.log('userInfo',data);
    res.send(data);
})

module.exports = router;


