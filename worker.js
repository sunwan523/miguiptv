
export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      
      const response = await fetch('https://123.tv1288.xyz/sm1.txt');
      const text = await response.text();
      
      const m3uContent = convertToM3U(text);
      
      return new Response(m3uContent, {
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
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
