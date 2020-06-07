var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

//schema
var schema  = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
        id: Int
        title: String
        description: String
        topic: String
        url: String
    }
`);

var courseData = [ { id: 1 , title:"title", description: "123", topic: "js", utl:"udemy"},{ id: 2 , title:"title2", description: "123", topic: "node", utl:"udemy"}];

var getCourse = function(args){
    var id = args.id;
    return courseData.filter( course => {
        return course.id = id;
    })[0]
}

var getCourses = function(args){console.log(args.topic)
    if (args.topic) {
        var topic = args.topic;
        return courseData.filter( (course) => course.topic == topic)
    }
    else {
        return courseData;
    }
}

var updateCourseTopic = function({id, topic}) {
    courseData.map( course => {
        if (course.id === id){
            course.topic = topic;
            return course;
        }
    });
    return courseData.filter( course => course.id === id )[0]
}

// Root resolver
var root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
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