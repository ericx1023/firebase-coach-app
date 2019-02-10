// import $ from 'jquery';

$(function () {
  var HeaderView = Backbone.View.extend({
    initialize: function(){
      this.render();
    },
    template: Handlebars.compile(
        '<p class="header">' +
          'Hello: {{displayName}}' +
        '</p>'
    ),
    render: function () {
      this.$el.html(this.template(this.model));
      return this;
    }
  })

  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      window.location.href = "login.html";
    }else {
      new HeaderView({
        model: user,
        el: $('#header')
      });
    }
  })
  var coachesRef = firebase.database().ref("coaches");
  var Coach = Backbone.Model.extend({});
  var CoachCollection = Backbone.Collection.extend({
    model: Coach
  });

  coachesRef.on("value", function (snapshot) {
    var coaches = snapshot.val();
    if (_.size(coaches) > 0) {
      var coachArr = [];
      _.each(coaches, function (e) {
        coachArr.push(new Coach(e))
      })
      var coachCollection = new CoachCollection(coachArr)

    }
    var CoachListView = Backbone.View.extend({
      initialize: function () {
        _.bindAll(this, 'render');
        this.collection.bind('change', this.render);

        this.render();
      },
      className: "document-row",
      events: {
        "click .logout":          "logout",
      },
    
      template: Handlebars.compile(
        '{{#each models}}'+
        '<li>' +
          '<img src="{{attributes.url}}" />' +
          '<p>' +
            '<a href="coach.html?id={{attributes.key}}">' +
            'Name: {{attributes/name}}' +
            '</a>' +
          '</p>' +
          '<p>' +
            'Age: {{attributes/age}}' +
          '</p>' +
        '</li>'+
        '{{/each}}'
      ),
      collection: coachCollection,
      render: function () {
        this.$el.html(this.template(this.collection));
        return this;
      }
    });
    var coach_view = new CoachListView({ el: $("#coach-list") });
  });
});
