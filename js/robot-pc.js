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
		var _timimg;
		var _routine;

		var _config = {
			animationRoutine : ['lazy'], // he will just have one lazy move
			animationLength : 30000, // length of the animation play time
			$robot : null // parent jquery robot object
		};
		var _init = function() {
			console.log("robot's got a heartbeat");
			$.extend(_config, config);
			_routine = _config.animationRoutine;
			_bindRobot();

		};

		var _bindRobot = function() {
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

			var timer = Math.floor(_config.animationLength / _routine.length);

			$('body').addClass('nowdancing');
			_$slideMenu.removeClass('open');
			_config.$robot.removeClass().addClass('body');
			$(".stage div").css('transition','all ' + timer + 'ms ease-in-out');
			var routine = _routine;

			_$title.addClass('fadeIn');
			setTimeout(function() { _$title.addClass('fadeOut'); }, timer*routine.length/2);
			setTimeout(function() { _$title.removeClass(); }, timer*routine.length);
			for (i = 0; i < routine.length; i++) {
				(function(thisRoutine, intv) {
					_timimg = setTimeout(function() {
						if(intv > 0) {
							_config.$robot.removeClass(thisRoutine[intv-1]);
						}
						_config.$robot.addClass(thisRoutine[intv]);
						if (intv == routine.length - 1) {
							setTimeout(function() {
								_config.$robot.removeClass().addClass('body');
								$('body').removeClass('nowdancing');
							}, 5000);
						}
					}, timer * (i));
				})(routine, i);
			}
			_playSong();
			
			setTimeout(function() {
				_$music.empty();
			}, _config.animationLength);

		};

		var _stopRobotAnimation = function() {
		};

		var _playSong = function () {
			_$music.empty();
			_$music.append('<audio src="music/'+ _currentSong + '.mp3" autoplay="true" ></audio>');
		};

		this.setRoutine = function (routine) {
			_routine = routine.slice();
		};
		this.start = _startRobotAnimation;
		this.stop = _stopRobotAnimation;

		_init();

	};


	var tshirts = ["oneDirection", "appNexus", "frozen", "olaf", "mickey", "mets", "yankees", "nike"].sort();

	var justPatterns = ["triangle", "arrows", "hearts", "table", "stripe", "plaid", "grid", "stars"].sort();

	var justColor = ["white", "purple", "teal", "black", "red", "orange", "blue", "green"].sort();

	var hair = ["hair1", "hair2", "hair3", "hair4"];

	var colorList = justPatterns.concat(justColor);

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
		var allOptions = colorList.concat(tshirts);
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

	$(".head").on("click", ".face", function() {
		el = $(this);

		for (var i=0;i<hair.length;i++){
			el.removeClass(hair[i]);
		}

		pickColor(hair);
	});


	return robot;

})(jQuery);
