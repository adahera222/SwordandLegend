#pragma strict
var isInState = false;
var isBlocking = false;
var weakAttack = false;
var strongAttack = false;
var comboAttack = false;
var enemy : GameObject;
enemy = gameObject.FindWithTag("Enemy2");
var player : GameObject;
player = gameObject.FindWithTag("Player");
var game : GameObject;
game = gameObject.FindWithTag("NextLevelController");
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
    if(enemyAttack >= 8)
    {
    	weakAttack = true;
  		enemy.animation.Play("enemy_attack_1", PlayMode.StopAll);
  		audio3.Play();
    }
 	else if(enemyAttack >= 7)
 	{
 		strongAttack = true;
  		enemy.animation.Play("enemy_attack_2", PlayMode.StopAll);
  		audio4.Play();
 	}
 	else if(enemyAttack >= 3)
 	{
 		comboAttack = true;
  		enemy.animation.Play("enemy_dw_attack_1", PlayMode.StopAll);
  		audio3.Play();
 	}
 	else
 	{
 		isBlocking = true;
  		enemy.animation.Play("enemy_dw_block", PlayMode.StopAll);
 	}
}

function EnemyIdle()
{
	isIdle = false;
	if(isInState == false && (game.GetComponent(NextLevel).playerWin == false && game.GetComponent(NextLevel).gameOver == false))
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
	comboAttack = false;
	isIdle = true;
}

function blockedAttack()
{
	isInState = true;
	isBlocking = true;
	enemy.animation.Play("enemy_dw_block", PlayMode.StopAll);
}

function loseHealth(damage : int)
{
	enemyHealth = enemyHealth - damage;
	if(isInState == false)
	{
		enemy.animation.Play("enemy_damaged", PlayMode.StopAll);
	}
	if(enemyHealth <= 0)
	{
		game.GetComponent(NextLevel).victory();
		enemyHealth = 0;
	}
}

function checkPlayerState()
{
	if((player.GetComponent(playerScript2).isBlocking == false) && (player.GetComponent(playerScript2).isDodging == false))
	{
		if(weakAttack == true)
		{
			player.GetComponent(playerScript2).loseHealth(10);
		}
		else if(strongAttack == true)
		{
			player.GetComponent(playerScript2).loseHealth(20);
		}
		else if(comboAttack == true)
		{
			player.GetComponent(playerScript2).loseHealth(25);
		}
	}
	else if(player.GetComponent(playerScript2).isBlocking == true && player.GetComponent(playerScript2).playerStamina > 30)
	{
		if(weakAttack == true)
		{
			player.GetComponent(playerScript2).loseStamina(10);
		}
		else if(strongAttack == true)
		{
			if(player.GetComponent(playerScript2).playerStamina >= 20)
			{
				player.GetComponent(playerScript2).loseStamina(20);
			}
		}
		else if(comboAttack == true)
		{
			if(player.GetComponent(playerScript2).playerStamina >= 30)
			{
				player.GetComponent(playerScript2).loseStamina(30);
			}
		}
		audio2.Play();
		audio5.Play();
	}
	else if(player.GetComponent(playerScript2).isBlocking == true && player.GetComponent(playerScript2).playerStamina <= 30)
	{
		if(weakAttack == true)
		{
			if(player.GetComponent(playerScript2).playerStamina >= 10)
			{
				player.GetComponent(playerScript2).loseStamina(10);
				audio2.Play();
				audio5.Play();
			}
			else
			{
				audio5.Play();
				player.GetComponent(playerScript2).weakBlock();
			}
		}
		else if(strongAttack == true)
		{
			if(player.GetComponent(playerScript2).playerStamina >= 20)
			{
				player.GetComponent(playerScript2).loseStamina(20);
				audio2.Play();
				audio5.Play();
			}
			else
			{
				audio5.Play();
				player.GetComponent(playerScript2).weakBlock();
			}
		}
		else if(comboAttack == true)
		{
			if(player.GetComponent(playerScript2).playerStamina >= 30)
			{
				player.GetComponent(playerScript2).loseStamina(30);
				audio2.Play();
				audio5.Play();
			}
			else
			{
				audio5.Play();
				player.GetComponent(playerScript2).weakBlock();
			}
		}
	}
	else if(player.GetComponent(playerScript2).isDodging == true)
	{
		audio6.Play();
	}
	
}

function blockSound()
{
	audio7.Play();
}