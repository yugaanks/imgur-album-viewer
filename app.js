const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./routes");
var path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    },
    partialsDir: [
        'views/partials/'
    ]
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
    console.log("We've now got a server!");
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});