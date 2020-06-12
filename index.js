const moment = require('moment');



function solution(D){
    var data = {};
    var keys = Object.keys(D);
    const len = keys.length;
    for (var i = 0; i < len; ++i) {
        var current = keys[i];
        if (i + 1 != len) {
            var next = keys[i+1];
            var a = moment((current), 'YYYY-MM-DD');
            var b = moment((next), 'YYYY-MM-DD');
            var diffDays = b.diff(a, 'days');
            if (diffDays > 1) {
                var val = ((Math.max(D[current], D[next]) - Math.min(D[current], D[next])) / diffDays);
                for(var j=1; j < diffDays ; j++){
                    data[(moment(current).add(j, 'days').format("YYYY-MM-DD") )] = Math.min( D[current],D[next])+val ;
                    val += val;
                }
            }
        }
        data[(moment(current).format("YYYY-MM-DD"))] = D[current];
    }
    return data;
}
// var input = { '2019-01-01': 100, '2019-01-04':115, };
// var input2 = { '2019-01-10': 10, '2019-01-11':20, '2019-01-13':10 };
// var  op = solution(input);
// var  op2 = solution(input2);
// console.log(op)
// console.log(op2)
module.exports = solution;