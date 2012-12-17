//$fh.ready(function() {
  if (!$fh.logger) {
    $fh.logger = {};

    $fh.logger._dbg = function(){
      var clazz = arguments[0];
      var self = arguments[1];
      var func = arguments[2];
      var args = Array.prototype.slice.call(arguments,3)[0];

      var str = $fh.logger._stringify.apply(this,args);
      $("#logger  .logs").prepend($("<p>").addClass(clazz).text(str.join(" ")));
      try{
        func.apply(self,args);
      }catch(e){
        if(console && console.log){
          console.log("Failed to log message. Error: " + e.message);
        }
      }
    };

    $fh.logger._stringify = function(){
      var self = this;
      return _.collect(arguments, function (arg){
        if(_.isArray(arg)) {
          return _.collect(arg, function (v,k){
            return $fh.logger._stringify.call(self,v);
          });
        }
        if(_.isFunction(arg)) {
          return "<func>";
        }
        if(!_.isString(arg)   && !_.isNumber(arg)) {
          return JSON.stringify(arg);
        }
        return arg;
      });
    };

    $fh.logger.clear = function(){
      $("#logger .logs").empty();
    };

    $fh.logger.silly= function(){
      $fh.logger._dbg("silly",console,console.trace,arguments);
    };

    $fh.logger.debug = function(){
      $fh.logger._dbg("debug",console,console.debug,arguments);
    };

    $fh.logger.info = function(){
      $fh.logger._dbg("info",console,console.debug,arguments);
    };

    $fh.logger.error= function(){
      $fh.logger._dbg("error",console,console.error,arguments);
    };

    $fh.logger.warn = function(){
      $fh.logger._dbg("warn",console,console.debug,arguments);
    };

  }
//});

