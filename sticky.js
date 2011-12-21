// Sticky v1.0 by Daniel Raftery
// http://thrivingkings.com/sticky
//
// http://twitter.com/ThrivingKings

/*
Branched by CounterAgent (Jonathan Brimer)
https://github.com/counteragent/Sticky
Sticky v2.0
December 21, 2011
http://beoriginal.com
http://twitter.com/CounterAgent
*/

(function($){
	
	// Using it without an object
	$.sticky = function(note, options, callback){
		return $.fn.sticky(note, options, callback);
	};
	
	$.fn.sticky = function(note, options, callback){
		
		// Default settings
		var settings = {
			'speed'			:	'fast',	// animations: fast, slow, or integer
			'duplicates'	:	true, // true or false
			'autoclose'		:	5000, // integer or false
			'imagePath'		:	'', // images path
			'position'		:	'top-left' // top-left, top-right, bottom-left, or bottom-right, top-center
		};
		
		// NOTE! position only works on the first sticky called on a page
		// if you specify another position after setting and calling a sticky it will use the initially defined position
		
		var closer = function(){
			$('#' + $(this).attr('rel')).dequeue().fadeOut(settings.speed);
		};
		
		// Passing in the object instead of specifying a note
		if(!note){
			note = this.html();
		}
		
		if(options){
			$.extend(settings, options);
		}
		
		var position = settings.position;
		
		// Variables
		var display = true;
		var duplicate = 'no';
		
		// Somewhat of a unique ID
		var uniqID = 'sticky-' + Math.floor(Math.random()*99999);
		
		// Handling duplicate notes and IDs
		$('.sticky-note').each(function(){
			if($(this).html() == note && $(this).is(':visible')){
				duplicate = 'yes';
				if(!settings.duplicates){
					display = false;
				}
			}
			if($(this).attr('id')==uniqID){
				uniqID = Math.floor(Math.random()*9999999);
			}
		});
		
		// Make sure the sticky queue exists
		if(!$('body').find('.sticky-queue').html()){
			$('body').append('<div class="sticky-queue ' + position + '"></div>');
		}
		
		if(settings.position == 'top-center')
		$('.top-center').css({left:'50%',margin:'0 0 0 -'+($('.top-center').width() / 2)+'px'});
		
		// Can it be displayed?
		if(display){
			// Building and inserting sticky note
			$('.sticky-queue').prepend('<div class="sticky border-' + position + '" id="' + uniqID + '"></div>');
			
			// if the imagePath is specified use that, otherwise just use a DIV with the .sticky-close class
			if(settings.imagePath){
				$('#' + uniqID).append('<img src="' + settings.imagePath + '/close.png" class="sticky-close" rel="' + uniqID + '" title="Close" />');
			} else {
				$('#' + uniqID).append('<div class="sticky-close" rel="' + uniqID + '" title="Close">');
			}
			
			$('#' + uniqID).append('<div class="sticky-note" rel="' + uniqID + '">' + note + '</div>');
		
			// Smoother animation
			var height = $('#' + uniqID).height();
			$('#' + uniqID).css('height', height);
			
			$('#' + uniqID).slideDown(settings.speed);
			display = true;
		}
		
		// Listeners
		$('.sticky').ready(function(){
			// If 'autoclose' is enabled, set a timer to close the sticky
			if(settings.autoclose){
				$('#' + uniqID).delay(settings.autoclose).fadeOut(settings.speed);
			}
		});
		// Closing a sticky
		$('.sticky-close').click(closer);
		
		// Callback data
		var response = {
			'id'		:	uniqID,
			'duplicate'	:	duplicate,
			'displayed'	: 	display,
			'position'	:	position
		}
		
		// Callback function?
		if(callback){
			callback(response);
		} else {
			return(response);
		}
	}
})(jQuery);