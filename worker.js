export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname;
      
      const response = await fetch('https://123.tv1288.xyz/sm1.txt');
      const text = await response.text();
      
      const isTVOnly = pathname.includes('1.m3u');
      const m3uContent = convertToM3U(text, isTVOnly);
      
      return new Response(m3uContent, {
        headers: {
          'Content-Type': 'audio/mpegurl; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    } catch (error) {
      return new Response('Error: ' + error.message, {
        status: 500,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }
};

function convertToM3U(txtContent, isTVOnly) {
  const lines = txtContent.split('\n');
  let m3u = '#EXTM3U\n';
  let currentGroup = '';
  let channelCount = 0;
  const maxChannels = 130;
  
  const vodKeywords = ['剧场', '电影', '综艺', '电竞', '赛事', '动画', '萌宠', '大剧', '精选', '综合', '爱情', '喜剧', '惊悚', '悬疑', '军旅', '家庭', '古装', '动作', '中国功夫', '金牌', '军事', '农业', '纪录', '健康', '体育', '辣婆', '炫舞', '视频'];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const parts = line.split(',');
    if (parts.length >= 2) {
      if (parts[1] === '#genre#') {
        currentGroup = parts[0];
      } else {
        const channelName = parts[0];
        const streamUrl = parts.slice(1).join(',');
        
        if (isTVOnly) {
          let isVOD = false;
          for (let j = 0; j < vodKeywords.length; j++) {
            if (channelName.includes(vodKeywords[j])) {
              isVOD = true;
              break;
            }
          }
          if (isVOD) continue;
        }
        
        if (channelCount >= maxChannels) break;
        
        m3u += '#EXTINF:-1 group-title="' + currentGroup + '",' + channelName + '\n';
        m3u += streamUrl + '\n';
        channelCount++;
      }
    }
  }
  
  return m3u;
}
