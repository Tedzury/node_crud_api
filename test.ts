const invalidOj = "{ data: 'now' name: 'Oleg'}";
const validObj = { data: 'yesterday', name: 'Maxim'};

console.log(JSON.stringify(invalidOj));
console.log(JSON.stringify(validObj));
