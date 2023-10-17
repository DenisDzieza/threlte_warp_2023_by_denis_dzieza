<script lang="ts">
	import { T, useFrame, useThrelte } from '@threlte/core';
	import { Grid, Instance, InstancedMesh, OrbitControls, Text } from '@threlte/extras';
	import { SphereGeometry } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';

	interface Position {
		x: number;
		y: number;
		z: number;
	}

	interface User {
		name: string;
		color: string;
		position: Position;
	}

	export let exposure = 1;

	export let users: User[] = [];

	const { renderer, invalidate } = useThrelte();

	$: {
		renderer.toneMappingExposure = exposure;
		invalidate();
	}

	useFrame(() => {});

	const sphereGeo = new SphereGeometry(2.5, 32, 32);
</script>

<T.PerspectiveCamera position={[0, 7, 18]} fov={60} near={1} far={20000} makeDefault>
	<OrbitControls
		enableRotate={false}
		enableZoom={false}
		maxPolarAngle={85 * DEG2RAD}
		enableDamping
		target={[0, 2.5, 0]}
	/>
</T.PerspectiveCamera>

<InstancedMesh>
	<T.BoxGeometry castShadow />
	<T is={sphereGeo} />
	<T.MeshStandardMaterial roughness={0.1} metalness={0.5} />

	{#each users as user (user.name)}
		<Text
			text={user.name}
			color={`#${user.color}`}
			fontSize={1}
			anchorX="50%"
			anchorY="100%"
			position.x={user.position.x}
			position.z={user.position.z}
			position.y={5}
		/>
		<Instance
			color={`#${user.color}`}
			position.x={user.position.x}
			position.y={user.position.y}
			position.z={user.position.z}
		/>
	{/each}
</InstancedMesh>

<T.Mesh castShadow position.x={7} position.y={2.5}>
	<T is={sphereGeo} />
	<T.MeshStandardMaterial roughness={0.1} metalness={0.5} />
</T.Mesh>

<Grid infiniteGrid cellColor="white" sectionColor="white" />
