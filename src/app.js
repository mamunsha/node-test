const path = require('path')
const express =  require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config 
const publicDirctoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs'); 
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up  static dirctory to serve
app.use(express.static(publicDirctoryPath));

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

app.get('',(req, res)=>{

   res.render('index',{
       title: 'Home',
       name: 'Mamun'
   })

});


app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About page',
        name: 'Mamun'
    })
});

app.get('/products', (req, res)=>{
    console.log(req.query.search);
    if(!req.query.search){
        return res.send(
            {
                error: 'you must secarh game'
            }
        )
    }
    res.send({
        products: []
    })
});


app.get('/help', (req, res)=>{
    res.render('help',{
        helptext: 'This is some helpful text',
        title: 'Help connect',
        name: 'Shajib'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('help',{
    
        title: '404',
        name: 'Shajib',
        errorMessage: 'Article not found',
    })
})

app.get('*',(req, res)=>{

    res.render('404', {
        title: '404',
        name: 'Almamun',
        errorMessage: 'Page not found'
    })
});







app.listen(port, ()=>{
    console.log('Port is run ....', + port)
});