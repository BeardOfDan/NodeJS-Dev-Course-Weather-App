"use strict";

let asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ((typeof a === "number") && (typeof b === "number")) {
        resolve(a + b);
      } else {
        reject("Arguments must be numbers");
      }
    }, 1500);
  });
};

asyncAdd(3, 5).then((result) => {
  console.log("Result: ", result);
  return asyncAdd(result, 33);
}).then((result) => {
  console.log("Result: ", result);
}).catch((errorMessage) => {
  console.log("Error: ", errorMessage);
});

// let somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Hey. It worked!");
//     reject("Unable to fulfill promise");
//   }, 2500);
// });
//
// somePromise.then((message) => {
//   console.log("Success: ", message);
// }, (errorMessage) => {
//   console.log("Error: ", errorMessage);
// });
