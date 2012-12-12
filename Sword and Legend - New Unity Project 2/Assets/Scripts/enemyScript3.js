#pragma strict
var isInState = false;
var isBlocking = false;
var weakAttack = false;
var strongAttack = false;
var enemy : GameObject;
enemy = gameObject.FindWithTag("Enemy3");
var player : GameObject;
player = gameObject.FindWithTag("Player");
var game : GameObject;
game = gameObject.FindWithTag("Level3Controller");
var enemyHealth : int;
var isIdle = true;

var audio1: AudioSource;
var audio2: AudioSource;
var audio3: AudioSource;
var audio4: AudioSource;
var audio5: AudioSource;
var audio6: AudioSource;
var audio7: AudioSource;

function Start () {
	enemyHealth = 100;
	
	var aSources = GetComponents(AudioSource);
    audio1 = aSources[0];
    audio2 = aSources[1];
    audio3 = aSources[2];
    audio4 = aSources[3];
    audio5 = aSources[4];
    audio6 = aSources[5];
    audio7 = aSources[6];
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
    if(enemyAttack >= 9)
    {
    	weakAttack = true;
  		enemy.animation.Play("enemy_th_attack_2", PlayMode.StopAll);
  		audio3.Play();
    }
 	else if(enemyAttack >= 3)
 	{
 		strongAttack = true;
  		enemy.animation.Play("enemy_th_attack_1", PlayMode.StopAll);
  		audio4.Play();
 	}
 	else
 	{
 		isBlocking = true;
  		enemy.animation.Play("enemy_th_block", PlayMode.StopAll);
 	}
}

function EnemyIdle()
{
	isIdle = false;
	if(isInState == false && (game.GetComponent(Level3).playerWin == false && game.GetComponent(Level3).gameOver == false))
	{
		enemy.animation.Play("enemy_idle");
	}
}

function secondAttackSound()
{
	audio4.Play();
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
	enemy.animation.Play("enemy_th_block", PlayMode.StopAll);
}

function loseHealth(damage : int)
{
	enemyHealth = enemyHealth - damage;
	if(isInState == false)
	{
		isInState = true;
		enemy.animation.Play("enemy_damaged_th", PlayMode.StopAll);
	}
	if(enemyHealth <= 0)
	{
		game.GetComponent(Level3).victory();
		enemyHealth = 0;
	}
}

function checkPlayerState()
{
	if((player.GetComponent(playerScript3).isBlocking == false) && (player.GetComponent(playerScript3).isDodging == false))
	{
		if(weakAttack == true)
		{
			player.GetComponent(playerScript3).loseHealth(15);
		}
		else if(strongAttack == true)
		{
			player.GetComponent(playerScript3).loseHealth(40);
		}
	}
	else if(player.GetComponent(playerScript3).isBlocking == true && player.GetComponent(playerScript3).playerStamina >= 50)
	{
		if(weakAttack == true)
		{
			player.GetComponent(playerScript3).loseStamina(30);
		}
		else if(strongAttack == true)
		{
			if(player.GetComponent(playerScript3).playerStamina >= 50)
			{
				player.GetComponent(playerScript3).loseStamina(50);
			}
		}
		audio2.Play();
		audio5.Play();
	}
	else if(player.GetComponent(playerScript3).isBlocking == true && player.GetComponent(playerScript3).playerStamina < 50)
	{
		if(weakAttack == true)
		{
			if(player.GetComponent(playerScript3).playerStamina >= 30)
			{
				player.GetComponent(playerScript3).loseStamina(30);
				audio2.Play();
				audio5.Play();
			}
			else
			{
				player.GetComponent(playerScript3).playerStamina = 0;
				audio5.Play();
				player.GetComponent(playerScript3).weakBlock();
			}
		}
		else
		{
			audio5.Play();
			player.GetComponent(playerScript3).weakBlock();
			player.GetComponent(playerScript3).playerStamina = 0;
		}
	}
	else if(player.GetComponent(playerScript3).isDodging == true)
	{
		audio6.Play();
	}
	
}

function blockSound()
{
	audio7.Play();
}

function attackSound()
{
	audio4.Play();
}