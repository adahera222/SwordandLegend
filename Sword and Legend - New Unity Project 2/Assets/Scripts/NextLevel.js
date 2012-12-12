#pragma strict
var player : GameObject;
player = gameObject.FindWithTag("Player");
var enemy : GameObject;
enemy = gameObject.FindWithTag("Enemy2");
var gameOver : boolean = false;
var playerWin : boolean = false;
var visionLight : GameObject;
visionLight = gameObject.FindWithTag("Vision");

var audio1: AudioSource;
var audio2: AudioSource;
var audio3: AudioSource;

var playerHealthTexture : Texture2D;
var playerHealthBorder : Texture2D;
var enemyHealthTexture : Texture2D;
var enemyHealthBorder : Texture2D;
var playerStaminaTexture : Texture2D;
var playerStaminaBorder : Texture2D;

function Start () {
	InvokeRepeating ("EnemyMove", 3, 2.3);
	InvokeRepeating ("Recover", 0, 0.8); 
	
	var aSources = GetComponents(AudioSource);
    audio1 = aSources[0];
    audio2 = aSources[1];
    audio3 = aSources[2];
    
}

function Update () {
	var player = gameObject.FindWithTag("Player");
	if ( Input.GetMouseButtonDown( 0 ) || Input.GetKey( "w" ))
    {
 		player.GetComponent(playerScript2).PlayerState(0);
    }
    
    if ( Input.GetKeyDown( "space" ) || Input.GetKeyDown( "s" ))
    {
    	player.GetComponent(playerScript2).PlayerState(1);
    }
    
    if ( (Input.GetKey( "space" ) == false) && (Input.GetKey( "s" ) == false) && (player.GetComponent(playerScript2).isBlocking == true))
    {
    	player.GetComponent(playerScript2).PlayerState(2);
    }
    
    if (Input.GetKeyDown ("a"))
    {
    	player.GetComponent(playerScript2).PlayerState(3);
    }
    
    if (Input.GetKeyDown ("d"))
    {
    	player.GetComponent(playerScript2).PlayerState(4);
    }
    
    if (player.GetComponent(playerScript2).playerStamina == 0)
    {
    	player.GetComponent(playerScript2).PlayerState(2);
    }
    
    if (player.GetComponent(playerScript2).playerHealth <= 0)
    {
    	gameOver = true;
    	CancelInvoke("EnemyMove");
    	CancelInvoke("Recover");
    	player.GetComponent(playerScript2).playerStamina = 0;
    	visionLight.light.intensity = 0.0;
    }
    
    if (enemy.GetComponent(enemyScript2).enemyHealth <= 0)
    {
    	playerWin = true;
    	CancelInvoke("EnemyMove");
    	CancelInvoke("Recover");
    	player.GetComponent(playerScript2).playerStamina = 0;
    	visionLight.light.intensity = 0.0;
    }
    
	if (player.GetComponent(playerScript2).playerHealth >= 70)
    {
    	visionLight.light.intensity = 0.0;
    }
    else if (player.GetComponent(playerScript2).playerHealth >= 60)
    {
    	visionLight.light.intensity = 0.2;
    }
    else if (player.GetComponent(playerScript2).playerHealth >= 50)
    {
    	visionLight.light.intensity = 0.4;
    }
    else if (player.GetComponent(playerScript2).playerHealth >= 40)
    {
    	visionLight.light.intensity = 0.6;
    }
    else if (player.GetComponent(playerScript2).playerHealth >= 30)
    {
    	visionLight.light.intensity = 0.7;
    }
    else if (player.GetComponent(playerScript2).playerHealth >= 20)
    {
    	visionLight.light.intensity = 0.9;
    }
    else if (player.GetComponent(playerScript2).playerHealth > 0)
    {
    	visionLight.light.intensity = 5;
    }
    
    if(player.GetComponent(playerScript2).playerStamina > 100)
	{
		player.GetComponent(playerScript2).playerStamina = 100;
	}
}

function EnemyMove()
{
	if(enemy.GetComponent(enemyScript2).isInState == false)
	{
		enemy.GetComponent(enemyScript2).EnemyState();
	}
}

function Recover()
{
	player.GetComponent(playerScript2).recoverStamina();
}

function OnGUI () {
	
	if (GUI.Button (Rect (900,05,100,40), "Music")) 
    {
			if(audio1.mute == false)
			{
				audio1.mute = true;
			}
    		else
    		{
    			audio1.mute = false;
    		}
    		
    		if (gameOver)
    		{
    			if(audio3.isPlaying)
				{
					audio3.Stop();
				}
    			else
    			{
    				audio3.Play();
    			}
    		}
    		else if(playerWin)
    		{
    			if(audio2.isPlaying)
				{
					audio2.Stop();
				}
    			else
    			{
    				audio2.Play();
    			}
    		}
    	
	}
	if (gameOver) 
	{
    	GUI.Box(Rect(430,200, 200, 200), "Game Over!");
    	
    	if (GUI.Button (Rect (480,300,100,40), "Quit Game")) 
    	{
			Application.LoadLevel (0);
    	
		}
	
    	if (GUI.Button (Rect (490,250,80,40), "Retry")) 
    	{
			Application.LoadLevel (3);
		}
    }
    if (playerWin) 
    {
    	GUI.Box(Rect(430,200, 200, 200), "You Win!!");
    	if (GUI.Button (Rect (480,300,100,40), "Quit Game")) 
    	{
    		Application.LoadLevel (0);
		}
    	/**if (GUI.Button (Rect (490,250,80,40), "Continue")) 
    	{
			Application.LoadLevel (3);
		}*/
    }
    
    GUI.Label(Rect(12, 0, 50, 50), "Level 3");
    GUI.Box (Rect (12,188,130,20), "Player Health: "+player.GetComponent(playerScript2).playerHealth+"%");
	GUI.DrawTexture(Rect(03,205,224,36), playerHealthBorder);
	var adjust : int = player.GetComponent(playerScript2).playerHealth * 2;
	GUI.BeginGroup(Rect(15, 215,adjust,15));
	if(player.GetComponent(playerScript2).playerHealth > 30)
	{
		GUI.DrawTexture(Rect(0,0,290,15), playerHealthTexture);
	}
	else
	{
		GUI.DrawTexture(Rect(0,0,290,15), enemyHealthTexture);
	}
	GUI.EndGroup();
	
	GUI.Box (Rect (12,248,130,20), "Stamina: "+ player.GetComponent(playerScript2).playerStamina + "%");
	GUI.DrawTexture(Rect(03,265,224,36), playerStaminaBorder);
	GUI.BeginGroup(Rect(15, 275, player.GetComponent(playerScript2).playerStamina*2,15));
	if(player.GetComponent(playerScript2).playerStamina >= 30)
	{
		GUI.DrawTexture(Rect(00,00,600,15), playerStaminaTexture);
	}
	else
	{
		GUI.DrawTexture(Rect(00,00,600,15), enemyHealthTexture);
	}
	GUI.EndGroup();
	
	GUI.Box (Rect (412,18,135,20), "Enemy Health: "+ enemy.GetComponent(enemyScript2).enemyHealth + "%");
	GUI.DrawTexture(Rect(403,35,224,36), enemyHealthBorder);
	var adjust2 : int = enemy.GetComponent(enemyScript2).enemyHealth * 2;
	GUI.BeginGroup(Rect(415, 45,adjust2,15));
	GUI.DrawTexture(Rect(0,0,290,15), enemyHealthTexture);
	GUI.EndGroup();
}

function victory(){
    audio1.Pause();
    audio2.Play();
}

function lose(){
    audio1.Pause();
    audio3.Play();
}