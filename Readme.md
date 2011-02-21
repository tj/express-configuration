
# Express Contrib
      
  [Express](http://expressjs.com) utilities which do not belong in core, however prove useful.

## Installation

npm:

    $ npm install express-contrib

## Modules

  * Flash notification rendering (_express-messages_)

## Module Usage

You may either require the specific module, for example:

    var messages = require('express-contrib/messages');

or access via the main _express-contrib_ module which is useful when
utilizing many of the modules:

    var contrib = require('express-contrib');
    var messages = contrib.messages;

## express-messages

The _express-messages_ module provides flash notification rendering. To use simply assign it to a dynamic helper:

    app.dynamicHelpers({ messages: require('express-contrib/messages') });

Then in a view you may output the notifications:

    <%- messages() %>

Which outputs HTML as shown below:

    <div id="messages">
      <ul class="info">
        <li>Email queued</li>
        <li>Email sent</li>
      </ul>
      <ul class="error">
        <li>Email delivery failed</li>
      </ul>
    </div>

## express-namespace

The _express-namespace_ module provides namespace capabilities to express. The example below may respond to any of the following requests:

    GET /forum/12
    GET /forum/12/view
    GET /forum/12/edit
    GET /forum/12/thread/5
    DELETE /forum/12

To utilize this module simply `require('express-contrib')`, or if you prefer to __only__ utilize namespacing `require('express-contrib/namespace')`, and `app.namespace()` will automatically be available to you.

Usage is as follows, simply pass a callback function and route to the method, after each callback invocation is complete, the namespace is restored to it's previous state.

    app.namespace('/forum/:id', function(){
      app.get('/(view)?', function(req, res){
        res.send('GET forum ' + req.params.id);
      });
      
      app.get('/edit', function(req, res){
        res.send('GET forum ' + req.params.id + ' edit page');
      });

      app.namespace('/thread', function(){
        app.get('/:tid', function(req, res){
          res.send('GET forum ' + req.params.id + ' thread ' + req.params.tid);
        });
      });

      app.del('/', function(req, res){
        res.send('DELETE forum ' + req.params.id);
      });
    });

You can also access the current namespace via `app.currentNamespace`;

## express-resource

Provides resourceful routing, for example a module or object can be defined as shown in the example below, where all methods or "actions" are optional:

    
    exports.index = function(req, res){
      res.send('forum index');
    };

    exports.new = function(req, res){
      res.send('new forum');
    };

    exports.create = function(req, res){
      res.send('create forum');
    };

    exports.show = function(req, res){
      res.send('show forum ' + req.params.id);
    };

    exports.edit = function(req, res){
      res.send('edit forum ' + req.params.id);
    };

    exports.update = function(req, res){
      res.send('update forum ' + req.params.id);
    };

    exports.destroy = function(req, res){
      res.send('destroy forum ' + req.params.id);
    };

The _id_ option can be specified to prevent collisions:

     exports.id = 'uid';
    
     exports.destroy = function(req, res) {
       res.send('destroy user ' + req.params.uid);
     };

The `app.resource()` method will create and return a new `Resource`:

    var contrib = require('express-contrib')
      , Resource = contrib.Resource
      , app = express.createServer();
    
    app.resource('forums', require('./forum'));

Actions are then mapped as follows (by default):

    GET     /forums           ->  index
    GET     /forums/new       ->  new
    POST    /forums           ->  create
    GET     /forums/:id       ->  show
    GET     /forums/:id/edit  ->  edit
    PUT     /forums/:id       ->  update
    DELETE  /forums/:id       ->  destroy

__NOTE:__ this functionality will surely grow with time, and as data store clients evolve we can provide close integration.

## express-configure

Ever wanted to boot your Express app settings using Redis or a similar key/value store? well now it is easy, all you need to do is either `require('express-configure')` or `require('express-contrib')` and callback a function in `configure()`:

    app.configure(function(done){
      redis.hmget('settings', function(err, obj){
        for (var key in obj) app.set(key, obj[key]);
        done();
      });
    });

    app.listen(3000);

## Contributors

The following are the major contributors of Express Contrib (in no specific order).

  * TJ Holowaychuk ([visionmedia](http://github.com/visionmedia))

## Running Tests

First make sure you have the submodules:

    $ git submodule update --init

Then run the tests:

    $ make test

## License 

(The MIT License)

Copyright (c) 2010 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
