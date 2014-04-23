(function (global, $) {
	var uid = 0;

	function DanceRoutine(params) {
		var _mappedSteps;
		var _$root;

		function _init(params) {
			if (typeof params !== 'object') {
				params = {};
			}
			_mappedSteps = _mapSteps(params.danceSteps || []);
			_$root = $('<div class="DanceRoutine"/>');
			_render();
		}

		function _get$Root() {
			return _$root;
		}

		function _getDanceSteps() {
			var steps = [];

			Object.keys(_mappedSteps).forEach(function (stepId) {
				var moves = [];

				Object.keys(_mappedSteps[stepId].moves).forEach(function (moveId) {
					moves.push(_mappedSteps[stepId].moves[moveId].name);
				});
				steps.push(moves.join(' '));
			});
			return steps;
		}

		function _mapSteps(steps) {
			var map = {};

			steps.forEach(function (step) {
				var stepId = ++uid;

				map[stepId] = { moves: {} };
				step.split(' ').forEach(function (move) {
					var moveId = ++uid;

					map[stepId].moves[moveId] = {
						name: move
					};
				});
			});

			return map;
		}

		function _render() {
			var $list = $('<ul/>');

			Object.keys(_mappedSteps).forEach(function (stepId) {
				var step = _mappedSteps[stepId];
				var $step = $(
					'<li class="step step-' + stepId + '">' +
						'<ul/>' +
						'<span class="remove">X</span>' +
					'</li>'
				).appendTo($list).on('click', '.remove', function () {
					if ($(this).parent().hasClass('step')) {
						_deleteStep(stepId);
						_render();
					}
				});

				Object.keys(step.moves).forEach(function (moveId) {
					var move = step.moves[moveId];
					var $move = $(
						'<li class="move move-' + moveId + '">' +
							'<span>' + move.name + '</span>' +
							'<span class="remove">X</span>' +
						'</li>'
					).appendTo($step).on('click', '.remove', function () {
						$move.addClass('removed');
						window.setTimeout(function () {
							_deleteMove(stepId, moveId);
							if (Object.keys(step.moves).length === 0) {
								_deleteStep(stepId);
							}
							_render();
						}, 300);
					});

					move.$el = $move;
				});
				step.$el = $step;
			});
			_$root.empty().append($list);
		}

		function _deleteMove(stepId, moveId) {
			_mappedSteps[stepId].moves[moveId].$el.remove();
			delete _mappedSteps[stepId].moves[moveId];
		}

		function _deleteStep(stepId) {
			Object.keys(_mappedSteps[stepId].moves).forEach(function (moveId) {
				_deleteMove(stepId, moveId);
			});
			_mappedSteps[stepId].$el.remove();
			delete _mappedSteps[stepId];
		}

		this.getDanceSteps = _getDanceSteps;
		this.get$Root = _get$Root;

		_init(params);
		params = null;
	}

	global.DanceRoutine = DanceRoutine;
})(this, jQuery);
