const buttonColours = ["red", "blue", "green", "yellow"];

const gamePattern = [];
const userClickedPattern = [];

function nextSequence()
{
	const randomNumber = Math.floor((Math.random() * buttonColours.length));
	const randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);
	$('li[class=' + randomChosenColour + ']').fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
	$("h1").text("Level " + gamePattern.length);
}

function playSound(name)
{
	const audio = new Audio("sounds/" + name + '.mp3');
	audio.play();
}

function animatePress(currentColour)
{
	const color = $('li[class=' + currentColour + ']');

	$('li[class=' + currentColour + ']')
		.addClass("pressed")
		.delay(100)
		.queue(function(go) {
			$(this).removeClass("pressed");
			go();
		})
	;
}

function checkAnswer()
{
	const idx = userClickedPattern.length - 1;

	if (gamePattern[idx] === userClickedPattern[idx])
	{
		if (gamePattern.length === userClickedPattern.length)
		{
			// On ajoute donc une nouvelle couleur et on reset les couleurs cliquées;
			// Comme gamePattern et userClickedPattern sont des "const",
			// on ne peut pas faire "gamePattern = []".
			// Du coup on utilise une feinte pour vider le tableau sans le "réassigner".
			userClickedPattern.length = 0;
			setTimeout(nextSequence, 1000);
		}
	}
	else
	{
		playSound('wrong');
		$("body")
			.addClass("game-over")
			.delay(200)
			.queue(function(go) {
				$(this).removeClass("game-over");
				go();
			})
		;
		startOver();
	}
}

function startOver()
{
	$("h1").text("Game Over, Press Any Key to Restart");
	gamePattern.length = 0;
	userClickedPattern.length = 0;
}

$(document).keypress(() => {
	if (!gamePattern.length)
	{
		nextSequence();
	}
});

$(document).ready(() => {

	$('li').click(function() {
		if (!gamePattern.length)
			return;

		const userChosenColour = $(this).attr('class');

		userClickedPattern.push(userChosenColour);
		playSound(userChosenColour);
		animatePress(userChosenColour);
		checkAnswer();
	});
});
