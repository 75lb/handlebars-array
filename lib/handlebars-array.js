var w = require("wodge");

module.exports = function(handlebars){
    handlebars.registerHelper("where", function(arrayOfObjects, options){
        // console.dir(options)
        var results = arrayOfObjects.filter(function(item){
            return w.queryFoundInObject(item, options.hash);
        });
        if (options.fn){
            return options.fn(results);
        } else {
            return results;
        }
    });
};
