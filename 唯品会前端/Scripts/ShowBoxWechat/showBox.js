function showBox(intype,outtype,boxid,closeclass,fn) {
	$('.afix').show();
	$('#'+boxid).addClass('animated '+intype).show();

	$('.'+closeclass).click(function() {
		$('.'+closeclass).off();
		$('#'+boxid).removeClass('animated '+intype).addClass('animated '+outtype).one('webkitAnimationEnd', function () {
			$('.afix').hide();
			$('#'+boxid).removeClass('animated '+outtype).hide();
			if(fn) {
				eval(fn+'()');
			}
		});
	});
}