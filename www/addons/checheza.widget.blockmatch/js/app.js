class Blockmatch extends Widget {

	constructor(specification) {
		super(specification);

		this.numberpals;
		this.levelsJSON = [
			{"maxValueRange":"3","barType":"2COLOR/BARS","chunking":"0","maxTimePerItem":"9","level":"0\r"},
			{"maxValueRange":"3","barType":"2COLOR/BARS/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"1\r"},
			{"maxValueRange":"3","barType":"2COLOR/BARS/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"2\r"},
			{"maxValueRange":"3","barType":"HIDDENBARIGHT/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"3\r"},
			{"maxValueRange":"3","barType":"NUMBERS","chunking":"0","maxTimePerItem":"9","level":"4\r"},
			{"maxValueRange":"3","barType":"NUMBERS","chunking":"0","maxTimePerItem":"8","level":"5\r"},
			{"maxValueRange":"3","barType":"NUMBERS","chunking":"0","maxTimePerItem":"7","level":"6\r"},
			{"maxValueRange":"3","barType":"NUMBERS","chunking":"0","maxTimePerItem":"6","level":"7\r"},
			{"maxValueRange":"5","barType":"2COLOR/BARS","chunking":"0","maxTimePerItem":"9","level":"8\r"},
			{"maxValueRange":"5","barType":"2COLOR/BARS/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"9\r"},
			{"maxValueRange":"5","barType":"2COLOR/BARS/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"10\r"},
			{"maxValueRange":"5","barType":"HIDDENBARIGHT/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"11\r"},
			{"maxValueRange":"5","barType":"NUMBERS","chunking":"0","maxTimePerItem":"9","level":"12\r"},
			{"maxValueRange":"5","barType":"NUMBERS","chunking":"0","maxTimePerItem":"8","level":"13\r"},
			{"maxValueRange":"5","barType":"NUMBERS","chunking":"0","maxTimePerItem":"7","level":"14\r"},
			{"maxValueRange":"5","barType":"NUMBERS","chunking":"0","maxTimePerItem":"6","level":"15\r"},
			{"maxValueRange":"10","barType":"2COLOR/BARS","chunking":"5","maxTimePerItem":"9","level":"16\r"},
			{"maxValueRange":"10","barType":"2COLOR/BARS/NUMBERS","chunking":"5","maxTimePerItem":"9","level":"17\r"},
			{"maxValueRange":"10","barType":"2COLOR/BARS/NUMBERS","chunking":"5","maxTimePerItem":"9","level":"18\r"},
			{"maxValueRange":"10","barType":"2COLOR/BARS/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"19\r"},
			{"maxValueRange":"10","barType":"HIDDENBARIGHT/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"20\r"},
			{"maxValueRange":"10","barType":"NUMBERS","chunking":"0","maxTimePerItem":"9","level":"21\r"},
			{"maxValueRange":"10","barType":"NUMBERS","chunking":"0","maxTimePerItem":"8","level":"22\r"},
			{"maxValueRange":"10","barType":"NUMBERS","chunking":"0","maxTimePerItem":"7","level":"23\r"},
			{"maxValueRange":"10","barType":"NUMBERS","chunking":"0","maxTimePerItem":"6","level":"24\r"},
			{"maxValueRange":"10","barType":"HIDDENBARIGHT/NUMBERS","chunking":"5","maxTimePerItem":"7","level":"25\r"},
			{"maxValueRange":"10","barType":"NUMBERS","chunking":"5","maxTimePerItem":"5","level":"26\r"},
			{"maxValueRange":"15","barType":"2COLOR/BARS","chunking":"5","maxTimePerItem":"9","level":"27\r"},
			{"maxValueRange":"15","barType":"2COLOR/BARS/NUMBERS","chunking":"5","maxTimePerItem":"9","level":"28\r"},
			{"maxValueRange":"15","barType":"2COLOR/BARS/NUMBERS","chunking":"10","maxTimePerItem":"9","level":"29\r"},
			{"maxValueRange":"15","barType":"2COLOR/BARS/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"30\r"},
			{"maxValueRange":"15","barType":"HIDDENBARIGHT/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"31\r"},
			{"maxValueRange":"15","barType":"NUMBERS","chunking":"0","maxTimePerItem":"9","level":"32\r"},
			{"maxValueRange":"15","barType":"NUMBERS","chunking":"0","maxTimePerItem":"8","level":"33\r"},
			{"maxValueRange":"15","barType":"NUMBERS","chunking":"0","maxTimePerItem":"7","level":"34\r"},
			{"maxValueRange":"15","barType":"NUMBERS","chunking":"0","maxTimePerItem":"6","level":"35\r"},
			{"maxValueRange":"15","barType":"NUMBERS","chunking":"0","maxTimePerItem":"5","level":"36\r"},
			{"maxValueRange":"10","barType":"NUMBERS","chunking":"5","maxTimePerItem":"5","level":"37\r"},
			{"maxValueRange":"20","barType":"2COLOR/BARS","chunking":"5","maxTimePerItem":"9","level":"38\r"},
			{"maxValueRange":"20","barType":"2COLOR/BARS/NUMBERS","chunking":"5","maxTimePerItem":"9","level":"39\r"},
			{"maxValueRange":"20","barType":"2COLOR/BARS/NUMBERS","chunking":"10","maxTimePerItem":"9","level":"40\r"},
			{"maxValueRange":"20","barType":"2COLOR/BARS/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"41\r"},
			{"maxValueRange":"20","barType":"HIDDENBARIGHT/NUMBERS","chunking":"0","maxTimePerItem":"9","level":"42\r"},
			{"maxValueRange":"20","barType":"NUMBERS","chunking":"0","maxTimePerItem":"8","level":"43\r"},
			{"maxValueRange":"20","barType":"NUMBERS","chunking":"0","maxTimePerItem":"7","level":"44\r"},
			{"maxValueRange":"20","barType":"NUMBERS","chunking":"0","maxTimePerItem":"6","level":"45\r"},
			{"maxValueRange":"20","barType":"NUMBERS","chunking":"0","maxTimePerItem":"5","level":"46\r"},
			{"maxValueRange":"10,15,20","barType":"2COLOR/BARS/NUMBERS","chunking":"5","maxTimePerItem":"9","level":"47\r"},
			{"maxValueRange":"10,15,20","barType":"2COLOR/BARS/NUMBERS","chunking":"5","maxTimePerItem":"8","level":"48\r"},
			{"maxValueRange":"10,15,20","barType":"2COLOR/BARS/NUMBERS","chunking":"5","maxTimePerItem":"7","level":"49\r"},
			{"maxValueRange":"10,15,20","barType":"NUMBERS","chunking":"0","maxTimePerItem":"7","level":"50\r"},
			{"maxValueRange":"10,15,20","barType":"NUMBERS","chunking":"0","maxTimePerItem":"6","level":"51\r"},
			{"maxValueRange":"10,15,20","barType":"NUMBERS","chunking":"0","maxTimePerItem":"5","level":"52"}];
	}

	initialize() {
		core.utils.adjustAspectRatio();

		setTimeout( () => {
			this.blockmatch = new BlockmatchClass(this.levelsJSON, 0);
			this.blockmatch.init();
		},100);

		core.utils.addExitButton();
   		new Audio(core.getActiveWidget().path + '/audio/stack_the_blocks.ogg').play();

	}

	preinit() {
		core.utils.adjustAspectRatio();
	}
}

class BlockmatchClass {

	constructor(levelsJSON, currentLevel) {

		/*
		var sounds = [];
		sounds.drop_bar = new Audio(core.getActiveWidget().path+'/audio/drop_bar.ogg');
		sounds.wrong_bar = new Audio(core.getActiveWidget().path+'/audio/wrong_bar.ogg');
		sounds.correct_bar = new Audio(core.getActiveWidget().path+'/audio/correct_bar.ogg');
		*/

		this.backgroundLoop = new SeamlessLoop();
		this.backgroundLoop.addUri(core.getActiveWidget().path+'/audio/background.ogg', 10000, "background");
/*
		this.backgroundLoop.callback(() => {
			this.startBackground();
		});
*/
		this.colorSets = [
			{ left: '#E9731C', right: '#1344D8' },
			{ left: '#18CD1A', right: '#E86BFF' },
			{ left: '#F1E334', right: '#8422DB' },
			{ left: '#0BF3C4', right: '#FE3A3A' }
		];

		this.sounds = [];
		this.sounds.drop_bar = new Audio(core.getActiveWidget().path+'/audio/releasing_log.ogg');	
		this.sounds.wrong_bar = new Audio(core.getActiveWidget().path+'/audio/wrong_bar.ogg');
		this.sounds.wrong_encouragement = new Audio(core.getActiveWidget().path + '/audio/oops_try_again.ogg');
		this.sounds.correct_bar = new Audio(core.getActiveWidget().path+'/audio/correct_bar.ogg');
		this.sounds.round_win = new Audio(core.getActiveWidget().path+'/audio/thats_great_wow.ogg');
		this.sounds.level_win = new Audio(core.getActiveWidget().path+'/audio/level_win.ogg');


		this.sounds.drop_bar.volume = 0.6;
		this.sounds.correct_bar.volume = 0.6;
		this.sounds.round_win.volume = 0.8;
		this.sounds.level_win.volume = 0.8;

		this.level = parseInt(currentLevel);
		this.currentNumber = null;
		this.nrBarsPerRound = 11;
		this.secondsPerBar = 7;
		this.previousNumbers = [];

		this.barsArray = [];
		this.usedNumbers = [];

		this.timer = 0;
		this.interval = null;

		this.levelsJSON = levelsJSON;

		this.currentLevel = null;

		this.nrBarWins = 0;
		this.nrRoundWins = 0;
		this.nrRoundFails = 0;

		this.wrapper = document.getElementsByClassName('wrapper')[0];
		this.columnLeft = document.getElementsByClassName('leftcolumn')[0];
		this.dropColumn = document.getElementsByClassName('drop_column')[0];
		this.columnRight = document.getElementsByClassName('rightcolumn_inner')[0];
		this.timerbar = document.getElementsByClassName('timerbar')[0];
		this.waves = document.getElementsByClassName('waves')[0];
		this.levelIndicator = document.getElementsByClassName('level_indicator')[0];
		this.currentNumberElement = document.getElementsByClassName('current_number_nr')[0];
	}

	preinit(){
		core.utils.adjustAspectRatio();
	}

	startBackground(event) {
		this.backgroundLoop.start('background');
	}

	playSound(sound) {
		sound.currentTime = 0;
		sound.play();
	}

	renderNextBar() {
		var that = this;

		this.currentNumber = this.makeRandomNumber();

		var nrBarsAlreadyInPlace = $(this.columnLeft).find('.bar').not('.dropped').length;
		var columnHeight = $(this.columnLeft).outerHeight();

		var bar = this.makeBar(this.currentNumber, 'left');
		$(this.columnLeft).prepend(bar);

		var columnHeight = $(this.columnLeft).outerHeight();

		var barHeight = this.getBarHeight();

		$(this.columnLeft).find('.bar:first').animate({
			bottom: barHeight * nrBarsAlreadyInPlace + 'px'
		}, 800, 'easeInOutCubic', function () {

		});
	}

	getBarHeight() {
		//var barHeight = $(this.columnLeft).height() / this.nrBarsPerRound;
		//barHeight = barHeight > 40 ? 40 : barHeight;
		//return barHeight;
		var barHeight = ($(this.columnLeft).height()-90) / this.nrBarsPerRound;
		barHeight = barHeight > 40 ? 40 : barHeight;
		return barHeight;
	}

	renderRightColumn() {
		var that = this;

		$('.rightcolumn .bar').draggable('destroy');
		$('.rightcolumn .bar').remove();

		var columnHeight = $(this.columnLeft).height();
		var posIterator = 0;

		var barHeight = this.getBarHeight();

		var html = '';
		for (var i = 0; i < parseInt(this.currentLevel.maxValueRange) + 1; i++) {
			var bar = $(this.makeBar(i, 'right'));
			bar.css({ 'bottom': posIterator + 'px', 'height': barHeight + 'px' });
			$(bar).prependTo(this.columnRight).draggable({
				revert: 'invalid'
			});
			posIterator = (posIterator + (barHeight+10));
		}
	}

	// barType 

	// BARS - show the bar with number boxes 
	// NUMBERS - show bar with the number 
	//         - also show number on leftside 
	// 2COLOR - different color boxes on left and right side 
	// HIDDENBARIGHT/NUMBERS - hide boxes on current bar, only show number but show boxen when done 
	// 						 - numbers only in right column 

	getLevelClassName() {

		var classNames = '';
		if (this.currentLevel.barType.indexOf('HIDDENBARIGHT/NUMBERS') !== -1) {
			return ' hiddenbarright numbers ';
		}
		if (this.currentLevel.barType.indexOf('2COLOR') !== -1) {
			classNames += ' twocolor ';
		}
		if (this.currentLevel.barType.indexOf('BARS') !== -1) {
			classNames += ' bars ';
		}
		if (this.currentLevel.barType.indexOf('NUMBERS') !== -1) {
			classNames += ' numbers ';
		}

		return classNames;
	}

	makeBar(nr, type, dropPosition) {
		var that = this;

		var nrChunks = Math.ceil(that.currentLevel.maxValueRange / that.currentLevel.chunking);
		if (!Number.isFinite(nrChunks)) {
			nrChunks = 0;
		}

		var columnWidth = $(this.columnRight).outerWidth();
		var columnHeight = $(this.columnLeft).outerHeight();

		var segmentWidth = 'width:' + ((parseInt(columnWidth) / parseInt(this.currentLevel.maxValueRange))) + 'px;';
		var barStyle = '';
		var segmentStyle = '';
		var barClass = '';
		if (type === 'left') {
			barClass = 'first';
			barStyle = 'position:absolute;bottom:100%';
			segmentStyle = 'float:left;';
		}
		if (type === 'right') {
			segmentStyle = 'float:left;';
		}
		if (type === 'dropped') {
			var _bar = $(this.columnLeft).find('.bar:first').not(".dropped");
			var barHeight = _bar.height();
			var currentDropLimit = _bar.offset().top - barHeight;
			if ((currentDropLimit-50) < dropPosition) {
				var bottom = ((columnHeight - currentDropLimit) - barHeight)+50;
			} else {
				var bottom = (columnHeight - dropPosition) - barHeight;
			}

			var dropPosition = 'bottom:' + bottom + 'px';
			barClass = 'dropped';
			barStyle = 'position:absolute;' + dropPosition;
			segmentStyle = 'float:left;';
		}
		var chunkerArrayAll = [];
		var chunkI = 0;

		if (type === 'left' || type === 'dropped') {
			var barColorLeft = type === 'dropped' ? this.currentColorSet.right : this.currentColorSet.left;
			var barColorRight = type === 'dropped' ? this.currentColorSet.left : this.currentColorSet.right;
			for (var i = 0; i < this.currentLevel.maxValueRange; i++) {
				if (i < nr) {
					chunkerArrayAll.push('<div style="' + segmentWidth + ' ' +
						segmentStyle + ';background-color:' + barColorLeft + '" class="segment"></div>');
				} else {
					chunkerArrayAll.push('<div style="' + segmentWidth + ' ' +
						segmentStyle + ';background-color:' + barColorRight + '" class="segment filled"></div>');
				}
			}
		}

		if (type === 'right') {
			for (var i = 0; i < this.currentLevel.maxValueRange; i++) {
				if (i < nr) {
					chunkerArrayAll.push('<div style="' + segmentWidth + ' ' +
						segmentStyle + '" class="segment"></div>');
				} else {
					chunkerArrayAll.push('<div style="' + segmentWidth + ' ' +
						segmentStyle + ';background-color:' + this.currentColorSet.right + '" class="segment filled"></div>');
				}
			}
		}

		if (type == 'dropped') {
			chunkerArrayAll.reverse();
		}

		var chunkerArray = [];
		chunkerArray[chunkI] = [];

		_.each(chunkerArrayAll, function (item, i) {
			if (i % that.currentLevel.chunking === 0 && i !== 0) {
				chunkI++;
				chunkerArray[chunkI] = [];
			}
			chunkerArray[chunkI].push(item);
		});

		var levelClassName = this.getLevelClassName();

		var displayNr = nr;
		if (type == 'right') {
			var displayNr = this.currentLevel.maxValueRange - nr;
		}

		var barHeight = this.getBarHeight();

		var html = '<div style="height:' + barHeight + 'px;width:100%;' + barStyle + '" class="bar nr' + this.currentLevel.maxValueRange + ' ' + barClass + levelClassName + '">';

		if (type == 'dropped') {
			html += '<div class="waves_"></div>';
		}

		html += '<div class="inner">';

		html += '<div class="nr">' + displayNr + '</div>';

		_.each(chunkerArray, function (items, i) {

			var chunkStyle = items.length === parseInt(that.currentLevel.chunking) ? 'full' : '';

			var is_one_chunk = (chunkerArray.length === 1 ? 'single ' : '');
			if (i !== chunkerArray.length - 1) {
				html += '<div class="chunk ' + chunkStyle + ' ' + is_one_chunk + '">';
			} else {
				html += '<div class="chunk last ' + chunkStyle + ' ' + is_one_chunk + '">';
			}

			_.each(items, function (_html, ii) {
				html += _html;
			});

			html += '</div>';
		});

		html += '</div></div>';

		return html;
	}

	makeRandomNumber() {
		var found = false;
		var randomNr;

		while (found === false) {
			randomNr = Math.floor(Math.random() * this.currentLevel.maxValueRange);
			if (this.previousNumbers[this.previousNumbers.length - 1] !== randomNr) {
				found = true;
			}
		}

		this.previousNumbers.push(randomNr);

		return randomNr;
	}

	roundFail() {
		this.nrRoundFails = this.nrRoundFails + 1;
	}

	redoBar() {

	}

	winAnimation() {

	}

	startTimer() {
		var that = this;

		this.interval = setInterval(function () {
			that.updateTimerBar();
			if (that.timer == (that.nrBarsPerRound * that.secondsPerBar)) {
				clearInterval(that.interval);
				that.roundFail();
				that.resetGame();
				that.runLevel();
				new Audio(core.getActiveWidget().path + '/audio/oh_no.ogg').play();
			}
			that.timer++;
		}, 1000);
	}

	updateTimerBar() {
		this.timerbar.style.width = ((this.timer / (this.nrBarsPerRound * this.secondsPerBar)) * 100) + '%';
	}

	runRound() {
		this.renderNextBar();
	}

	setRandomColorSet() {
		this.currentColorSet = this.colorSets[Math.floor(Math.random() * this.colorSets.length)];
	}

	resetGame() {
		this.nrBarWins = 0;
		$(this.columnLeft).find('.bar').remove();
		this.timer = 0;
	}

	renderCurrentNumber() {
		$(this.currentNumberElement).html(this.currentLevel.maxValueRange);
	}

	renderLevelIndicator() {
		$(this.levelIndicator).html(this.level);
	}

	runLevel() {
		var that = this;

		this.setRandomColorSet();

		this.currentLevel = this.getCurrentLevel();


		this.renderRightColumn();
		this.renderLevelIndicator();
		this.renderCurrentNumber();
		this.runRound();
		this.startTimer();
	}

	getCurrentLevel() {
		var that = this;
		return _.find(this.levelsJSON, function (item, i) { return item.level == that.level; });
	}

	barDrop(columnLeft, event, ui) {
		var that = this;

		this.playSound(this.sounds.drop_bar);

		var nrBarsAlreadyInPlace = $(this.columnLeft).find('.bar').length;

		this.renderRightColumn();

		var columnHeight = $(this.columnLeft).outerHeight();

		var nrAnswer = $(ui.draggable).find('.segment.filled').length;

		// $(ui.draggable).remove();

		var bar = this.makeBar(nrAnswer, 'dropped', ui.offset.top - $(event.target).offset().top);

		$(this.dropColumn).append(bar);

		var rightAnswer = this.rightOrWrong(nrAnswer, that.currentNumber);

		var barHeight = this.getBarHeight();

		if (rightAnswer) {
			var animateTo = barHeight * (nrBarsAlreadyInPlace - 1);
			$(that.dropColumn).find('.dropped').find('.waves_').addClass('show');
			setTimeout(() => {
				$(this.dropColumn).find('.dropped').css({ background: 'none' });
				$(this.dropColumn).find('.dropped').find('.inner').css({ background: 'none' });
			}, 900);
		} else {
			var animateTo = barHeight * nrBarsAlreadyInPlace;
		}

		if (rightAnswer) {
			setTimeout(() => {
				this.playSound(this.sounds.correct_bar);
			}, 500);
			setTimeout(() => {
				that.barWin();
			}, 1100);
		} else {
			setTimeout(() => {
				that.barFail($(this.dropColumn).find('.dropped'));
			}, 1100);
		}

		$(this.dropColumn).find('.dropped').animate({
			bottom: animateTo + 'px'
		}, 1300, 'easeInOutCubic',function () {

		});
	}

	rightOrWrong(nrAnswer, currentNumber) {
		var that = this;

		if (this.currentLevel.maxValueRange == (nrAnswer + parseInt(currentNumber))) {
			return true;
		} else {
			return false;
		}
	}

	barWin() {
		var that = this;

		this.nrBarWins = this.nrBarWins + 1;


		$(this.columnLeft).find('.bar:first').addClass('done');

		var dropped = $(that.dropColumn).find('.dropped');

		//this.animateBubbles(dropped.find('.waves_'), () => {
			dropped.find('.waves_').animate({
				opacity: 0
			}, 410, () => {
				dropped.remove();
			});
		//});

		if (this.nrBarWins === this.nrBarsPerRound) {
			clearInterval(this.interval);
			this.nrRoundWins = this.nrRoundWins + 1;
			if (this.nrRoundWins === 3) {
				this.nrRoundWins = 0;
				this.level = this.level + 1;
				setTimeout(() => {
					that.resetGame();
					that.runLevel();
				}, 6800);
				this.playSound(this.sounds.level_win);
			} else {
				setTimeout(() => {
					that.resetGame();
					that.runLevel();
				}, 3300);
				this.playSound(this.sounds.round_win);
			}
			
		} else {
			setTimeout(() => {
				that.renderNextBar();
			}, 300);
		}
	}

	animateBubbles(dropped, callback) {
		var go = true;
		var x = 0;
		var barWidth = $(this.columnLeft).find('.bar:first').width();
		var diameter = 50;
		var bubble;
		var time;
		var animDuration = 1;
		var color_iterator = 0;
		var global_interator = 0;

		var colors = ['#42d9f4', '#bceaf2', '#ffffff'];

		function animate() {
			time = getRandomInt(50, 110);
			setTimeout(() => {

				diameter = getRandomInt(25, 60 - (global_interator * 4));
				animDuration = getRandomInt(90, 140) / 100;

				bubble = $('<div class="bubble"></div>');
				bubble.css({
					'background-color': colors[color_iterator],
					left: x + 'px',
					width: diameter + 'px',
					height: diameter + 'px',
					'animation-duration': animDuration + 's'
				});
				dropped.append(bubble);
				x = x + 29;
				if (x < barWidth) {
					color_iterator++;
					global_interator++;
					if (color_iterator > colors.length) {
						color_iterator = 0;
					}
					animate();
				} else {
					setTimeout(() => {
						callback();
					}, 100);
				}

			}, time);
		}

		animate()

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		//callback();
	}

	barFail(dropped_bar) {
		var that = this;

		this.playSound(this.sounds.wrong_bar);
		this.playSound(this.sounds.wrong_encouragement);


		dropped_bar.effect("shake");

		setTimeout(function () {
			dropped_bar.remove();
		}, 1000);
	}

	startWaveAnimation() {
		var that = this;

		var waves = $(this.waves).find('.wave');
		waves.each(function (i, elem) {
			that.waveAnimation(elem);
		});
	}

	waveAnimation(elem) {
		elem.animate({
			background: "toggle"
		}, 5000, function () {
			// Animation complete.
		});
		//easeInOutBack
	}

	init() {
		var that = this;

		$(this.columnLeft).droppable({
			accept: ".bar",
			tolerance: "intersect",
			drop: function (event, ui) {
				that.barDrop(this, event, ui);
			}
		});

		/*
		$('.level_select button.start_on_level').on('click', (event) => {
			var level_ =  $('.level_select input[name=level_select]').val();
			this.level = parseInt(level_);
			$('.level_select').css({'display':'none'});
			setTimeout( function() {
				that.runLevel();
			},200);
		});
		*/

		this.startWaveAnimation();
		this.runLevel();
	}
}

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function dragMoveListener(event) {
	var target = event.target,
		// keep the dragged position in the data-x/data-y attributes
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	// translate the element
	target.style.webkitTransform =
		target.style.transform =
		'translate(' + x + 'px, ' + y + 'px)';

	// update the posiion attributes
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
};

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

function csvJSON(csv) {
	var lines = csv.split("\n");
	var result = [];

	var headers = lines[0].split("\t");

	for (var i = 1; i < lines.length; i++) {
		var obj = {};
		var currentline = lines[i].split("\t");
		for (var j = 0; j < headers.length; j++) {
			obj[headers[j]] = currentline[j];
		}
		result.push(obj);
	}

	return result;
}