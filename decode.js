
// 尝试解码代码中的Base64字符串
const base64Str = 'AQIYAQACBiwIQGFIUjBjSE02THk4eE1qTXVkSFl4TWpnNExuaDVlZz09CBhMM050TVM1MGVIUT0IAAgGcmF3CAZtYXAICGF0b2IEAQgIam9pbggKZmV0Y2gIBG9rCBBSZXNwb25zZQgIdGV4dAQACDB0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgIGENvbnRlbnQtVHlwZQgCKgg2QWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luCA5oZWFkZXJzBAIICmVycm9yBfQBCAxzdGF0dXOYAbQBALYBALYBDrQBALYBCLQBALYBjgEGDAiMAZYBNjYAbgiMAQBuDnQMlgEAbPQBDgyMAUBoAHKWAQwIjAEAbvQBmgEImgEIAKYBCACmAaYBANABcHZkeJYBAJoBCACmAQDQAXBkAnAABAAABAEABAEABAIAAAAEAgAEAwAEAQAEBAQFAAAEBgQBAAQHBAYEAQQCAAQCBAgEBgQBAAQDBAMECQAABAIABAoEAwAECwQMBAAAAAAAAAQNBA4ABA8EEAQRBBIEAgAAAAT/BAoEEwAABBQEFQQSBAIAAAAABkxSfJQBkgGUAQI4gAEAlgE=';

try {
  const buffer = Buffer.from(base64Str, 'base64');
  console.log('Base64解码结果:');
  console.log('长度:', buffer.length);
  console.log('前100字节:', buffer.toString('hex', 0, 100));
  
  // 尝试用不同编码解码
  try {
    console.log('\n尝试UTF-8解码:');
    console.log(buffer.toString('utf8'));
  } catch (e) {
    console.log('UTF-8解码失败:', e.message);
  }
  
  try {
    console.log('\n尝试Latin1解码:');
    console.log(buffer.toString('latin1'));
  } catch (e) {
    console.log('Latin1解码失败:', e.message);
  }
} catch (e) {
  console.error('解码失败:', e);
}
