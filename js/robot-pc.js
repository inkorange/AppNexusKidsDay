var robot;

(function($) {
	robot = function(config) {
		var _$slideMenu = $(".moves");
		var _$title = $("h1.title");
		var _$music = $('.music');
		var _config = {
			animationRoutine : ['lazy'], // he will just have one lazy move
			animationLength : 15000, // length of the animation play time
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
			_$slideMenu.find(".handle").on('click', function() {
				_$slideMenu.toggleClass("open");
			});
			_$slideMenu.find("p").on('click', _applySTaticStyle);

			_$music.find('#hey-ya').on('click', function() {
				_playSong(1);
			});

		};

		var _applySTaticStyle = function(e) {
			var thisClick = $(e.currentTarget);
			var thisStyle = thisClick.attr('data-classname');
			var amremoving = thisClick.attr('data-remover');
			_config.$robot.removeClass().addClass('body ' + thisStyle);
			if(amremoving == 'true') {
				setTimeout(function() {
					_config.$robot.removeClass().addClass('body ');
				}, 700);
			}
		};

		var _startRobotAnimation = function() {
			var timer = Math.floor(_config.animationLength / _config.animationRoutine.length);
			$(".stage div").css('transition','all ' + timer + 'ms ease-in-out');
			var routine = _config.animationRoutine;

			_$title.addClass('fadeIn');
			setTimeout(function() { _$title.addClass('fadeOut'); }, timer*routine.length/2);
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

		var _playSong = function (songNumber) {
		};

		_init();

	};


	var colorList = ["red", "orange", "green", "blue", "triangle", "arrows", "hearts", "table", "stripe", "plaid", "grid"].sort();

	$("body").on("click", ".pickColor li", function() {

		for (var i=0;i<colorList.length;i++){
			el.removeClass(colorList[i]);
		}

		el.addClass($(this).html());
		$(".pickColor").remove();
		el = "";
	});

	var el = "";

	$("body").on("click", ".left-arm, .right-arm, .belly, .left-foot, .right-foot", function() {

		$(".pickColor").remove();

		var $list = $("<ul class='pickColor'></ul>");

		el = $(this);

		for (var i=0;i<colorList.length;i++){
			var $li = $("<li>"+colorList[i]+"</li>");
			$li.addClass(colorList[i]);
			$li.appendTo($list);
		}

		$list.appendTo("body");

		$list.css(
			{
				"top": el.offset().top-$list.height()-20,
				"left": el.offset().left-27
			}
		);
	});


	return robot;

})(jQuery);


