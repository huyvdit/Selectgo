jQuery(function($) {

	"use strict";
	
	var cuisine_recipe = {};
	

	// recipe card list item ticked
	cuisine_recipe.recipe_list_ticked = function(){
	
		// recipe card list li click
		$('body').on('click', '.recipe-card-list li', function() {
			$(this).toggleClass('ticked');
		});	
	
	}
	
	
	// recipe card print
	cuisine_recipe.recipe_list_print = function(){
	
		$('body').on('click', '.recipe-card-print-options', function() { 
		
			$('.cuisine-recipe-card #recipe-card-print-options').slideToggle(250);
			
			$('.cuisine-recipe-card .recipe-card-print-options-open').toggle();
			
			$('.cuisine-recipe-card .recipe-card-print-options-close').toggle();
			
		});
		
		$('body').on('click', '#print-times-hide', function() { $('.cuisine-recipe-card .recipe-list-item-times').toggle(); });
		
		$('body').on('click', '#print-description-hide', function() { $('.cuisine-recipe-card .recipe-card-description').toggle(); });
		
		$('body').on('click', '#print-image-hide', function() { 
			
			$('.cuisine-recipe-card .recipe-card-image').toggle();
			
			$('.cuisine-recipe-details .col-xlarge-8').toggleClass("recipe-card-print-image-hidden");
		
		});
		
		$('body').on('click', '#print-ingredients-hide', function() { $('.cuisine-recipe-card .cuisine-recipe-ingredients').toggle(); });
		
		$('body').on('click', '#print-method-hide', function() { $('.cuisine-recipe-card .cuisine-recipe-instructions').toggle(); });
		
		$('body').on('click', '#print-notes-hide', function() { $('.cuisine-recipe-card .cuisine-recipe-card-notes').toggle(); });
		
		$('body').on('click', '#print-nutrition-hide', function() { $('.cuisine-recipe-card .cuisine-recipe-card-nutrition').toggle(); });
		

		// recipe card print button click
		$('body').on('click', '.recipe-card-print', function() {
		
			// get recipe title
			var recipe_title = $(".cuisine-recipe-card").find('.recipe-card-print-popup').attr('data-print-recipe-title');
			
			// create new window
			var recipe_print_window = window.open();
			
			// get page head section
			var page_head = $("head").html();
			
			// get recipe card html and remove elements
			var recipe_card_html = $(".cuisine-recipe-card")
			.clone(true)
			.find('.cuisine-recipe-details .recipe-card-video')
			.remove()
			.end()
			.prop('outerHTML'); 
			
			// empty top section variable
			var top_section = '';
			
			top_section += '<div class="cuisine-recipe-print-top">';

			top_section += '<div class="recipe-card-print print-recipe primary-button font-opensans-reg hov-bk" onclick="window.print(); return false;">Print</div>';
			
			top_section += '</div>';
			
			// write to new window
            recipe_print_window.document.write('<html>' + page_head + '<body > <link rel="stylesheet" href="../../../bundles/css/shared" type="text/css" media="all"> <link rel="stylesheet" href="../../../content/Default/default/catalog/product/template/css/1.0-recipe.css" type="text/css" media="all"> <div class="cuisine-recipe-print-page">' + top_section + recipe_card_html + '</div></body></html>');
			
			// modify new window title
			recipe_print_window.document.title = recipe_title;
			
		});
	
	}
	
	cuisine_recipe.recipe_list_ticked(); // List ticked
	cuisine_recipe.recipe_list_print(); // Recipe print
	
});