var  AppRouter = Backbone.Router.extend({  
    routes : {  
        ''  :  'main' ,  
        'topic'  :  'renderList' ,  
        'topic/:id'  :  'renderDetail' ,  
        '*error'  :  'renderError'  
    },  
    main :  function () {  
        console.log( '應用入口方法' );  
    },  
    renderList :  function () {  
        console.log( '渲染列表方法' );  
    },  
    renderDetail :  function (id) {  
        console.log( '渲染詳情方法, id為: '  + id);  
    },  
    renderError :  function (error) {  
        console.log( 'URL錯誤,錯誤信息: '  + error);  
    }  
});  
  
var  router =  new  AppRouter();  
Backbone.history.start();  
