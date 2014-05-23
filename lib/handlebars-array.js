var w = require("wodge"),
    util = require("util");

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
    
    handlebars.registerHelper("map", function(array, iteratorBody){
        var iterator = new Function("value", "index", "array", iteratorBody);
        return array.map(iterator);
    });

    handlebars.registerHelper("sort", function(array, negativeTest, positiveTest){
        var f = "if (%s) { return -1; } else if (%s) { return 1; } else { return 0; }"
        if (negativeTest && positiveTest){
            return array.sort(new Function("a", "b", util.format(f, negativeTest, positiveTest)));
        } else {
            return array.sort();
        }
    });
};
