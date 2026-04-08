
// 解码发现的 URL
const encodedUrl = 'aHR0cHM6Ly8xMjMudHYxMjg4Lnh5eg==';
const decodedUrl = Buffer.from(encodedUrl, 'base64').toString('utf8');
console.log('解码后的 URL:', decodedUrl);
console.log('完整路径:', decodedUrl + '/sm1.txt');
