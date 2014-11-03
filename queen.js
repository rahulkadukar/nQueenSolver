var board = [];
var new_board;
var n = 7;
var seq = [];
var total_attacks = n * n;

$(document).ready(function(){
	$(".box").click(function(){
		n = $(this).html();

		board = [];
		seq = [];
		total_attacks = n * n;

		initialize_squares();

		var attack = 0;
		attack = complete_evaluation(board);

		var total = 0;
		for(var r = 0; ; r++){
			total = 0;
			for(var s = 0; s < n; s++){
				total = move_pieces(s);
			}

			board = $.extend(true, [], new_board);

			var seq = [];
			for(var a = 0; a < n; a++)
				for(var b = 0; b < n; b++)
					if(board[a][b] == 1)
						seq.push(b);


			if(total_attacks == 0){
				draw_canvas(seq);
				break;
			}
				
			if(r > (n * n) || total_attacks == 2){
				total_attacks = n * n;
				r = 0;
				initialize_squares();
			}
		}
	});
});

function initialize_squares(){
    	var sequence = [];
  for(var x = 0; x < n; x++){
  	board[x] = [];
   	var z = Math.floor(Math.random() * n);
   	sequence.push(z);
   	for(var y = 0; y < n; y++)
			if(z == y)
				board[x][y] = 1;
			else
				board[x][y] = 0;
 }
	//console.log(sequence);
}

function move_pieces(s){
  var copy_board = $.extend(true, [], board);
  for(var x = 0; x < n; x++){
  	var change_row = x;
  	/* Initialize the value to be tested */
  	copy_board[s][change_row] = 1;
  	var new_attacks = complete_evaluation(copy_board);
  	if(new_attacks < total_attacks){
  		total_attacks = new_attacks;
  		new_board = $.extend(true,[],copy_board);
  	}

  	/* Remove the initialization and continue */
  	copy_board[s][change_row] = 0;
  	//console.log(s + ' ' + x + ' ' + new_attacks);
  }
  return total_attacks;
}

function complete_evaluation(square){
	var attack = 0;
	var seq = [];
  	for(var r = 0; r < n; r++){
		for(var s = 0; s < n; s++){
			if(square[r][s] == 1){
				seq.push(s);
				attack += compute_attack(r,s,square);
			}
		}
	}
	return attack;	
}

function compute_attack(a,b,square){
	var attack = 0;
	var c,d;
	//var x;
	/* This part checks along the horizontal lines */
	for (var x = 1; x < n; x++){
		c = a + x;
		if(c < n)
			if(square[c][b] == 1)
				attack++;

		c = a - x;
		if(c >= 0)
			if(square[c][b] == 1)
				attack++;
	
	/* This part will check the diagonal from BL to TR */
		c = a + x;
		d = b - x;
		if(c < n && d >= 0)
			if(square[c][d] == 1)
				attack++;

		c = a - x;
		d = b + x;
		if(c >= 0 && d < n)
			if(square[c][d] == 1)
				attack++;

	/* This part will check the diagonal from TL to BR */
		c = a + x;
		d = b + x;
		if(c < n && d < n)
			if(square[c][d] == 1)
				attack++;

		c = a - x;
		d = b - x;
		if(c >= 0 && d >= 0)
			if(square[c][d] == 1)
				attack++;
	}
	return attack;
}

function draw_canvas(seq){
  var canvas = document.getElementById("b");
  var context = canvas.getContext("2d");
  canvas.width = canvas.width;

  var space = 0;
  for(var x = 0; x <= n; x++){
  		context.moveTo(space, 0);
  		context.lineTo(space, 640);
  		context.stroke();
  		context.moveTo(0, space);
  		context.lineTo(640, space);
  		context.stroke();
  	space += 640/n;
  }

  var sep = 640/n;
  var size = 640/(n*n);
  var dim = seq.length - 2;
  for(i in seq){
  	var a = sep * seq[i] + size;
  	var b = sep * i + size;
  	context.fillRect(a, b, (dim * size), (dim * size));
  }
}