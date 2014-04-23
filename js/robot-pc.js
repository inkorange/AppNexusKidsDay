var robot;

(function($) {
	robot = function(config) {
		var _$slideMenu = $(".moves");
		var _$title = $("h1.title");
		var _$music = $('.music');
		var _$heyYa = _$music.find('#hey-ya');
		var _$oneDirection = _$music.find('#one-direction');
		var _$lorde = _$music.find('#lorde');
		var _currentSong = 'lorde';

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

			_$heyYa.on('click', function() {
				_currentSong = 'outkast';
			});
			_$lorde.on('click', function() {
				_currentSong = 'lorde';
			});
			_$oneDirection.on('click', function() {
				_currentSong = 'one-direction';
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
			_playSong();

		};

		var _playSong = function () {
			_$music.empty();
			_$music.append('<audio src="music/'+ _currentSong + '.mp3" autoplay="true" ></audio>');
		};

		_init();

	};


	var tshirts = ["oneDirection", "appNexus", "frozen", "olaf", "mickey", "mets", "yankees", "nike"];

	var justPatterns = ["triangle", "arrows", "hearts", "table", "stripe", "plaid", "grid"].sort();

	var justColor = ["white", "purple", "teal", "black", "red", "orange", "blue", "green"].sort();

	var colorList = justPatterns.concat(justColor).sort();

	$("body").on("click", ".pickColor li", function() {

		for (var i=0;i<colorList.length;i++){
			el.removeClass(colorList[i]);
		}

		el.addClass($(this).html());
		$(".pickColor").remove();
		el = "";
	});

	var el = "";

	var pickColor = function(colorList) {
		$(".pickColor").remove();

		var $list = $("<ul class='pickColor'></ul>");
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
	};


	$("body").on("click", ".belly", function() {
		el = $(this);
		var allOptions = colorList.concat(tshirts).sort();
		for (var i=0;i<allOptions.length;i++){
			el.removeClass(allOptions[i]);
		}
		pickColor(allOptions);
	});

	$("body").on("click", ".left-arm, .right-arm", function() {
		el = $(this);
		pickColor(colorList);
	});

	$("body").on("click", ".left-foot, .right-foot", function() {
		el = $(this);
		el.addClass("shoe");

		for (var i=0;i<justColor.length;i++){
			el.removeClass(justColor[i]);
		}

		pickColor(justColor);
	})


	return robot;

})(jQuery);


