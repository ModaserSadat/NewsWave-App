const promise = new Promise ( (resolve, reject) => {
    let x =9;
    if (x>=10){
        resolve("Operation is successful");
    }
    else{
        reject("Operation isn't Successfull")
    }
})

promise.then(
    result => console.log(result),
    error => console.log(error)
)

