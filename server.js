import app from './app.js';
import env from './server/config/variables.js';

const PORT = env.port || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
