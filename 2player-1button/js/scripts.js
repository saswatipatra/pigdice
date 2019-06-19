//Global Variables
var player1, player2;
//Back-End Logic
//Constructor function for a player
function Player(name, turnTotal, diceRoll, overallScore, active) {
    this.name = name;
    this.diceRoll = 0;
    this.turnTotal = 0;
    this.overallScore = 0;
    this.active = active;
}

//Funtion on what is to happen when the dice is rolled.
Player.prototype.roll = function () {
    var randomNo = Math.floor((Math.random() * 6) + 1); //Random no generator from 1-6.
    this.diceRoll = randomNo;
    if (randomNo === 1) {
        this.turnTotal = 0;
        this.diceRoll = 1;
        if (this.active === player1.active) { //disable and enable gaming areas when dice is a 1 according to which player is active.
            player1.active = false;
            player2.active = true;
        } else if (this.active === player2.active) {
            player2.active = false;
            player1.active = true;
        }
      return alert("Oops you got a 1. Your turn is over!");
    } else {
        this.turnTotal += randomNo;
    };
    return this.diceRoll;
};
//Function on what is to happen when a player holds the game.
Player.prototype.hold = function () {
    this.overallScore += this.turnTotal;
    if (this.overallScore >= 100) {
        alert("Game Over. You win!!!!");
        resetFields();
        alert('To play with a new partner click New Game.')

    }
    return this.overallScore;
};
//Function to reset the form input fields, re-enable the buttons, remove the opacity from the gaming area and reset the scores to 0.
function resetFields() {
    $("input#player1Name").val("");
    $("input#player2Name").val("");
    var thePlayers = [player1, player2];
    thePlayers.forEach(function (player) {
        player.diceRoll = 0;
        player.turnTotal = 0;
        player.overallScore = 0;
    })
    var outputs = [$('.diceRoll1'), $('.turnScore1'), $('.overallScore1'), $('.diceRoll2'), $('.turnScore2'), $('.overallScore2')];
    outputs.forEach(function (output) {
        output.text(0);
    })
};
//Front End Logic
$(document).ready(function () {
    //Actions when player enters name
    $("#playerNames").submit(function (event) {
        event.preventDefault();
        $("form").hide();
        $(".newGame").show();
        $(".newGame").click(function () { //Makes the 'New Game' title clickeable and the form reappear.
            $("form").show();
            $('#gamingArea').hide();
            $(".newGame").hide();
            resetFields();
        });
        $('#gamingArea').show();
        $('.player1Area').show();
        $('.player2Area').show();
        //Store the players names in variables.
        var gamer1 = $("#player1Name").val();
        var gamer2 = $("#player2Name").val();
        //Put the names into an object using the constructor Players.
        player1 = new Player(gamer1);
        player2 = new Player(gamer2);
        //Output the names into each appropriate section
        $(".player1NameOutput").text(player1.name);
        $(".player2NameOutput").text(player2.name);
        resetFields(); //Clear the form input fields
    });
    //Display dice roll number and turn total when the roll button is clicked
    $('.roll').click(function (event) { //roll button for player1
        event.preventDefault();
        //Activate Gaming Area
        if (player2.active=== true){
        player2.active = true;
        player1.active = false;
        player2.roll(); //call the function to generate random numbers
        $('.diceRoll2').text(player2.diceRoll); //display the rolled dice number
        $('.turnScore2').text(player2.turnTotal); //display the turn score (temporary score)
      } else {
        player1.active = true;
        player2.active = false;
        player1.roll(); //call the function to generate random numbers
        $('.diceRoll1').text(player1.diceRoll); //display the rolled dice number
        $('.turnScore1').text(player1.turnTotal); //display the turn score (temporary score)
      }
    });
        //Display overall score when the hold button is clicked
    $('.hold').click(function (event) { //hold button for player1
        event.preventDefault();
        //Deactivate Gaming Area
        if (player1.active=== true){
        player1.active = false;
        player2.active = true;
        player1.hold(); //call the function to add the turn score to the overall score
        $('.overallScore1').text(player1.overallScore); //display the overall score
        //Clear dice roll and turn score
        player1.diceRoll = 0;
        player1.turnTotal = 0;
        $('.diceRoll1').text(player1.diceRoll);
        $('.turnScore1').text(player1.turnTotal);
      }else {
        player2.active = false;
        player1.active = true;
        player2.hold(); //call the function to add the turn score to the overall score
        $('.overallScore2').text(player2.overallScore); //display the overall score
        //Clear turn score and total score
        player2.diceRoll = 0;
        player2.turnTotal = 0;
        $('.diceRoll2').text(player2.diceRoll);
        $('.turnScore2').text(player2.turnTotal);
      }
    });
});
