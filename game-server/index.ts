/* 
// Not used for now
function getCookieValueByName(cookie, name): string {
  const match = cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : "";
} */

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
// const userMap: User[] = [];

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
      // if (userMap.find((user) => { user.name === ws.data.user })) return;

      console.log('HAS NO ENTRY', userMap)

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

      // userMap.push(initUser);

      const msg = `${ws.data.user} has entered the game`;
      console.log(msg);
      ws.subscribe("the-group-chat");
      ws.subscribe("user-movement-map");
      ws.publish("the-group-chat", msg);


    },
    message(ws, message) {
      // console.log(`${ws.data.name} wrote a message`);
      // console.log(ws.data.user);

      if(!userMap.has(ws.data.user)) return;

      //console.log('MESSAGE', message);
      if (typeof message === 'string') {
        const clientMessage: {
          movement?: string;
          gameMessage?: string;
        } = JSON.parse(message);

        if (clientMessage.movement) {
          const user = userMap.get(ws.data.user)
          /* const userIndex = userMap.findIndex((user) => {
            user.name === ws.data.user
          }) */
          if (!user) return;

          user.position = calculatePosition(clientMessage.movement, user.position);
        }
      }

      // this is a group game
      // so the server re-broadcasts incoming message to everyone
      // ws.publish("the-group-chat", `${ws.data.user}: ${message}`);
    },
    close(ws) {
      // if(!userMap.has(ws.data.user)) return;

      const msg = `${ws.data.user} has left the game`;

      console.log(msg);
      userMap.delete(ws.data.user);
      /* const userIndex = userMap.findIndex((user) => {
        user.name === ws.data.user
      });
      delete userMap[userIndex]; */
      ws.publish("the-group-chat", msg);
      ws.unsubscribe("the-group-chat");
      ws.unsubscribe("user-movement-map");
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);

/* function stringifyObjectMap(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
} */

/* function parseObjectMap(key, value) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
} */

function broadcastUserPositions() {
  // console.log(JSON.stringify(userMap));

  // const users = userMap.entries();
  console.log('ARRAY', userMap)

  const convertedMap: User[] = Array.from(userMap.values());

  server.publish('user-movement-map', JSON.stringify(convertedMap))
  // server.publish('user-movement-map', JSON.stringify(userMap, stringifyObjectMap))
}

setInterval(broadcastUserPositions, 1000)
