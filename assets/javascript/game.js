$(document).ready(function(){ 
    var characterSelected = false;
    var enemySelected = false; 
    var game = {
        characters: [
            {name:"Darth-Sidious", healthPoints: 100, attackPower: 25, baseAttack: 5, counterAttackPower: 15, image: "assets/images/darth-sidious.jpg"},
            {name:"Darth-Vader", healthPoints: 110, attackPower: 22, baseAttack: 5, counterAttackPower: 15, image: "assets/images/darth-vader.jpg"},
            {name:"Han-Solo", healthPoints: 120, attackPower: 15, baseAttack: 5, counterAttackPower: 15, image: "assets/images/Han.jpg"},
            {name:"Luke-Skywalker", healthPoints: 130, attackPower: 30, baseAttack: 5, counterAttackPower: 30, image: "assets/images/luke-skywalker.jpg"},
            {name:"Admiral-Ackbar", healthPoints: 200, attackPower: 5, baseAttack: 5, counterAttackPower: 5, image: "assets/images/admiral-ackbar.jpg"},
            {name:"Jawas", healthPoints: 500, attackPower: 1, baseAttack: 5, counterAttackPower: 1, image: "assets/images/jawa.jpg"},
            {name:"Qui-Gon-Jinn", healthPoints: 200, attackPower: 15, baseAttack: 5, counterAttackPower: 20, image: "assets/images/Qui-Gon-Jinn.jpg" },
            {name:"Mace-Windu", healthPoints: 125, attackPower: 10, baseAttack: 5, counterAttackPower: 10, image: "assets/images/mace-windu.jpg"},
            {name:"C-3PO", healthPoints: 200, attackPower: 5, baseAttack: 5, counterAttackPower: 5, image: "assets/images/c-3po.jpg"},
            {name:"Greedo", healthPoints: 20, attackPower: 50, baseAttack: 5, counterAttackPower: 50, image: "assets/images/greedo.jpg"},

        ],
        reset: function (){
            this.gameInitialize();
        },
        shuffle: function(array){
            var temp;
            var randomIndex;
            var currentIndex = array.length - 1;
            for (i=0; i <= currentIndex; currentIndex--){
                randomIndex = Math.floor(Math.random() * array.length );
                temp = array[i];
                array[i] = array[randomIndex];
                array[randomIndex] = temp;
                console.log(randomIndex);
            }
        },
        gameInitialize: function(){
            $("#characters").empty();
            $("#enemies").empty();
            $("#defender").empty();
            $("#battle-log-attacker").empty();
            $("#battle-log-defender").empty();
            characterSelected = false;
            enemySelected = false;
            console.log(enemySelected);
            console.log(characterSelected);
            for(i = 0; i < 4; i++)
            {
                var card = $("<button>");
                var img = $("<img>");
                var cardTTitle = $("<h6>");
                var cardText = $("<p>");
                card.addClass("character-button card col-2 bg-dark p-0 text-light m-2");
                card.attr("attack-power", this.characters[i].counterAttackPower);
                card.attr("base-attack", this.characters[i].baseAttack);
                card.attr("id", this.characters[i].name);
                card.attr("health-points", this.characters[i].healthPoints);
                $("#characters").append(card);
                cardTTitle.addClass("'card-title card-header");
                cardTTitle.text(this.characters[i].name);
                card.append(cardTTitle);
                img.addClass("card-img");
                img.attr("src", this.characters[i].image);
                card.append(img);
                cardText.addClass("card-text card-footer p-0");
                cardText.text("Health Points: " + this.characters[i].healthPoints);
                card.append(cardText);   
            }
        },
    }; 
    $("#fight-section").on("click", function(){
        var updateHealthDefender;
        var updateHealthPlayer;
        var updatePlaterAttack;
        if(enemySelected === true){
            updateHealthPlayer = parseInt($("#choice").attr("health-points")) - parseInt($("#defenderChoice").attr("attack-power"))
            updateHealthDefender = parseInt($("#defenderChoice").attr("health-points")) - parseInt($("#choice").attr("attack-power"));
            updatePlaterAttack = parseInt($("#choice").attr("attack-power")) + parseInt($("#choice").attr("base-attack"));
            $("#choice").attr("attack-power", updatePlaterAttack);
            $("#choice .card-text").text("Health Points: " + updateHealthPlayer);
            $("#choice").attr("health-points", updateHealthPlayer);
            $("#defenderChoice .card-text").text("Health Points: " + updateHealthDefender);
            $("#defenderChoice").attr("health-points", updateHealthDefender);

            $("#battle-log-attacker").text("The player attacked for " + $("#choice").attr("attack-power"));
            $("#battle-log-defender").text("The defender attacked for " + $("#defenderChoice").attr("attack-power"));
            if (updateHealthPlayer < 0)
            {
                $("#defender").empty();
                $("#defender").text("Game Over ");
                var restart = $("<button>");
                restart.text("RESTART");
                restart.appendTo("#defender");
                restart.on("click", function()
                {
                    game.reset();
                    restart.detach();
                })
            }
            else if (updateHealthDefender < 0)
            {
                $("#defender").empty();
                $("#defender").text("Choose your next opponent");
                enemySelected = false;
            }
        }
        else {
            $("#defender").text("No enemy selected");
        }
    })
    $(document).on("click", ".character-button", function(){
        console.log(characterSelected);
        var selecton = $(this).attr("id");
        if(characterSelected === false){
            $(".character-button").each(function()
            {
                if ( $(this).attr("id") != selecton )
                {
                    $(this).appendTo("#enemies");
                    $(this).addClass("enemy");
                }
                else 
                {
                    $(this).attr("id", "choice");
                    characterSelected = true;
                }
            }
            )}
        if (enemySelected === false && characterSelected === true)
        {   if ( $(this).attr("id") === selecton)
            {
                $("#defender").empty();
                $(this).appendTo("#defender");
                $(this).attr("id", "defenderChoice");
                enemySelected = true;
            }
        }
    })
    game.shuffle(game.characters);
    game.gameInitialize();
    console.log(game.characters);
});