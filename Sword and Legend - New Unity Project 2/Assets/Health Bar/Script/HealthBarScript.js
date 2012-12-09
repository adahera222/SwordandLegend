@script ExecuteInEditMode()
var healthTexture : Texture2D;
var healthBorder : Texture2D;
var health : int = 100;

function OnGUI () {
	
	// At first we draw border/background texture (with current texture it isn't important)
	GUI.DrawTexture(Rect(43,Screen.height - 65,314,36), healthBorder);

	//Now on top we can put Health Bar texture
	var adjust : int = health * 3;                       //adjusting texture size (width) / health(100)
	GUI.BeginGroup(Rect(55,Screen.height - 55,adjust,15));
	GUI.DrawTexture(Rect(0,0,290,15), healthTexture);
	GUI.EndGroup();
}