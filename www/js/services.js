var ionicApp=angular.module('ionicApp.services', [])

.service('getFeeds', function()
{
      this.getValue = function(selectedItem) 
      {
        var finalVal = [];

         if(selectedItem == 'HTML5')
         {
            finalVal = [{id:1, name:"HTML5_Concepts",thumb:"img/idea.png",subtitle:"subtitle goes here."},{id:2,name:"HTML5 Blogs",thumb:"img/blog.png",subtitle:"subtitle goes here."}
            ,{id:3,name:"RSS Feed",thumb:"img/rss.png",subtitle:"subtitle goes here."},{id:4, name:"HTML5 Quiz",thumb:"img/quiz.png",subtitle:"subtitle goes here."}]
         }
         else if(selectedItem == 'CSS')
         {
             finalVal = [{id:1,name:"CSS_Concepts",thumb:"img/idea.png",subtitle:"subtitle goes here."},{id:2, name:"CSS Blogs",thumb:"img/blog.png",subtitle:"subtitle goes here."}
            ,{ id:3,name:"RSS Feed",thumb:"img/rss.png",subtitle:"subtitle goes here."},{id:4,name:"Quiz",thumb:"img/quiz.png",subtitle:"subtitle goes here."}]
         }
         else if(selectedItem == 'JavaScript')
         {
            finalVal = [{id:1,name:"JavaScript_Concepts",thumb:"img/idea.png",subtitle:"subtitle goes here."},{id:2,name:"Javascript Blog",thumb:"img/blog.png",subtitle:"subtitle goes here."}
            ,{id:3,name:"RSS Feed",thumb:"img/rss.png",subtitle:"subtitle goes here."},{id:4,name:"Quiz",thumb:"img/quiz.png",subtitle:"subtitle goes here."}]
         }
         else 
         {
            finalVal = [{id:1, name:"AngularJS_Concepts",thumb:"img/idea.png",subtitle:"subtitle goes here."},{id:2,name:"Blog",thumb:"img/blog.png",subtitle:"subtitle goes here."}
            ,{id:3,name:"RSS Feed",thumb:"img/rss.png",subtitle:"subtitle goes here."},{id:4,name:"Quiz",thumb:"img/quiz.png",subtitle:"subtitle goes here."}]
         }

         return finalVal;
      }
})

.service('bloglistService', function($http)
{
  var service = this,
      baseUrl = 'data/blogs.json';
        
  function getUrl() {
            return  baseUrl 
        }      

  service.getBlogs = function () {
            return $http.get(getUrl());
        };

})


.service('ItemsModel', function ($http) {
        var service = this,
            baseUrl = 'data/data.json';
            

        function getUrl() {
            return  baseUrl 
        }

        /*function getUrlForId(id) {
            return getUrl() + id;
        }*/

        service.all = function () {
            return $http.get(getUrl());
        };

        /*service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };

        service.update = function (id, object) {
            return $http.put(getUrlForId(id), object);
        };

        service.delete = function (id) {
            return $http.delete(getUrlForId(id));
        };*/
    })

.service('helperService', function () {
    this.hello = function () {
        return "Hello World";
    };
    this.toBool = function (val) {
        if (val == 'undefined' || val == null || val == '' || val == 'false' || val == 'False')
            return false;
        else if (val == true || val == 'true' || val == 'True')
            return true;
        else
            return 'unidentified';
    };
    this.shuffle = function (array) {
        var currentIndex = array.length, temp, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
        return array;
    }
    this.extend = function (out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }
        return out;
    };
})
.service('rssFeedsService', function($http, $q, _, $base64)
{
  function getFeed(feedId) {
      if (!feedList.length) {
        getFeedList();
      }

      var deferred = $q.defer();

      var url = _.find(feedList, 'id', feedId).url;

      $http.get('http://ajax.googleapis.com/ajax/services/feed/load', {
        params: {
          v: '1.0',
          q: url,
          num: 100
        }
      })
      .success(function(response) {
        entries = response.responseData.feed.entries;
        _.each(entries, function(entry) {
          var length = entry.content.indexOf('<p>The post');
          if (length > 0) {
            entry.content = entry.content.substring(0, length);
          }
          entry.hash = $base64.encode(entry.link);
        });
        deferred.resolve(entries);
      })
      .error(function() {
        deferred.reject();
      });

      return deferred.promise;
    }

    function getArticle(feedId, hash) {
      if (!entries.length) {
        var deferred = $q.defer();

        getFeed(feedId)
          .then(function() {
            var entry = _.find(entries, 'hash', hash);
            deferred.resolve(entry);
          });

        return deferred.promise;
      }

      var entry = _.find(entries, 'hash', hash);
      return $q.when(entry);
    }

    function getFeedList() {
      entries = [];

      // Wired RSS Feeds
      // http://www.wired.com/about/rss_feeds/
      //

      feedList = [{
        id: 1,
        title: 'Top Stories',
        url: 'http://feeds.wired.com/wired/index'
      }, {
        id: 2,
        title: 'Business',
        url: 'http://www.wired.com/category/business/feed/'
      }, {
        id: 3,
        title: 'Design',
        url: 'http://www.wired.com/category/design/feed/'
      }, {
        id: 4,
        title: 'Entertainment',
        url: 'http://www.wired.com/category/underwire/feed/'
      }, {
        id: 5,
        title: 'Tech',
        url: 'http://www.wired.com/category/gear/feed/'
      },  {
        id: 6,
        title: 'Product Reviews',
        url: 'http://www.wired.com/category/reviews/feed/'
      },  {
        id: 7,
        title: 'Science',
        url: 'http://www.wired.com/category/science/science-blogs/feed/'
      }];

      return $q.when(feedList);
    }
  }
);


