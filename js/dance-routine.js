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
					'<li class="step step-' + stepId + ' removable">' +
						'<ul/>' +
						'<span class="remove">X</span>' +
					'</li>'
				);

				step.split(' ').forEach(function (move) {
					var moveId = ++uid;
					$step.find('ul').append(
						'<li class="move move-' + moveId + ' removable">' +
							'<span>' + move + '</span>' +
							'<span class="remove">X</span>' +
						'</li>'
					);
				});
				$list.append($step);
			});
			_$root.append($list);
		}

		function _getTargetType($el) {
			if ($el.hasClass('move')) {
				return 'move';
			} else if ($el.hasClass('step')) {
				return 'step';
			} else {
				return null;
			}
		}

		function _bindEvents() {
			_$root.on('click', '.remove', function (e) {
				var $target = $(e.target).parent().addClass('removed');
				var type = _getTargetType($target);

				if (type === 'move') {
					_deleteMove(id);
				} else if (type === 'step') {
					_deleteStep(id);
				}
			});
		}

		function _deleteMove(id) {
			// 
		}

		function _deleteStep(id) {
			// 
		}

		this.getDanceSteps = _getDanceSteps;
		this.get$Root = _get$Root;

		_init(params);
		params = null;
	}

	global.DanceRoutine = DanceRoutine;
})(this, jQuery);
