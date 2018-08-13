/******************************************************
多种加密混合，得到唯一值

****************************************************/
const crypto = require('crypto');
const sha3_512 = require('js-sha3').sha3_512;
const CRC32 = require('crc-32');

var seeds = [];

//创建用户单号, 单向散列函数(SHA3) 256位
module.exports = function createUserLicense() {
	var hash = sha3_512.create();
	hash.update(''+(new Date()).getTime());
	return hash.hex();
}



//创建MD5
function createHash() {
	return crypto.createHash('md5')
		.update(''+(new Date()).getTime())
		.digest('hex');
}

//创建系统随机数, MD5
function createSystemSeed() {
	for(var i = 0; i < 3; i++) {
		seeds[i] = createHash();
	}
}

//创建用户自定义种子, 使用CRC效验
function createUserSeed(seed) {
	var crc32 = CRC32.str(seed);
	console.log('crc32');
	console.log(crc32);
	return crc32;
}

function createOpenID(userSeed) {
	createSystemSeed();

	var a = [];
	a[0] = seeds[0] + createUserSeed(userSeed);
	a[1] = seeds[1] + createUserLicense();
	a[2] = seeds[2];
	return a.join('');
}

