const productModel = require("../model/productModel")
const products = require("../data/products.json")
async function getAllProducts (req , res) {
    try {
        const products = await productModel.findAll()
        res.writeHead(200 , {"Content-Type" : "application/json"})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

async function getProdById(req , res , id){

    try {

        const product = await productModel.findById(id)
        
        if(!product){

            res.writeHead(404, {"Content-Type" : "application/json"})
            res.end(JSON.stringify({message : "Product Not Found"}))
            
        } else {
            res.writeHead(200 , {"Content-Type" : "application/json"})
            res.end(JSON.stringify(product))
        }
        
    } catch (error) {
        console.log(error)
    }

}

async function createNewProd (req , res) {
    try {
        
        let body = ''
        req.on("data" , (chunk)=>{

            body += chunk.toString()
        })

        req.on("on" , async()=>{

            let {id , name , description , price} = JSON.parse(body)
            const parsedProd = {
                id ,
                name  , 
                description , 
                price 
            }
            let newProd = await productModel.addNewProd(parsedProd)

            res.writeHead(200 , {"Content-Type" : "application/json"})
            res.end(JSON.stringify(newProd))
        })

    } catch (error) {
        console.log(error)
    }
}

async function updateProd(req , res , id){ 

    try {
        
        let body = ''
        req.on("data" , (chunk)=>{

            body += chunk.toString()
        })

        req.on("on" , async()=>{

            let {name , description , price} = JSON.parse(body)
            const updProd = {
                name  , 
                description , 
                price 
            }
            let newProd = await productModel.update(id , updProd)

            res.writeHead(200 , {"Content-Type" : "application/json"})
            res.end(JSON.stringify(newProd))
        })

    } catch (error) {
        console.log(error)
    }



}

async function deleteProd(req , res ,id){
    try {

        const product = await productModel.findById(id)
        
        if(!product){

            res.writeHead(404, {"Content-Type" : "application/json"})
            res.end(JSON.stringify({message : "Product Not Found"}))
            
        } else {
            await productModel.remove(id)
            res.writeHead(200 , {"Content-Type" : "application/json"})
            res.end(JSON.stringify({ message : `Product With This ${id} Removed`}))
        }
        
    } catch (error) {
        console.log(error)
    }

}


module.exports = 
{
    getAllProducts , 
    getProdById , 
    createNewProd , 
    updateProd , 
    deleteProd
}