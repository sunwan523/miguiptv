
const fs = require('fs');

function convertToM3U(txtContent) {
  const lines = txtContent.split('\n');
  let m3u = '#EXTM3U\n';
  let currentGroup = '';
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    const parts = line.split(',');
    if (parts.length >= 2) {
      if (parts[1] === '#genre#') {
        currentGroup = parts[0];
      } else {
        const channelName = parts[0];
        const streamUrl = parts.slice(1).join(',');
        m3u += '#EXTINF:-1 tvg-id="" tvg-name="' + channelName + '" group-title="' + currentGroup + '",' + channelName + '\n';
        m3u += streamUrl + '\n';
      }
    }
  }
  
  return m3u;
}

async function testConversion() {
  try {
    console.log('正在获取测试数据...');
    const response = await fetch('https://123.tv1288.xyz/sm1.txt');
    const txtContent = await response.text();
    
    console.log('正在转换为M3U格式...');
    const m3uContent = convertToM3U(txtContent);
    
    console.log('转换完成！正在保存测试文件...');
    fs.writeFileSync('test_output.m3u', m3uContent, 'utf8');
    
    console.log('测试文件已保存为 test_output.m3u');
    console.log('\n前20行预览:');
    console.log(m3uContent.split('\n').slice(0, 20).join('\n'));
  } catch (error) {
    console.error('测试失败:', error);
  }
}

testConversion();
