const faker = require('faker');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const UserDAO = require('../app/dao/user_dao');
const userDao = new UserDAO();

const TicketDAO = require('../app/dao/ticket_dao');
const ticketDao = new TicketDAO();

const customers = [
  {
    username: 'aziflaj',
    password: 'password',
    email: 'aziflaj@mail.com',
    full_name: 'Aldo Ziflaj',
    role: 'customer'
  },
  {
    username: 'skola',
    password: 'password',
    email: 'skola@mail.com',
    full_name: 'Sara Kola',
    role: 'customer'
  },
  {
    username: 'foobar',
    password: 'password',
    email: 'fbar@mail.com',
    full_name: 'Foo Bar',
    role: 'customer'
  }
];

customers.forEach(customer => {
  userDao.save(customer).then(user_id => {
    for (let i = 0; i < 5; i++) {
      const ticket = {
        title: faker.lorem.sentence(),
        description: faker.lorem.text(),
        status: 'opened',
        customer_id: user_id
      };
      ticketDao.save(ticket).then(ticket_id => {
        console.log(`Saved ticket ${ticket_id} for user ${user_id}`);
      });
    }
  });
});

const supporters = [
  {
    username: 'jimmy',
    password: 'password',
    email: 'jimmy@tickit.com',
    full_name: 'Jimmy Page',
    role: 'supporter'
  },
  {
    username: 'clapton',
    password: 'password',
    email: 'clapton@tickit.com',
    full_name: 'Eric Clapton',
    role: 'supporter'
  },
  {
    username: 'jin',
    password: 'password',
    email: 'jin@tickit.com',
    full_name: 'Gjin Bue Shpata',
    role: 'supporter'
  }
];

supporters.forEach(supporter => {
  userDao.save(supporter).then(id => {
    console.log(`Saved supporter with id ${id}`);
  });
});

const admin = {
  username: 'admin',
  password: 'password',
  email: 'admin@tickit.com',
  full_name: 'admini madh',
  role: 'admin'
};

userDao.save(admin).then(id => {
  console.log(`Saved adminin e madh with id ${id}`);
});
