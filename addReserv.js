<!--Reserv.js-->
(function(){
var data = $("script[src*='addReserv.js']").attr('src').split('?')[1]; 
$.ajax({
  crossDomain: true,
  url: 'https://reserv-app.herokuapp.com/getmeta_json.php?'+data,
  dataType: "jsonp",
  header: {"Access-Control-Allow-Origin": "*"},
  success: function(response){
      //console.log(response['options']);
      var data = response['options'];
      data = data.split(',');
      $.each(data, function(index, value){
        var values = value.split(':');
	value = values[0];
	var classes = values[1];
        var url = window.location.href;
        if(url.indexOf('/products/') > -1 && value == 'product_page'){
          if($('.'+classes).length){
	    if(window.location.href.indexOf('?variant=') > -1){
		var product_url = window.location.href.split('?variant='); 
		product_url = product_url[0]+'.json';
	    } else {
	    	var product_url = window.location.href+'.json';
	    }
	    console.log(product_url);
		$.ajax({
		type: 'get',
		url: product_url,
		dataType: "jsonp",
		header: {"Access-Control-Allow-Origin": "*"},
		success: function(response){
			var product = response.product;
			var id = product.id;
			var name = product.title;
			var desc = product.body_html;
			var price = product.variants[0].price;
			var shipping = product.variants[0].requires_shipping;
			var tax = product.variants[0].taxable;
			if(product.image == null){
				var image = "";
			} else {
				var image = product.image.src;
			}
			var link = 'id='+id+'&name='+name+'&image='+image+'&description='+desc+'&price='+price+'&shipping='+shipping+'&tax='+tax;
			$('.'+classes).after('<a href="'+link+'" class="reserv_button">RESERV<br/><span>The New Layaway</span></a>');
		}
		});
          }
        } else if(url.indexOf('/collections/') > -1 && url.indexOf('/products/') === -1 && value == 'catalog_page'){
          if($('.'+classes).length){
	    var collection_url = window.location.href+'/products.json';
	    console.log(collection_url);
		$.ajax({
		crossDomain: true,
		url: collection_url,
		async: false,
		dataType: "jsonp",
		header: {"Access-Control-Allow-Origin": "*"},
		success: function(response){ 
			var product = response.products;
			$.each(product, function(index){
			var id = product[index].id;
			var name = product[index].title;
			var desc = product[index].body_html;
			var price = product[index].variants[0].price;
			var shipping = product[index].variants[0].requires_shipping;
			var tax = product[index].variants[0].taxable;
			if(product[index].images.length){
				var image = product[index].images[0].src;
			} else {
				var image = "";
			}
			alert($('body .'+classes).length);
			var link = 'id='+id+'&name='+name+'&image='+image+'&description='+desc+'&price='+price+'&shipping='+shipping+'&tax='+tax;
			console.log(link);
			$('.'+classes+':nth-child('+index+')').after('<a href="'+link+'" class="reserv_button">RESERV<br/><span>The New Layaway</span></a>');
			});
			
		}
		});
          }
        } else if(url.indexOf('/cart') > -1 && value == 'cart_page'){
          if($('.'+classes).length){
	   	var cart_url = window.location.href+'.json';
		$.ajax({
		type: 'get',
		url: cart_url,
		dataType: "jsonp",
		header: {"Access-Control-Allow-Origin": "*"},
		success: function(response){
			//console.log(response);
			var items = response.items;
			var itemsarray = [];
			$.each(items, function(index){
			var id = items[index].product_id;
			var name = items[index].product_title;
			var desc = items[index].product_description;
			var price = items[index].price;
			var shipping = items[index].requires_shipping;
			var image = items[index].image;
			var link = 'id='+id+'&name='+name+'&image='+image+'&description='+desc+'&price='+price+'&shipping='+shipping;
			itemsarray.push(link);
			});
			var Allitems = itemsarray.join(" | ");
			$('.'+classes).after('<a href="'+Allitems+'" class="reserv_button">RESERV<br/><span>The New Layaway</span></a>');
		}
		});
          }
        }
        
      });
  }
});
})();
