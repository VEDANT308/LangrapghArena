import http from 'http';
http.get('http://localhost:5173', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    if (data.includes('<script type="module" src="/@vite/client"></script>')) {
      console.log('Vite is serving the page successfully.');
    } else {
      console.log('Vite response does not look like normal HTML. Snippet:', data.substring(0, 500));
    }
  });
}).on('error', (err) => {
  console.error('Error connecting to Vite:', err.message);
});
