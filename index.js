const http = require("http")
const {getAllProducts , getProdById , createNewProd , updateProd , deleteProd} = require("./controllers/productsController")
const products = require("./data/products.json")

const server = http.createServer((req , res )=>{

    if (req.url === '/products' && req.method === 'GET'){

        // res.writeHead(200 , {"Content-Type" : "application/json"})
        // res.end(JSON.stringify(products))

        getAllProducts(req , res)

    } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'GET'){

        const id = req.url.split("/")[2]
        getProdById(req , res , id)

    } else if (req.url === '/products' && req.method === 'POST'){

        createNewProd(req , res)
    
    } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'PUT'){


        const id = req.url.split("/")[2]
        updateProd(req , res , id)

    } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'DELETE'){

        const id = req.url.split("/")[2]
        deleteProd(req , res , id)

    
    } else{

        res.writeHead(404, {"Content-Type" : "application/json"})
        res.end(JSON.stringify({message : "End point Not Found"}))
    
    }




})

const PORT = process.env.PORT || 7000

server.listen(PORT , ()=> console.log(`srever running on port ${PORT}`))