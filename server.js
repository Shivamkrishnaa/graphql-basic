var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

//schema
var schema  = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver
var root = {
    message: () => 'Hello world'
};

// server and endpoint

var app = express();
app.use('/graphql' , express_graphql({ 
    schema: schema,
    rootValue: root,
    graphiql: true
 }));

app.listen(4000, function(){
    console.log('Graph ql express running 4000 port');
})