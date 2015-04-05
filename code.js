/* globals */

var window = window;
var canvas = window.document.getElementById('CVS');
var context = canvas.getContext('2d');


/* lib */

var game =
{
	create:
	{
		snow: function(x, y, radius, color)
		{
			var snow =
			{
				color: color,
				radius: radius,
				x: x,
				y: y
			};
			game.data.snows[game.data.snows.length] = snow;
		}
	},

	data:
	{
		points:[],
		snows:[]
	},

	draw:
	{
		canvas:
		{
			clear: function(canvas, context)
			{
				context.clearRect(0, 0, canvas.width, canvas.height);
			},

			resize: function(canvas, window)
			{
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}
		},

		line: function(context)
		{
			if(game.event.mousedown.is)
			{
				context.strokeStyle = '#ccc';
				context.lineTo(game.event.mousemove.x, game.event.mousemove.y);
				context.stroke();
			}
			else
			{
				context.moveTo(game.event.mousemove.x, game.event.mousemove.y);
			}
		},

		snows: function(context, snows)
		{
			for(var snow in snows)
			{
				context.fillStyle = snow.color;
				context.beginPath();
				context.arc(snow.x, snow.y, snow.radius, 0, 2);
				context.closePath();
				context.fill();
			}
		}
	},

	event:
	{
		load:
		{
			is: false
		},

		mousedown:
		{
			is: false,
			x: 0,
			y: 0
		},

		mousemove:
		{
			is: false,
			x: 0,
			y: 0
		},

		mouseup:
		{
			is: false,
			x: 0,
			y: 0
		},

		resize:
		{
			is: false
		}
	},

	update:
	{
		interval: 300,

		point:
		{
			add: function(x, y)
			{
				game.data.points[game.data.points.length] =
				{
					x: x,
					y: y
				}
			}
		}
	}
};


/* events */

window.onload = function()
{
	game.event.load.is = true;

	game.draw.canvas.resize(canvas, window);
};

window.onmousedown = function()
{
	game.event.mousedown.is = true;

	game.event.mousedown.x = event.x;
	game.event.mousedown.y = event.y;

	game.draw.canvas.clear(canvas, context);
};

window.onmousemove = function()
{
	game.event.mousemove.is = true;

	game.event.mousemove.x = event.x;
	game.event.mousemove.y = event.y;

	game.update.point.add(game.event.mousemove.x, game.event.mousemove.y);
	game.draw.line(context);
};

window.onmouseup = function()
{
	game.event.mousedown.is = false;
	game.event.mouseup.is = true;

	game.event.mouseup.x = event.x;
	game.event.mouseup.y = event.y;
};

window.onresize = function()
{
	game.event.resize.is = true;

	game.draw.canvas.resize(canvas, window);
};

/* time event */
setInterval(
	function()
	{
		var x = 100;
		var y = 14;
		var radius = Math.random() * 10;
		var color = '#324566';
		game.create.snow(x, y, radius, color);

		game.draw.snows(game.data.snows);
	},
	game.update.interval
);