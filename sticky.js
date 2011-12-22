/*
Sticky - Simple Event Notification
Version: 2.0
Author: CounterAgent (Jonathan Brimer)
Created: December 21, 2011
Project URL: https://github.com/counteragent/Sticky
Author URL: http://beoriginal.com
Author Twitter: http://twitter.com/CounterAgent

Forked from:
Sticky v1.0 by Daniel Raftery
https://github.com/ThrivingKings/Sticky
http://thrivingkings.com/sticky
http://twitter.com/ThrivingKings
*/

(function($){
	
	// Using it without an object
	$.sticky = function(note, options, callback){
		return $.fn.sticky(note, options, callback);
	};
	
	$.fn.sticky = function(note, options, callback){
		
		// Default settings
		var settings = {
			'speed'			:	'fast',	// animation slide speed: fast, slow, or integer
			'duplicates'	:	true, // whether to allow duplicate notes or not: true or false
			'autoClose'		:	5000, // will a note stay open or close by itself, and how fast: integer or false
			'imagePath'		:	'', // path to the folder for the 'close.png', leave off the trailing slash (if no path is specified a div tag will be used instead of an img tag)
			'position'		:	'top-right' // where to diplay the note: top-left, top-right, bottom-left, or bottom-right, top-center
		};
		
		// NOTE! position only works on the first sticky called on a page
		// if you specify another position after setting and calling a sticky it will use the initially defined position
		
		// Passing in the object instead of specifying a note
		if(!note) note = this.html();
		
		if(options) $.extend(settings, options);
		
		// Variables
		var display = true;
		var sped = settings.speed;
		var dup = 'no';
		var closeit = settings.autoClose;
		var path = settings.imagePath;
		var pos = settings.position;
		var uniqID = 'sticky-' + Math.floor(Math.random()*99999); // Somewhat of a unique ID
		
		var closer = function(){
			$('#' + $(this).attr('rel')).dequeue().fadeOut(sped);
		};
		
		// Handling duplicate notes and IDs
		$('.sticky-note').each(function(){
			if($(this).html() == note && $(this).is(':visible')){
				dup = 'yes';
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
			$('body').append('<div class="sticky-queue ' + pos + '"></div>');
		}
		
		// if position is set to center calculate the position
		if(pos == 'top-center'){
			$('.top-center').css({left:'50%',margin:'0 0 0 -'+($('.top-center').width() / 2)+'px'});
		}
		
		// Can the note be displayed?
		if(display){
			// Building and inserting sticky note
			$('.sticky-queue').prepend('<div class="sticky border-' + pos + '" id="' + uniqID + '"></div>');
			
			// if the imagePath is specified use that, otherwise just use a DIV with the .sticky-close class
			if(path){
				$('#' + uniqID).append('<img src="' + path + '/close.png" class="sticky-close" rel="' + uniqID + '" title="Close" />');
			} else {
				$('#' + uniqID).append('<div class="sticky-close" rel="' + uniqID + '" title="Close">');
			}
			
			$('#' + uniqID).append('<div class="sticky-note" rel="' + uniqID + '">' + note + '</div>');
			
			// Smoother animation
			var height = $('#' + uniqID).height();
			$('#' + uniqID).css('height', height);
			
			// slide the new note down into position
			$('#' + uniqID).slideDown(sped);
			display = true;
		}
		
		// Listeners
		$('.sticky').ready(function(){
			// If 'autoClose' is enabled, set a timer to close the sticky
			if(closeit){
				$('#' + uniqID).delay(closeit).fadeOut(sped);
			}
		});
		
		// Closing a sticky
		$('.sticky-close').click(closer);
		
		// Callback data
		var response = {
			'id'		:	uniqID,
			'duplicate'	:	dup,
			'displayed'	: 	display,
			'position'	:	position
		}
		
		// Callback function
		if(callback){
			callback(response);
		} else {
			return(response);
		}
	}
})(jQuery);