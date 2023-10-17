<script lang="ts">
	import Scene from '$lib/scene/Scene.svelte';
	import { Canvas } from '@threlte/core';
	import { Sky } from '@threlte/extras';
	import { writable } from 'svelte/store';
	import type { User } from '../../../global/types/user';
	import type { PageData } from './$types';

	export let data: PageData;

	const userMap = writable<User[]>([
		{
			name: data.user,
			color: data.color.replace('#', ''),
			position: {
				x: 0,
				y: 2.5,
				z: 0
			}
		}
	]);

	function parseObjectMap(key, value) {
		if (typeof value === 'object' && value !== null) {
			if (value.dataType === 'Map') {
				return new Map(value.value);
			}
		}
		return value;
	}

	const socket = new WebSocket(
		`ws://localhost:3001/game?user=${data.user}&color=${data.color.replace('#', '')}`
	);

	// message is received
	socket.addEventListener('message', (event) => {
		userMap.set(JSON.parse(event.data));
	});

	socket.addEventListener('user-movement-map', (event) => {
		console.log('WS - MOVEMENT', event);
	});

	// socket opened
	socket.addEventListener('open', (event) => {
		console.log('Connection to Server established.', event);
	});

	// socket closed
	/* socket.addEventListener('close', (event) => {
	}); */

	// error handler
	/* socket.addEventListener('error', (event) => {
	}); */

	const presets = {
		sunset: {
			turbidity: 10,
			rayleigh: 3,
			azimuth: 180,
			elevation: 0.5,
			mieCoefficient: 0.005,
			mieDirectionalG: 0.7,
			exposure: 0.37
		},
		noon: {
			turbidity: 0.65,
			rayleigh: 0.17,
			azimuth: 180,
			elevation: 85,
			mieCoefficient: 0.013,
			mieDirectionalG: 0.7,
			exposure: 1
		},
		afternoon: {
			turbidity: 4.78,
			rayleigh: 0.3,
			azimuth: 180,
			elevation: 30,
			mieCoefficient: 0.002,
			mieDirectionalG: 0.86,
			exposure: 0.65
		},
		night: {
			turbidity: 20,
			rayleigh: 0.57,
			azimuth: 180,
			elevation: -5,
			mieCoefficient: 0.038,
			mieDirectionalG: 0,
			exposure: 0.26
		}
	};

	function onKeyDown(event) {
		if (!socket.OPEN) return;

		switch (event.code) {
			case 'KeyA':
			case 'ArrowLeft':
				socket.send(JSON.stringify({ movement: 'LEFT' }));
				console.log('Move Left');
				break;
			case 'KeyW':
			case 'ArrowUp':
				socket.send(JSON.stringify({ movement: 'UP' }));
				console.log('Move Up');
				break;
			case 'KeyS':
			case 'ArrowDown':
				socket.send(JSON.stringify({ movement: 'DOWN' }));
				console.log('Move Down');
				break;
			case 'KeyD':
			case 'ArrowRight':
				socket.send(JSON.stringify({ movement: 'RIGHT' }));
				console.log('Move Right');
				break;
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="full-screen">
    <Canvas>
		<Sky
			setEnvironment={true}
			turbidity={presets.sunset.turbidity}
			rayleigh={presets.sunset.rayleigh}
			azimuth={presets.sunset.azimuth}
			elevation={presets.sunset.elevation}
			mieCoefficient={presets.sunset.mieCoefficient}
			mieDirectionalG={presets.sunset.mieDirectionalG}
		/>
		<Scene exposure={presets.sunset.exposure} users={$userMap}/>
	</Canvas>
</div>

<div class="absolute z-10 opacity-0" ><!-- if enough spare time implement chat inside this div --></div>

<style>
	.full-screen {
		position: absolute;
		top: 0;
		left: 0;
		height: 100dvh;
		width: 100dvw;
	}
</style>
