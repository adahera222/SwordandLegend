#pragma strict
var start : boolean = true;
var tipRoll : boolean = false;
var tip : int;

var wKey : Texture2D;
var sKey : Texture2D;
var dKey : Texture2D;
var aKey : Texture2D;
var spaceKey : Texture2D;
var leftClick : Texture2D;

function Start () {

}

function Update () {

}

function OnGUI() {
		if(start == true)
		{
			GUI.Box(Rect(200,50, 600, 500), "Sword and Legend");
    	
    		if (GUI.Button (Rect (370,250,300,40), "Play Game")) 
    		{
				start = false;
    	
			}
	
    		if (GUI.Button (Rect (370,300,300,40), "Quit Game")) 
    		{
    			Application.Quit();
			}
		}
		else
		{
			GUI.Box(Rect(200,50, 600, 500), "Sword and Legend");
			
			GUI.Label(Rect(250, 110, 400, 200), "Press Left Click or W to ATTACK");
			GUI.DrawTexture(Rect(600, 100, 50, 50), wKey);
			GUI.Label(Rect(670, 110, 50, 50), "or");
			GUI.DrawTexture(Rect(700, 100, 50, 50), leftClick);
			
			GUI.Label(Rect(250, 170, 400, 200), "Press or hold Space or S to BLOCK");
			GUI.DrawTexture(Rect(500, 160, 150, 50), spaceKey);
			GUI.Label(Rect(670, 170, 50, 50), "or");
			GUI.DrawTexture(Rect(700, 160, 50, 50), sKey);
			
			GUI.Label(Rect(250, 230, 400, 200), "Press A or D to DODGE");
			GUI.Label(Rect(500, 230, 400, 200), "Dodge Left");
			GUI.DrawTexture(Rect(568, 220, 50, 50), aKey);
			GUI.Label(Rect(620, 230, 400, 200), "Dodge Right");
			GUI.DrawTexture(Rect(700, 220, 50, 50), dKey);
			
			GUI.Label(Rect(250, 300, 400, 200), "Game Note: ACTIONS consume stamina.");
			GUI.Label(Rect(250, 330, 400, 200), "ATTACK consumes 30. DODGE consumes 30.");
			GUI.Label(Rect(250, 360, 400, 200), "BLOCK consumption varies with power of enemy's attack.");
			GUI.Label(Rect(250, 390, 400, 200), "ACTIONS with low stamina may produce WEAKER results or FAIL.");
			
			if(tipRoll == false)
			{
				tip = 10 * (Random.value);
				tipRoll = true;
    		
			}
			
			if(tip > 7)
    		{
    			GUI.Label(Rect(370, 435, 400, 200), "TIP: Dodging consumes a set amount of stamina,");
    			GUI.Label(Rect(397, 450, 400, 200), "while blocking varies.");
    		}
    		else if(tip > 4)
    		{
    			GUI.Label(Rect(370, 440, 400, 200), "TIP: Try attacking when enemy's guard is down.");
    		}
    		else
    		{
    			GUI.Label(Rect(370, 440, 400, 200), "TIP: Attacking and defending are equally important.");
    		}
    		
    		if (GUI.Button (Rect (370,470,300,40), "Start Game")) 
    		{
				Application.LoadLevel (1);
    	
			}
		}
}