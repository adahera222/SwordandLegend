#pragma strict
var player : GameObject;
player = gameObject.FindWithTag("Player");
var enemy : GameObject;
enemy = gameObject.FindWithTag("Enemy");
var gameOver : boolean = false;
var playerWin : boolean = false;

var audio1: AudioSource;
var audio2: AudioSource;
var audio3: AudioSource;

function Start () {
	InvokeRepeating ("EnemyMove", 4, 4);
	InvokeRepeating ("Recover", 0, 1); 
	
	var aSources = GetComponents(AudioSource);
    audio1 = aSources[0];
    audio2 = aSources[1];
    audio3 = aSources[2];
}

function Update () {
	var player = gameObject.FindWithTag("Player");
	if ( Input.GetMouseButtonDown( 0 ) || Input.GetKey( "w" ))
    {
 		player.GetComponent(playerScript).PlayerState(0);
    }
    
    if ( Input.GetKeyDown( "space" ) || Input.GetKeyDown( "s" ))
    {
    	player.GetComponent(playerScript).PlayerState(1);
    }
    
    if ( (Input.GetKey( "space" ) == false) && (Input.GetKey( "s" ) == false) && (player.GetComponent(playerScript).isBlocking == true))
    {
    	player.GetComponent(playerScript).PlayerState(2);
    }
    
    if (Input.GetKeyDown ("a"))
    {
    	player.GetComponent(playerScript).PlayerState(3);
    }
    
    if (Input.GetKeyDown ("d"))
    {
    	player.GetComponent(playerScript).PlayerState(4);
    }
    
    if (player.GetComponent(playerScript).playerStamina == 0)
    {
    	player.GetComponent(playerScript).PlayerState(2);
    }
    
    if (player.GetComponent(playerScript).playerHealth <= 0)
    {
    	gameOver = true;
    	CancelInvoke("EnemyMove");
    	CancelInvoke("Recover");
    	player.GetComponent(playerScript).playerStamina = 0;
    }
    
    if (enemy.GetComponent(enemyScript).enemyHealth <= 0)
    {
    	playerWin = true;
    	CancelInvoke("EnemyMove");
    	CancelInvoke("Recover");
    	player.GetComponent(playerScript).playerStamina = 0;
    }
}

function EnemyMove()
{
	if(enemy.GetComponent(enemyScript).isInState == false)
	{
		enemy.GetComponent(enemyScript).EnemyState();
	}
}

function Recover()
{
	player.GetComponent(playerScript).recoverStamina();
}

function OnGUI () {
	GUI.Box (Rect (25,05,150,50), "Player Health: "+player.GetComponent(playerScript).playerHealth);
	GUI.Box (Rect (25,65,150,50), "Player Stamina: "+ player.GetComponent(playerScript).playerStamina + "");
	GUI.Box (Rect (25,125,150,50), "Enemy Health: "+ enemy.GetComponent(enemyScript).enemyHealth + "");
	
	if (GUI.Button (Rect (900,05,100,40), "Mute/Unmute")) 
    {
			if(audio1.mute == false)
			{
				audio1.mute = true;
			}
    		else
    		{
    			audio1.mute = false;
    		}
    	
	}
	if (gameOver) 
	{
    	GUI.Box(Rect(400,200, 200, 200), "Game Over!");
    	
    	if (GUI.Button (Rect (450,300,100,40), "Music")) 
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
	
    	if (GUI.Button (Rect (460,250,80,40), "Retry")) 
    	{
			Application.LoadLevel (0);
		}
    }
    if (playerWin) 
    {
    	GUI.Box(Rect(400,200, 200, 200), "You Win!!");
    	if (GUI.Button (Rect (450,300,100,40), "Music")) 
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
    	if (GUI.Button (Rect (460,250,80,40), "Continue")) 
    	{
			Application.LoadLevel (0);
		}
    }
}

function victory(){
    audio1.Pause();
    audio2.Play();
}

function lose(){
    audio1.Pause();
    audio3.Play();
}