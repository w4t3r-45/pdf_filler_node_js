const express = require('express');
const fillPdf = require('fill-pdf');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs');
app.set('views','views');



// our pdf form

var pdf_form = path.join(__dirname,'./files/test_form.pdf');


// getting our pdf files path
const location = path.join(__dirname,'./files');


app.get('/',(req,res)=>{
    res.render('home');
});


app.post('/fill', function(req, res) {
    // get body form data
    let name = req.body.name;
    let s_name = req.body.s_name;
    let lon_text = req.body.lon_text;
    let medic = req.body.medic;
    //setting up pdf fields object 
    const data = {
        name:name,
        s_name:s_name,
        long_text:lon_text,
        medic:medic
    }

    let i = 0;

    fillPdf.generatePdf(data, pdf_form,(err, output) => {
      if ( !err ) {
          i++;
        fs.writeFile(`${location}/File${i}.pdf`,output,(err)=>{
            if(err) console.log(err);
            console.log('done'); 
        });

        // res.type("application/pdf");
        // res.send(output);
      }
    });
  });


app.listen(3000,(req,res)=>{
    console.log('server started at 3000');
});
