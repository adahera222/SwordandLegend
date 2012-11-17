#pragma strict
var isBlocking = false;
var isAttacking = false;
var isDodging = false;
var player : GameObject;
player = gameObject.FindWithTag("Player");
var shield : GameObject;
shield = gameObject.FindWithTag("PlayerShield");
var enemy : GameObject;
enemy = gameObject.FindWithTag("Enemy");
var game : GameObject;
game = gameObject.FindWithTag("GameController");

var playerHealth : int;
var playerStamina : int;

var audio1: AudioSource;
var audio2: AudioSource;
var audio3: AudioSource;
var audio4: AudioSource;
var audio5: AudioSource;
var audio6: AudioSource;
var audio7: AudioSource;
var audio8: AudioSource;
var audio9: AudioSource;


function Start () {
	playerHealth = 100;
	playerStamina = 100;
	
	var aSources = GetComponents(AudioSource);
    audio1 = aSources[0];
    audio2 = aSources[1];
    audio3 = aSources[2];
    audio4 = aSources[3];
    audio5 = aSources[4];
    audio6 = aSources[5];
    audio7 = aSources[6];
    audio8 = aSources[7];
    audio9 = aSources[8];
}

function Update () {

}

function PlayerState(state)
{
	if((state == 0) && (isAttacking == false) && (playerStamina >= 30) && (isBlocking == false) && (isDodging == false) && (enemy.GetComponent(enemyScript).enemyHealth > 0) && (playerHealth > 0))
	{
		isAttacking = true;
		loseAttackStamina();
		player.animation.Play("player_attack_1");
		audio5.Play();
        var enemyBlock = 10 * (Random.value);
        if((enemyBlock >= 7) && (enemy.GetComponent(enemyScript).isInState == false))
        {
        	enemy.GetComponent(enemyScript).blockedAttack();
        }
        else if(enemy.GetComponent(enemyScript).isBlocking == false)
        {
        	enemy.GetComponent(enemyScript).loseHealth(15);
        }
	}
	else if((state == 0) && (isAttacking == false) && (playerStamina < 30) && (isBlocking == false) && (isDodging == false) && (enemy.GetComponent(enemyScript).enemyHealth > 0) && (playerHealth > 0))
	{
		isAttacking = true;
		playerStamina = 0;
		player.animation.Play("player_weakend_attack");
        var enemyB = 10 * (Random.value);
        if((enemyB >= 3) && (enemy.GetComponent(enemyScript).isInState == false))
        {
        	enemy.GetComponent(enemyScript).blockedAttack();
        }
        else if(enemy.GetComponent(enemyScript).isBlocking == false)
        {
        	enemy.GetComponent(enemyScript).loseHealth(5);
        }
	}
	else if((state == 1) && (isAttacking == false) && (isDodging == false) && (isBlocking == false))
	{
		isBlocking = true;
		shield.transform.position.y += 1.0462;
    	shield.transform.position.z -= 1.09988;
	}
	else if((state == 2) && (isBlocking == true) && (isDodging == false))
	{
		returnShield();
	}
	else if(state == 3 && playerStamina >= 30 && isDodging == false)
	{
		IdleState();
		isDodging = true;
		loseStamina(30);
		player.animation.Play("player_dodge_left", PlayMode.StopAll);
		audio3.Play();
	}
	else if(state == 4 && playerStamina >= 30 && isDodging == false)
	{
		IdleState();
		isDodging = true;
		loseStamina(30);
		player.animation.Play("player_dodge_right", PlayMode.StopAll);
		audio4.Play();
	}
	else if(state == 3  && playerStamina < 30 && isDodging == false)
	{
		playerStamina = 0;
		player.animation.Play("player_fail_roll_left", PlayMode.StopAll);
		weakState();
	}
	else if(state == 4  && playerStamina < 30 && isDodging == false)
	{
		playerStamina = 0;
		player.animation.Play("player_fail_roll_right", PlayMode.StopAll);
		weakState();
	}	
	
}

function IdleState()
{
	isAttacking = false;
	isBlocking = false;
	isDodging = false;
}

function loseHealth(damage : int)
{
	playerHealth = playerHealth - damage;
	player.animation.Play("player_damaged");
	audio2.Play();
	if(playerHealth <= 0)
	{
		playerHealth = 0;
		game.GetComponent(BeginGame).lose();
	}
}

function loseStamina(staminaSpent : int)
{
	playerStamina = playerStamina - staminaSpent;
}

function loseAttackStamina()
{
	playerStamina = playerStamina - 30;
}

function recoverStamina()
{
	if((playerStamina < 100) && (isAttacking == false) && (isBlocking == false) && (isDodging == false))
	{
		playerStamina = playerStamina + 10;
	}
}

function enemyPain()
{
	if(enemy.GetComponent(enemyScript).isBlocking == false)
	{
		audio6.Play();
	}
	else
	{
		audio1.Play();
		audio8.Play();
	}
}

function weakState()
{
	audio9.Play();
}

function checkEnemyBlock()
{
	if(enemy.GetComponent(enemyScript).isBlocking == true)
	{
		player.animation.Play("player_damaged");
	}
}

function returnShield()
{
	isBlocking = false;
	shield.transform.position.y -= 1.0462;
    shield.transform.position.z += 1.09988;
}

function weakBlock()
{
	returnShield();
	playerStamina = 0;
	loseHealth(10);
	player.animation.Play("player_damaged");
	weakState();
}

/**function failedDodge()
{
	if(playerStamina < 30)
	{
		player.animation.Play("player_damaged");
		weakState();
	}
}*/