const express = require("express");
const app = express();
const jsonParser = express.json();

app
  .use(jsonParser)
  .use('/', (req, res, next) => res.json({
    app: { port: 3000 },
    services: { stats: 'http://localhost:3020' },
    mongo: {
      uri: 'mongodb+srv://vladster1511:Vlad32531996@udemycourse.seqle67.mongodb.net/BestPet?retryWrites=true&w=majority',
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    }
  }))
  .listen(3010,  () => console.log('listening'));
