import { Position, User } from "../global/types/user";

function getUsernameFromReq(req: Request): string | null {
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const username = urlParams.get('user') ?? '';

  return username.length > 0
    ? username
    : null;
}

function getColorFromReq(req: Request): string | null {
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const color = urlParams.get('color') ?? '';

  return color.length > 0
    ? color
    : '#ffffff';
}

function calculatePosition(movement: string, userPosition: Position): Position {
  switch (movement) {
    case 'UP':
      userPosition.z -= 1;
      break;
    case 'DOWN':
      userPosition.z += 1;
      break;
    case 'LEFT':
      userPosition.x -= 1;
      break;
    case 'RIGHT':
      userPosition.x += 1;
      break;
  }

  return userPosition;
}

const userMap: Map<string, User> = new Map();

const server = Bun.serve<{ data: { user: string; color: string; } }>({
  port: process.env.PORT || 3001,
  development: true,
  fetch(req, server) {
    const url = new URL(req.url);
    if (url.pathname === "/game") {
      const user = getUsernameFromReq(req);
      const color = getColorFromReq(req);

      const success = user
        ? server.upgrade(req, { data: { user, color } })
        : false;

      return success
        ? undefined
        : new Response("WebSocket upgrade error", { status: 400 });
    }

    return new Response("Hello world");
  },
  websocket: {
    open(ws) {
      const initUser = {
        name: ws.data.user,
        color: ws.data.color,
        position: {
          x: 0,
          y: 2.5,
          z: 0
        }
      };
      userMap.set(ws.data.user, initUser);

      const msg = `${ws.data.user} has entered the game`;
      console.log(msg);
      ws.subscribe("the-group-chat");
      ws.subscribe("user-movement-map");
      ws.publish("the-group-chat", msg);


    },
    message(ws, message) {
      if (!userMap.has(ws.data.user)) return;

      if (typeof message === 'string') {
        const clientMessage: {
          movement?: string;
          gameMessage?: string;
        } = JSON.parse(message);

        if (clientMessage.movement) {
          const user = userMap.get(ws.data.user)

          if (!user) return;

          user.position = calculatePosition(clientMessage.movement, user.position);
        }
      }

      // this is a group game
      // so the server re-broadcasts incoming message to everyone
      // ws.publish("the-group-chat", `${ws.data.user}: ${message}`);
    },
    close(ws) {
      const msg = `${ws.data.user} has left the game`;

      console.log(msg);
      userMap.delete(ws.data.user);

      ws.publish("the-group-chat", msg);
      ws.unsubscribe("the-group-chat");
      ws.unsubscribe("user-movement-map");
    },
  },
});

function broadcastUserPositions() {
  // console.log('ARRAY', userMap)
  const convertedMap: User[] = Array.from(userMap.values());

  server.publish('user-movement-map', JSON.stringify(convertedMap))
}

setInterval(broadcastUserPositions, 1000);

console.log(`Listening on ${server.hostname}:${server.port}`);
