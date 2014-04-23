(function (global, $) {
	var uid = 0;

	function DanceRoutine(params) {
		var _danceSteps;
		var _$root;

		function _init(params) {
			if (typeof params !== 'object') {
				params = {};
			}
			_danceSteps = params.danceSteps || [];
			_$root = $('<div class="DanceRoutine"/>');
			_render();
			_bindEvents();
		}

		function _get$Root() {
			return _$root;
		}

		function _getDanceSteps() {
			return _danceSteps;
		}

		function _render() {
			var $list = $('<ul/>');

			_danceSteps.forEach(function (step) {
				var stepId = ++uid;
				var $step = $(
					'<li class="step step-' + stepId + '">' +
						'<ul/>' +
						'<span class="remove">X</span>' +
					'</li>'
				);

				step.split(' ').forEach(function (move) {
					var moveId = ++uid;
					$step.find('ul').append(
						'<li class="move move-' + moveId + '">' +
							'<span>' + move + '</span>' +
							'<span class="remove">X</span>' +
						'</li>'
					);
				});
				$list.append($step);
			});
			_$root.append($list);
		}

		function _bindEvents() {
			_$root.on('click', '.remove', function (e) {
				console.log($(e.target).parent().get(0));
			});
		}

		this.getDanceSteps = _getDanceSteps;
		this.get$Root = _get$Root;

		_init(params);
		params = null;
	}

	global.DanceRoutine = DanceRoutine;
})(this, jQuery);