# GPH PART II

# Guinea Pig Hotel
https://guinea-guesthouse.herokuapp.com/

![Guinea pig hotel](https://media.giphy.com/media/jlrrZm31qblTZlGl3D/giphy.gif) 

### Authors

> [@bantek89](https://github.com/bantek89) [@Dalmano](https://github.com/Dalmano) [@starsuit](https://github.com/starsuit)

![authors](https://media.giphy.com/media/GYlAnXsFWk4U0/giphy.gif)

- Hosted on heroku here! https://guinea-guesthouse.herokuapp.com/
- To run this project locally, clone this repo and run `npm i` in your terminal
- Use `npm start` to run this on http://localhost:7000
- We'll post the config.env file in the FAC16 gitter


### Built with

- Node
- Tape
- Supertest
- PostgreSQL
- bcrypt
- Our guinea pig hotelier dreams

## Goals

### Features
- [x] After check-in, the guinea pig is given a username and asked to set a password
- [x] The password is hashed and put into the database
- [x] Login form for later
- [ ] On login, the guinea pig is redirected to a personal page, which shows their details
- [ ] Personal page allows them to log out

### Stretch
- [ ] Guinea pigs can review the hotel
- [ ] Guinea pigs can order room service
- [ ] Multiple guinea pigs to an owner
- [ ] Admin access?

## Planning

- We decided that rather than rebuild a new database/server, we would carry on with our project from last week - also it was adorable
- Decided to add a login feature to the checking in process
- Extra 'users' table in the database

Updated user journey:
![](https://files.gitter.im/foundersandcoders/week6-gph/bmVu/IMG_20190417_131255.jpg)


## Hurdles (issues)

![hurdles](https://media.giphy.com/media/6whrgZbPXGJwrhwMAz/giphy.gif)

- Time (again)
- Getting the database to send data back to the frontend via the server
- Understanding of which thing to use where - cookies/hashing/web storage????

## Cool stuff we learned

![learning to swim](https://media.giphy.com/media/spyqGD3KIuDkY/giphy.gif)

- Turns out `fetch` can be used for POST as well as GET requests
- Sometimes saying 'enough is enough' and stopping is better than repeatedly trying at something
