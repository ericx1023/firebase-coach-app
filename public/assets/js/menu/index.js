var MenuView = Backbone.View.extend({
    initialize: function () {
        this.render();
    },
    template: Handlebars.compile(
        '<ul class="nav flex-column">'+
            '<li class="nav-item">'+
            '    <a class="nav-link active" href="#">Active</a>'+
            '</li>'+
            '<li class="nav-item">'+
            '    <a class="nav-link" href="#">Link</a>'+
            '</li>'+
            '<li class="nav-item">'+
            '    <a class="nav-link" href="#">Link</a>'+
            '</li>'+
            '<li class="nav-item">'+
            '    <a class="nav-link disabled" href="#">Disabled</a>'+
            '</li>'+
        '</ul>'
    ),
    render: function () {
        this.$el.html(this.template());
        return this;
      }
})
export default MenuView;