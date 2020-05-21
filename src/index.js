const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(morgan('tiny'));

const persons = [
  {
    id: 1,
    name: 'Kay',
    number: '193-433-0957 x557',
  },
  {
    id: 2,
    name: 'Albina',
    number: '987-353-6564',
  },
  {
    id: 3,
    name: 'Kendrick',
    number: '385-284-3567',
  },
  {
    id: 4,
    name: 'Hilbert',
    number: '(230) 710-5966 x137',
  },
  {
    id: 5,
    name: 'Lauretta',
    number: '040-105-8747',
  },
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/info', (req, res) => {
  res.send(`<h4>
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  </h4>`);
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const item = persons.find((v) => v.id === Number(id));
  if (item) {
    res.json(item);
  } else {
    res.status(400).send('No match');
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const result = persons.filter((v) => v.id !== Number(id));
  res.json(result);
});

app.post('/api/persons', (req, res) => {
  const { body } = req;
  if (!body.name) {
    res.status(400).json({ error: 'name must be uniqu' });
  } else if (!body.number) {
    res.status(400).json({ error: 'phone number must be uniqu' });
  } else {
    const newPerson = body;
    const name = { newPerson };
    const have = persons.find((v) => name === v.name);
    if (!have) {
      newPerson.id = Math.floor(Math.random() * 10000);
      persons.push(newPerson);
      res.json(persons);
    } else {
      res.status(400).json({ error: 'name already exists' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`service run at port ${PORT}`);
});
