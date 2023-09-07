let products = require("../data/products.json")

const fs = require("fs")

function findAll (){
    return new Promise ((res , rej)=>{
        res(products)
    })
}

function findById (id){
    return new Promise ((res , rej)=>{
        
        const product = products.find((currentProd)=> {
            if (currentProd.id === id) {
                let theCurrentProd
                theCurrentProd =  currentProd
                return theCurrentProd
        }})
        res(product)
    })
}


function addNewProd (prod){
    return new Promise ((res , rej)=>{

        //let newProd = JSON.stringify(prod)
        let newProd = prod
        products.push(newProd)
        fs.writeFile("../data/products.json" , products , (err)=>{console.log(err);})
        res(newProd)
    })
}


async function update (id , updatedProd){
    return new Promise ((res , rej)=>{

        const updatedProd = products.find((updatedProd)=> {
            if (updatedProd.id === id) {
                let thenewProd
                thenewProd =  updatedProd
                return thenewProd
        }})
        products.push(thenewProd)
        fs.writeFile("../data/products.json" , products , (err)=>{console.log(err);})
        res(updatedProd)
    })
}


async function remove (id){

    return new Promise ((res , rej)=>{

        let newProducts = products.filter((currentProd)=> {currentProd.id !== id})
        const arrayAsString = newProducts.join(',');

        fs.writeFile("../data/products.json" , arrayAsString , (err)=>{console.log(err);})
        res()
    })


}

module.exports = {
    findAll , 
    findById , 
    addNewProd ,
    update , 
    remove
}