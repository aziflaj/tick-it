const faker = require('faker');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const UserDAO = require('../app/dao/UserDAO');
const userDao = new UserDAO();

const TicketDAO = require('../app/dao/TicketDAO');
const ticketDao = new TicketDAO();

const users = [
  {
    username: 'aziflaj',
    password: 'password',
    email: 'aziflaj@mail.com',
    full_name: 'Aldo Ziflaj'
  },
  {
    username: 'skola',
    password: 'password',
    email: 'skola@mail.com',
    full_name: 'Sara Kola'
  },
  {
    username: 'foobar',
    password: 'password',
    email: 'fbar@mail.com',
    full_name: 'Foo Bar'
  }
];

const tickets = [
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    status: 'opened'
  },
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    status: 'opened'
  },
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    status: 'opened'
  }
];

users.forEach((user, index) => {
  userDao.save(user).then(id => {
    const t = tickets[index];
    t.customer_id = id;
    ticketDao.save(t).then(t_id => console.log(`Saved ticket ${t_id}`));
  });
});
