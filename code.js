var window = window;
var canvas = window.document.getElementById('CVS');
var context = canvas.getContext('2d');

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
				speed: 1,
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
				context.fillRect(game.event.mousemove.x, game.event.mousemove.y, 100, 100);
				context.fill();
			}
			else
			{
				context.moveTo(game.event.mousemove.x, game.event.mousemove.y);
			}
		},

		snows: function(context, snows)
		{
			for(var i = 0; i < snows.length; i++)
			{
				context.fillStyle = snows[i].color;
				context.strokeStyle = snows[i].color;
				context.beginPath();
				context.arc(snows[i].x, snows[i].y, snows[i].radius, 0, 2 * Math.PI);
				context.closePath();
				context.fill();
				context.stroke();
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

	options:
	{
		gravity: 0.5,
		snow:
		{
			number: 100,
			radius: 8
		}
	},

	update:
	{
		interval: 15,

		physic:
		{
			gravity: function(object, canvas)
			{
				object.y += object.speed;
				object.speed = object.radius + game.options.gravity*object.speed; //* game.options.gravity;

				if(object.y > canvas.height)
				{
					object.y = 0;
					object.speed = 0;
				};
			}
		},

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

setInterval(
	function()
	{
//create
		if(game.data.snows.length < game.options.snow.number)
		{
			var x = Math.floor(Math.random() * canvas.width);
			var y = Math.floor(Math.random() * canvas.height);
			var radius = Math.floor(Math.random() * game.options.snow.radius);
			var color = '#ccddee';
			game.create.snow(x, y, radius, color);
		};

//update
		for(var i = 0; i < game.data.snows.length; i++)
		{
			game.update.physic.gravity(game.data.snows[i], canvas);
		};

//draw
		game.draw.canvas.clear(canvas, context);
		game.draw.snows(context, game.data.snows);
	},
	game.update.interval
);