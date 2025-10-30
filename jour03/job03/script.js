$(document).ready(function() {
	let isAnimating = false;

	function buildBoard() {
		const $container = $('#puzzle-container').empty();
		for (let i = 1; i <= 8; i++) {
			const $slot = $('<div>').addClass('puzzle-slot').attr('data-pos', i);
			const $img = $('<img>').attr('src', './' + i + '.png').attr('data-id', i);
			$slot.append($img);
			$container.append($slot);
		}
		const $emptySlot = $('<div>').addClass('puzzle-slot empty').attr('data-pos', 9);
		$container.append($emptySlot);
	}

	function shuffleBoard() {
		for (let i = 0; i < 150; i++) {
			const $emptySlot = $('.empty');
			const $neighbors = getNeighbors($emptySlot);
			const $randomNeighbor = $neighbors.eq(Math.floor(Math.random() * $neighbors.length));
			instantSwap($randomNeighbor, $emptySlot);
		}
	}

	function initClickHandlers() {
		$('#puzzle-container').off('click').on('click', '.puzzle-slot:not(.empty)', function() {
			if ($('#message-area').hasClass('win') || $('body').hasClass('solving') || isAnimating) {
				return;
			}
			const $clickedSlot = $(this);
			const $emptySlot = $('.empty');

			if (isAdjacent($clickedSlot, $emptySlot)) {
				swapSlots($clickedSlot, $emptySlot, checkWin);
			}
		});
	}

	function isAdjacent($slot1, $slot2) {
		const pos1 = parseInt($slot1.attr('data-pos'));
		const pos2 = parseInt($slot2.attr('data-pos'));
		const diff = Math.abs(pos1 - pos2);
		if (diff === 3) return true;
		if (diff === 1) {
			const row1 = Math.floor((pos1 - 1) / 3);
			const row2 = Math.floor((pos2 - 1) / 3);
			return row1 === row2;
		}
		return false;
	}

	function swapSlots($slot1, $slot2, onCompleteCallback) {
		if (isAnimating) return;
		isAnimating = true;
		const $img = $slot1.find('img');
		const pos1 = $slot1.offset();
		const pos2 = $slot2.offset();
		const deltaX = pos2.left - pos1.left;
		const deltaY = pos2.top - pos1.top;

		$img.animate({ left: deltaX, top: deltaY }, 140, 'swing', () => {
				$img.css({ top: 0, left: 0 });

				$slot2.append($img);

				$slot1.toggleClass('empty');
				$slot2.toggleClass('empty');

				isAnimating = false;

				if (onCompleteCallback) {
					onCompleteCallback();
				}
			}
		);
	}

	function instantSwap($slot1, $slot2) {
		const tempContent = $slot1.html();
		$slot1.html($slot2.html());
		$slot2.html(tempContent);
		$slot1.toggleClass('empty');
		$slot2.toggleClass('empty');
	}


	function getNeighbors($slot) {
		return $('.puzzle-slot').filter(function() {
			return isAdjacent($(this), $slot);
		});
	}

	function checkWin() {
		let isWin = true;
		for (let i = 1; i <= 8; i++) {
			const $slot = $('#puzzle-container .puzzle-slot[data-pos="' + i + '"]');
			const $img = $slot.find('img');
			if ($img.length === 0 || $img.attr('data-id') != i) {
				isWin = false;
				break;
			}
		}

		if (isWin) {
			const $emptySlot = $('.empty');
			if ($emptySlot.length > 0) {
				const $img9 = $('<img>').attr('src', './9.png').attr('data-id', 9);
				$emptySlot.append($img9);
				$emptySlot.removeClass('empty');
			}
			$('#message-area').text("You Win!").addClass('win');
		}
	}

	$('button:not(#solve-btn)').click(function() {
		buildBoard();
		shuffleBoard();
		$('#message-area').empty().removeClass('win');
		initClickHandlers();
	});

	$('#solve-btn').click(function() {
		if ($('body').hasClass('solving') || $('#message-area').hasClass('win') || isAnimating) {
			return;
		}
		$('body').addClass('solving');
		$('#solve-btn').text('Solving...').prop('disabled', true);
		$('button:not(#solve-btn)').prop('disabled', true);

		const solutionPath = solvePuzzle();

		if (solutionPath) {
			animateSolution(solutionPath);
		} else {
			console.log("Error: Could not find a solution.");
			resetSolverUI();
		}
	});

	function resetSolverUI() {
		$('body').removeClass('solving');
		$('#solve-btn').text('Auto-Solve').prop('disabled', false);
		$('button:not(#solve-btn)').prop('disabled', false);
	}

	function solvePuzzle() {
		const startState = getStateFromDOM();
		const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
		const startNode = {
			state: startState,
			g: 0,
			h: calculateHeuristic(startState),
			f: calculateHeuristic(startState),
			parent: null
		};
		let openSet = [startNode];
		let closedSet = new Set();
		closedSet.add(stateToString(startState));
		while (openSet.length > 0) {
			openSet.sort((a, b) => a.f - b.f);
			let currentNode = openSet.shift();
			if (stateToString(currentNode.state) === stateToString(goalState)) {
				return reconstructPath(currentNode);
			}
			let emptyIndex = currentNode.state.indexOf(0);
			let emptyPos = emptyIndex + 1;
			let $emptySlotDOM = $(`#puzzle-container .puzzle-slot[data-pos="${emptyPos}"]`);
			let $neighborsDOM = getNeighbors($emptySlotDOM);
			$neighborsDOM.each(function() {
				let $neighborDOM = $(this);
				let neighborPos = parseInt($neighborDOM.attr('data-pos'));
				let neighborIndex = neighborPos - 1;
				let newState = [...currentNode.state];
				newState[emptyIndex] = newState[neighborIndex];
				newState[neighborIndex] = 0;
				let newStateStr = stateToString(newState);
				if (closedSet.has(newStateStr)) {
					return;
				}
				closedSet.add(newStateStr);
				let g = currentNode.g + 1;
				let h = calculateHeuristic(newState);
				let f = g + h;
				let neighborNode = {
					state: newState,
					g: g,
					h: h,
					f: f,
					parent: currentNode
				};
				openSet.push(neighborNode);
			});
		}
		return null;
	}

	function getStateFromDOM() {
		let state = [];
		for (let i = 1; i <= 9; i++) {
			const $slot = $(`#puzzle-container .puzzle-slot[data-pos="${i}"]`);
			if ($slot.hasClass('empty')) {
				state.push(0);
			} else {
				const id = parseInt($slot.find('img').attr('data-id'));
				state.push(id);
			}
		}
		return state;
	}

	function stateToString(state) {
		return state.join(',');
	}

	function calculateHeuristic(state) {
		let totalDistance = 0;
		for (let i = 0; i < 9; i++) {
			let value = state[i];
			if (value === 0) continue;
			let currentPos = i;
			let goalPos = value - 1;
			let currentX = currentPos % 3;
			let currentY = Math.floor(currentPos / 3);
			let goalX = goalPos % 3;
			let goalY = Math.floor(goalPos / 3);
			totalDistance += Math.abs(currentX - goalX) + Math.abs(currentY - goalY);
		}
		return totalDistance;
	}
	function reconstructPath(node) {
		let path = [];
		while (node.parent) {
			path.push(node.state);
			node = node.parent;
		}
		return path.reverse();
	}

	function animateSolution(path) {
		let moveIndex = 0;
		function executeMove() {
			if (moveIndex >= path.length) {
				checkWin();
				resetSolverUI();
				return;
			}
			let $oldEmpty = $('.empty');
			let $tileToMove = $(`#puzzle-container img[data-id="${path[moveIndex][parseInt($oldEmpty.attr('data-pos')) - 1]}"]`).parent();

			moveIndex++;
			swapSlots($tileToMove, $oldEmpty, executeMove);
		}
		executeMove();
	}

	buildBoard();
	shuffleBoard();
	initClickHandlers();
});