"use strict";

let getUser = (id, callback) => {
  let user = {
    id: id,
    name: "Dude"
  };

  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(5, (user) => {
  console.log(user);
});
