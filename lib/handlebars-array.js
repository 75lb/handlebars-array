var w = require("wodge");

function where(arrayOfObjects, options){
    return arrayOfObjects.filter(function(item){
        return w.queryFoundInObject(item, options.hash);
    });
}
        
module.exports = function(handlebars){
    handlebars.registerHelper("where", function(arrayOfObjects, options){
        var results = where(arrayOfObjects, options);
        return results;
    });

    handlebars.registerHelper("findWhere", function(arrayOfObjects, options){
        var results = where(arrayOfObjects, options);
        return options.fn(results[0]);
    });
    
    handlebars.registerHelper("join", function(array, delimiter){
        return array && array.length
            ? array.join(delimiter)
            : "";
    });

    handlebars.registerHelper("pluck", function(arrayOfObjects, property){
        return arrayOfObjects && arrayOfObjects.length
            ? w.pluck(arrayOfObjects, property)
            : "";
    });
};
