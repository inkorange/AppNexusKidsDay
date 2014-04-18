var robot;

(function($) {
	robot = function(config) {
		var _config = {
			animationRoutine : ['lazy'], // he will just have one lazy move
			animationLength : 6000, // length of the animation play time
			$robot : null // parent jquery robot object
		};
		var _init = function() {
			console.log("robot's got a heartbeat");
			$.extend(_config, config);
			console.log(_config.animationRoutine);

			_bindRobot();

		};

		var _bindRobot = function() {
			$(document).keyup(function(e) {
				if(e.keyCode == 32) {
					_startRobotAnimation();
				}
			});
		};

		var _startRobotAnimation = function() {
			var timer = Math.floor(_config.animationLength / _config.animationRoutine.length);
			$(".stage div").css('transition','all ' + timer + 'ms');
			var routine = _config.animationRoutine;
			for (i = 0; i < routine.length; i++) {
				(function(thisRoutine, intv) {
					setTimeout(function() {
						if(intv > 0) {
							_config.$robot.removeClass(thisRoutine[intv-1]);
						}
						_config.$robot.addClass(thisRoutine[intv]);
					}, timer * (i));
				})(routine, i);
			}

		};

		_init();

	};

	return robot;

})(jQuery);


