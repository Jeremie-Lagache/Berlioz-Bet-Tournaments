const http = require('http');

const serverURL = 'http://berlioz-cup.onrender.com'; // Mettez ici l'URL de votre serveur

function keepServerAlive() {
  http.get(serverURL, (res) => {
    const { statusCode } = res;
    if (statusCode !== 200) {
      console.error(`Erreur en appelant le serveur. Status code : ${statusCode}`);
    }
  }).on('error', (err) => {
    console.error('Erreur en appelant le serveur :', err.message);
  });
}

const interval = 60000;
setInterval(keepServerAlive, interval);
