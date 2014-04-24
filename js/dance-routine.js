(function (global, $) {
	var uid = 0;

	function DanceRoutine(params) {
		var _mappedSteps;
		var _selectedStep;
		var _$root;
		var _$panelHandle = $('<div class="routine-handle"><<</div>');

		function _init(params) {
			if (typeof params !== 'object') {
				params = {};
			}
			_mappedSteps = _mapSteps(params.danceSteps || []);
			_selectedStep = null;
			_$root = $('<div class="DanceRoutine"/>');
			_bind();
			_render();
		}
		function _bind() {
			_$panelHandle.click(function() {
				console.log(_$root);
				_$root.toggleClass('close');
			});
		}
		function _get$Root() {
			return _$root;
		}

		function _getDanceSteps() {
			var steps = [];

			Object.keys(_mappedSteps).forEach(function (stepId) {
				var moves = [];

				Object.keys(_mappedSteps[stepId].moves).forEach(function (moveId) {
					moves.push(_mappedSteps[stepId].moves[moveId].className);
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
						className: move
					};
				});
			});

			return map;
		}

		function _resetHighlights() {
			_$root.find('.step').removeClass('selected');
		}

		function _render() {
			var $list = $('<ul/>');

			Object.keys(_mappedSteps).forEach(function (stepId) {
				var step = _mappedSteps[stepId];
				var $step = $(
					'<li class="step step-' + stepId + '">' +
						'<ul/>' +
						'<span class="remove remove-whole-block">X</span>' +
					'</li>'
				).appendTo($list).on('click', function (e) {
					var $target = $(e.target);

					if ($target.hasClass('remove')) {
						if ($target.parent().hasClass('step')) {
							_deleteStep(stepId);
							_render();
						}
					} else {
						_resetHighlights();

						if (stepId === _selectedStep) {
							_selectedStep = null;
						} else {
							_selectedStep = stepId;
							$(this).addClass('selected');
						}
					}
				});

				if (stepId === _selectedStep) {
					$step.addClass('selected');
				}

				Object.keys(step.moves).forEach(function (moveId) {
					var move = step.moves[moveId];
					var $move = $(
						'<li class="move move-' + moveId + '">' +
							'<span>' + move.className + '</span>' +
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
			_$root.empty().append($list).append(_$panelHandle);
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
			_selectedStep = null;
		}

		function _addMove(moveClass) {
			var stepId;
			var moveId;

			if (_selectedStep === null) {
				stepId = ++uid;
				_mappedSteps[stepId] = {
					moves: {}
				};
			} else {
				stepId = _selectedStep;
			}

			moveId = ++uid;
			_mappedSteps[stepId].moves[moveId] = {
				className: moveClass
			};
			_render();
		}

		this.addMove = _addMove;
		this.getDanceSteps = _getDanceSteps;
		this.get$Root = _get$Root;

		_init(params);
		params = null;
	}

	global.DanceRoutine = DanceRoutine;
})(this, jQuery);
