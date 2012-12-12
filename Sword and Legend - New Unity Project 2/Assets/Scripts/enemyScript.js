#pragma strict
var isInState = false;
var isBlocking = false;
var weakAttack = false;
var strongAttack = false;
var enemy : GameObject;
enemy = gameObject.FindWithTag("Enemy");
var player : GameObject;
player = gameObject.FindWithTag("Player");
var game : GameObject;
game = gameObject.FindWithTag("GameController");
var enemyHealth : int;
var isIdle = true;

var audio1: AudioSource;
var audio2: AudioSource;
var audio3: AudioSource;
var audio4: AudioSource;
var audio5: AudioSource;
var audio6: AudioSource;

function Start () {
	enemyHealth = 100;
	
	var aSources = GetComponents(AudioSource);
    audio1 = aSources[0];
    audio2 = aSources[1];
    audio3 = aSources[2];
    audio4 = aSources[3];
    audio5 = aSources[4];
    audio6 = aSources[5];
    InvokeRepeating ("EnemyIdle", 0, 0.8);
}

function Update () {
	if(isIdle == true && isInState == false)
	{
		EnemyIdle();
	}
}

function EnemyState()
{
	isInState = true;
	isIdle = false;
	
    var enemyAttack = 10 * (Random.value);
 	if(enemyAttack >= 7)
 	{
 		weakAttack = true;
  		enemy.animation.Play("enemy_attack_1", PlayMode.StopAll);
  		audio3.Play();
 	}
 	else if(enemyAttack >= 3)
 	{
 		strongAttack = true;
  		enemy.animation.Play("enemy_attack_2", PlayMode.StopAll);
  		audio4.Play();
 	}
 	else
 	{
 		isBlocking = true;
  		enemy.animation.Play("enemy_block", PlayMode.StopAll);
 	}
}

function EnemyIdle()
{
	isIdle = false;
	if(isInState == false && (game.GetComponent(BeginGame).playerWin == false && game.GetComponent(BeginGame).gameOver == false))
	{
		enemy.animation.Play("enemy_idle");
	}
}

function isNotBlocking()
{
	isBlocking = false;
}

function IdleState()
{
	isInState = false;
	isBlocking = false;
	weakAttack = false;
	strongAttack = false;
	isIdle = true;
}

function blockedAttack()
{
	isInState = true;
	isBlocking = true;
	enemy.animation.Play("enemy_block", PlayMode.StopAll);
}

function loseHealth(damage : int)
{
	enemyHealth = enemyHealth - damage;
	if(isInState == false)
	{
		isInState = true;
		enemy.animation.Play("enemy_damaged", PlayMode.StopAll);
	}
	if(enemyHealth <= 0)
	{
		game.GetComponent(BeginGame).victory();
		enemyHealth = 0;
	}
}

function checkPlayerState()
{
	if((player.GetComponent(playerScript).isBlocking == false) && (player.GetComponent(playerScript).isDodging == false))
	{
		if(weakAttack == true)
		{
			player.GetComponent(playerScript).loseHealth(10);
		}
		else if(strongAttack == true)
		{
			player.GetComponent(playerScript).loseHealth(30);
		}
	}
	else if(player.GetComponent(playerScript).isBlocking == true && player.GetComponent(playerScript).playerStamina >= 30)
	{
		if(weakAttack == true)
		{
			player.GetComponent(playerScript).loseStamina(20);
		}
		else if(strongAttack == true)
		{
			if(player.GetComponent(playerScript).playerStamina >= 30)
			{
				player.GetComponent(playerScript).loseStamina(30);
			}
			else
			{
				player.GetComponent(playerScript).loseStamina(20);
			}
		}
		audio2.Play();
		audio5.Play();
	}
	else if(player.GetComponent(playerScript).isBlocking == true && player.GetComponent(playerScript).playerStamina < 30)
	{
		audio5.Play();
		player.GetComponent(playerScript).weakBlock();
	}
	else if(player.GetComponent(playerScript).isDodging == true)
	{
		audio6.Play();
	}
	
}