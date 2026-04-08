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
  const channelSources = {};
  
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
        const key = currentGroup + '|' + channelName;
        
        if (!channelSources[key]) {
          channelSources[key] = {
            name: channelName,
            group: currentGroup,
            urls: []
          };
        }
        channelSources[key].urls.push(streamUrl);
      }
    }
  }
  
  for (const key in channelSources) {
    const channel = channelSources[key];
    for (let i = 0; i < channel.urls.length; i++) {
      const url = channel.urls[i];
      const displayName = channel.urls.length > 1 ? channel.name + ' (源' + (i + 1) + ')' : channel.name;
      m3u += '#EXTINF:-1 tvg-id="" tvg-name="' + displayName + '" group-title="' + channel.group + '",' + displayName + '\n';
      m3u += url + '\n';
    }
  }
  
  return m3u;
}
